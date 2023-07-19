import Matter from 'matter-js'
import { Dimensions } from 'react-native';
import EmojiEntity from './Components/Emoji';
import { loadSounds, playSound } from './SoundManager';

let start = false;
let isPoint = false;
let currentPoint = 0;
let isEmojiVisible = false;
let emojiId;

function isIn(ballPos, holePos) {
    const errorMargin = 0;

    let lignPos1 = {x:holePos.x +18, y:holePos.y + 10}
    let lignPos2 = {x:holePos.x -18, y:holePos.y - 10}

    // Check if ball's x-coordinate is within the line segment defined by lignPos1 and lignPos2
    const withinX = (lignPos1.x - errorMargin <= ballPos.x && ballPos.x <= lignPos2.x + errorMargin) || 
                    (lignPos2.x - errorMargin <= ballPos.x && ballPos.x <= lignPos1.x + errorMargin);

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




const emoji = EmojiEntity({x:0,y:0}, 50, null);

const { width, height } = Dimensions.get('window');

let holeDirection = 1; // Initial direction (1 for right, -1 for left)
const holeLimitRight = width - 50; // Limit of hole's right movement
const holeLimitLeft = 50; // Limit of hole's left movement

function moveHole(holeEntity) {
    let baseSpeed = 0.5; // Base speed
    
    let newCurrentPoint
    if(currentPoint < 10){
        newCurrentPoint = currentPoint - 3
    }
    else{
        newCurrentPoint = currentPoint
    }
    
    let adjustedMultiplier = (newCurrentPoint % 10) +1; 

    let adjustedSpeed = baseSpeed * (adjustedMultiplier/2.5); // Adjusted speed
    
    if (newCurrentPoint >= 0) {
        let holePosition = holeEntity.position.x;

        // Change direction if the hole has reached the left or right limit
        if (holePosition >= holeLimitRight) {
            holeDirection = -1;
        } else if (holePosition <= holeLimitLeft) {
            holeDirection = 1;
        }

        // Update the hole's position
        holePosition += holeDirection * adjustedSpeed;
        holeEntity.position.x = holePosition;
    }
}




const Physics = (entities, {events, time, dispatch}) => {

    moveHole(entities.Hole);

    let wall = entities.MiddleWall

    if(currentPoint >=10 ) {
        Matter.Body.setPosition(wall.body, {
            x: Dimensions.get('window').width / 2, 
            y: Dimensions.get('window').height / 4,
        });
    }
    

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
                    x: -event.payload.x, 
                    y: -event.payload.y
                };
            }
    
            Matter.Body.setVelocity(entities.GolfBall.body, force)
            playSound('Drum');
        }
    });
    

    
    let velocity = entities.GolfBall.body.velocity;
    let speed = Math.sqrt(Math.pow(velocity.x, 2) + Math.pow(velocity.y, 2));


    if(start){
            if(!isPoint){
                if(isIn(entities.GolfBall.body.position, entities.Hole.position)){
                    entities.GolfBall.size = 30;
                    dispatch({ type: 'new-point'});
                    entities.emoji.image = emojiWin[Math.floor(Math.random() * emojiWin.length)];
                    entities.emoji.position = {x:entities.Hole.position.x, y: entities.Hole.position.y};
                    clearTimeout(emojiId);
                    isEmojiVisible= true;
                    currentPoint += 1;
                    isPoint=true;
                    playSound('Hi-Hat');
                    Matter.Body.setVelocity(entities.GolfBall.body, {x:0, y:0})
                    Matter.Body.setPosition(entities.GolfBall.body, {x:width*0.5, y:height*0.7})
                    start=false;
                    isPoint = false;
                    dispatch({type: 'new-shoot'})
                }
            }
            const y1 = height*0.7, size1 = 30;
            const y2 = 45, size2 = 15;
            const a = (size1 - size2) / (y1 - y2);
            const b = size1 - a * y1;
            entities.GolfBall.size = a * entities.GolfBall.body.position.y + b;

        
    }



    if((speed < 0.1) && (start)){
       
        Matter.Body.setVelocity(entities.GolfBall.body, {x:0, y:0})
        Matter.Body.setPosition(entities.GolfBall.body, {x:width*0.5, y:height*0.7})
        //entities.GolfBall.size = 30;
        start=false;
        isPoint = false;
        currentPoint = 0;
        playSound('Laser');
        dispatch({ type: 'game-over' })
        
    }
    else{
        Matter.Engine.update(engine, time.delta)
    }

    return entities;
}
export default Physics;
