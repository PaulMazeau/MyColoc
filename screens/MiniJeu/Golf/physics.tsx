import Matter from 'matter-js'
import { Dimensions } from 'react-native';
import EmojiEntity from './Components/Emoji';
import { loadSounds, playSound } from './SoundManager';

let start = false;
let isFalling = false;
let isPoint = false;
let currentPoint = 0;
let previousPoint = 0;
let isEmojiVisible = false;
let emojiId;

function isIn(ballPos, lignPos1, lignPos2) {
    const errorMargin = 20;

    // Check if ball's x-coordinate is within the line segment defined by lignPos1 and lignPos2
    const withinX = (lignPos1.x <= ballPos.x && ballPos.x <= lignPos2.x) || 
                    (lignPos2.x <= ballPos.x && ballPos.x <= lignPos1.x);

    // Check if ball's y-coordinate is within the line segment defined by lignPos1 and lignPos2, with error margin
    const withinY = (lignPos1.y - errorMargin <= ballPos.y && ballPos.y <= lignPos2.y + errorMargin) ||
                    (lignPos2.y - errorMargin <= ballPos.y && ballPos.y <= lignPos1.y + errorMargin);

    return withinX && withinY;
}



const emojiWin = [
    require('./../../../assets/images/Biceps_Emoji.png'),
    require('./../../../assets/images/Clapping_Emoji.png'),
    require('./../../../assets/images/High_Five_Emoji.png'),
    require('./../../../assets/images/Thumbs_Up_Emoji.png'),
];

loadSounds();

let collisionCategory1 = 0x0001; 
let collisionCategory2 = 0x0002; 

let altitude = null;

let directionX = 1;
let directionY = 1;
let initialX, initialY;
export function moveHoop(hoop, speed, maxWidth, maxHeight) {
    // Calculating current positions
    const currentX = (hoop.bodies[0].position.x + hoop.bodies[1].position.x) / 2;
    const currentY = (hoop.bodies[0].position.y + hoop.bodies[1].position.y) / 2;

    // If initial positions are not set, set them to current positions
    if (initialX === undefined) initialX = currentX;
    if (initialY === undefined) initialY = currentY;

    // Calculating new positions
    const newX = currentX + speed * directionX;
    const newY = currentY + speed * directionY;

    // Check if the hoop reaches the boundaries
    if (newX >= initialX + maxWidth || newX <= initialX - maxWidth) {
        directionX *= -1; // Change horizontal direction
    }
    if (newY >= initialY + maxHeight || newY <= initialY - maxHeight) {
        directionY *= -1; // Change vertical direction
    }

    
    
    // Update hoop position
    hoop.bodies.forEach(body => {
        Matter.Body.setPosition(body, { 
            x: body.position.x + speed * directionX, 
            y: body.position.y + speed * directionY * (maxHeight == 0 ? 0 : 1)
        });
    });
}



const emoji = EmojiEntity({x:0,y:0}, 50, null);

const { width, height } = Dimensions.get('window');



const Physics = (entities, {events, time, dispatch}) => {


    let engine = entities.physics.engine;
    entities.emoji = emoji;

    if(isEmojiVisible){
        entities.emoji.visible = true;
        emojiId = setTimeout(() => {
            entities.emoji.visible = false
            isEmojiVisible =false;
        },500)
    }

    events.forEach(event => {
        if (event.type === 'start') {
            start = true;
            let force;
            if(event.payload.x == 0){
                force = {
                    x: 0, 
                    y: -15,
                };
            }
            else{
                force = {
                    x: -event.payload.x/5, 
                    y: -event.payload.y/5
                };
            }
    
            Matter.Body.setVelocity(entities.GolfBall.body, force)
            entities.GolfBall.body.collisionFilter = { category: collisionCategory2, mask: collisionCategory1 };
            playSound('Drum');
        }
    });
    
    

    if(5<=currentPoint&&currentPoint<15){
        moveHoop(entities.Hoop, Math.min(1.5,0.5 + ((currentPoint - 5) / (15 - 5) * (1.5 - 0.5))) ,60,0);
    }
    if(15<=currentPoint){
        moveHoop(entities.Hoop, Math.min(1.6,0.5 + ((currentPoint - 15) / (30 - 15) * (2 - 0.5))) ,60,40);
    }


    
    let ballPosition = entities.GolfBall.body.position;

    if(entities.GolfBall.body.velocity.y > 0){
        isFalling=true; 
        altitude = ballPosition.y;
    }


    if(start){
        if(isFalling){
            entities.GolfBall.body.collisionFilter = { category: collisionCategory1, mask: collisionCategory2 };
            if(!isPoint){
                if(isIn(entities.GolfBall.body.position, entities.Hoop.bodies[0].position, entities.Hoop.bodies[1].position)){
                    dispatch({ type: 'new-point'});
                    entities.emoji.image = emojiWin[Math.floor(Math.random() * emojiWin.length)];
                    entities.emoji.position = {x:(entities.Hoop.bodies[0].position.x + entities.Hoop.bodies[1].position.x)/2, y: (entities.Hoop.bodies[0].position.y + entities.Hoop.bodies[1].position.y)/2};
                    clearTimeout(emojiId);
                    isEmojiVisible= true;
                    currentPoint += 1;
                    isPoint=true;
                    playSound('Hi-Hat');
                }
            }
            
        }
    }


    let velocity = entities.GolfBall.body.velocity;
    let speed = Math.sqrt(Math.pow(velocity.x, 2) + Math.pow(velocity.y, 2));

    if((speed < 0.1) && (start)){
        Matter.Body.setVelocity(entities.GolfBall.body, {x:0, y:0})
        Matter.Body.setPosition(entities.GolfBall.body, {x:width*0.5, y:height*0.8})
        entities.GolfBall.size = 4;
        start=false;
        isFalling = false;
        isPoint = false;
        dispatch({type: 'new-shoot'})
        
        if(currentPoint != previousPoint)
        {
            previousPoint = currentPoint;
        }
        else{
            currentPoint = 0;
            previousPoint = 0;
            playSound('Laser');
            dispatch({ type: 'game-over' })
        }
        
    }
    else{
        Matter.Engine.update(engine, time.delta)
    }

    return entities;
}
export default Physics;
