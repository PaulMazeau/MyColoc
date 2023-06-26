import Matter from 'matter-js'
import { Dimensions } from 'react-native';
import { loadSounds, playSound } from './SoundManager';

let start = true;
let end =false;
let isFalling = false;
let isPoint = false;
let currentPoint = 0;
let previousPoint = 0;

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

let vector = {x:0, y:0};

let collisionCategory1 = 0x0001; 
let collisionCategory2 = 0x0002; 

let altitude = null;

let directionX = 1;
let directionY = 1;
let initialX, initialY;
export function moveHoop(hoop, redLign, speed, maxWidth, maxHeight) {
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

    const middleX = (hoop.bodies[0].position.x + hoop.bodies[1].position.x) / 2;
    const middleY = (hoop.bodies[0].position.y + hoop.bodies[1].position.y) / 2;
    redLign.hoopPos = {x: middleX, y: middleY};
    redLign.renderer.props.hoopPos = {x: middleX, y: middleY};
    
    // Update hoop position
    hoop.bodies.forEach(body => {
        Matter.Body.setPosition(body, { 
            x: body.position.x + speed * directionX, 
            y: body.position.y + speed * directionY
        });
    });
}








const Physics = (entities, {events, time, dispatch}) => {

    let engine = entities.physics.engine;
    const { width, height } = Dimensions.get('window');


    if(start){
        let force;
        if(entities.initialForce.x == 0){
            force = {
                x: 0, 
                y: -15,
            };
        }
        else{
            force = {
                x: entities.initialForce.x/14, 
                y: Math.max(-38.5, Math.min(-34, entities.initialForce.y/5.5))
            };
        }
        

        Matter.Body.setVelocity(entities.BasketBall.body, force)
        entities.BasketBall.body.collisionFilter = { category: collisionCategory2, mask: collisionCategory1 };
        start=false;
        end = false;
    }

    //moveHoop(entities.Hoop, entities.RedLign, 1,60,25);


    
    let ballPosition = entities.BasketBall.body.position;

    if(entities.BasketBall.body.velocity.y > 0){
        isFalling=true; 
        altitude = ballPosition.y;
    }


    if(isFalling){
        entities.BasketBall.body.collisionFilter = { category: collisionCategory1, mask: collisionCategory2 };
        entities.RedLign.isVisible = true;
        if(!isPoint){
            if(isIn(entities.BasketBall.body.position, entities.Hoop.bodies[0].position, entities.Hoop.bodies[1].position)){
                dispatch({ type: 'new-point'});
                currentPoint += 1;
                isPoint=true;
            }
        }
        
    }
    else{
        entities.BasketBall.size -= 0.9;
        entities.RedLign.isVisible = false;
    }


    entities.BasketBall.angle += vector.x * 1.75;

    if(entities.BasketBall.body.position.y > (height*1.2)){
        if(currentPoint != previousPoint)
        {
            previousPoint = currentPoint;
            start=true;
            isFalling = false;
            isPoint = false;
            dispatch({ type: 'next-shoot' })
        }
        else{
            if(end==false){
                vector = {x:0, y:0};          
                dispatch({ type: 'game-over' })
                start=true;
                end = true;
                isFalling = false;
                isPoint = false;
            }
        }
        
    }
    else{
        Matter.Engine.update(engine, time.delta)
    }

    return entities;
}
export default Physics;
