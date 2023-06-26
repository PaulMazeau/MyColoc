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