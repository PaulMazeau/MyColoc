import Matter from 'matter-js'
import { Dimensions } from 'react-native';
import TouchIndicatorEntity from './Components/TouchIndicator';
import EmojiEntity from './Components/Emoji';
import { loadSounds, playSound } from './SoundManager';



let start = true;
let end =false;


function distance(point1, point2) {
    let a = point1.x - point2.x;
    let b = point1.y - point2.y;


    return Math.sqrt( a*a + b*b );
}

const emojiWin = [
    require('./../../../assets/images/Biceps_Emoji.png'),
    require('./../../../assets/images/Clapping_Emoji.png'),
    require('./../../../assets/images/High_Five_Emoji.png'),
    require('./../../../assets/images/Thumbs_Up_Emoji.png'),
];

const emojiLose = [
    require('./../../../assets/images/Sweat_Emoji.png'),
    require('./../../../assets/images/Unamused_Emoji.png'),
    require('./../../../assets/images/Flushed_Emoji.png'),
];

loadSounds();

let vector = {x:0, y:0};

const Physics = (entities, {touches, time, dispatch}) => {
   
    if(start){
        playSound('Drum');
        Matter.Body.setVelocity(entities.FootBall.body, {
            x: 0,
            y: -30,
        })
        start=false;
        end = false;
    }


    let engine = entities.physics.engine;
    let world = entities.physics.world;
    

    const { height } = Dimensions.get('window');


    touches
    .filter(t => t.type === 'press')
    .forEach( t=> {

        let touchPoint = {x: t.event.pageX, y: t.event.pageY };
        


        let ballPosition = entities.FootBall.body.position;


        if (distance(touchPoint, ballPosition) < (entities.FootBall.body.circleRadius * 1.5)) {

        const touchIndicator = TouchIndicatorEntity(world,touchPoint, 50);
        entities.TouchIndicator = touchIndicator;
        setTimeout(() => {
            delete entities.TouchIndicator;
        }, 10);
        
        const image = emojiWin[Math.floor(Math.random() * emojiWin.length)];
        const Emoji = EmojiEntity({x:touchPoint.x, y:touchPoint.y -100}, 35, image);
        entities.Emoji = Emoji;
        setTimeout(() => {
            delete entities.Emoji;
        }, 500);

            // Create a vector from the touch point to the center of the ball
            vector = {x: ballPosition.x - touchPoint.x, y: ballPosition.y - touchPoint.y};


            // Normalize the vector to a unit length, then multiply by the desired speed
            let speed = 30;
            let length = Math.sqrt(vector.x*vector.x + vector.y*vector.y);
            vector.x = vector.x / length * speed/2;


            dispatch({type: 'new-point'})
            Matter.Body.setVelocity(entities.FootBall.body, {
                x: vector.x,
                y: - speed,
            })

            playSound('Drum')
        }
   
    })

    entities.FootBall.angle += vector.x * 2;

    
    if(entities.FootBall.body.position.y > (height*1.2)){
        if(end==false){
            const index = Math.floor(entities.FootBall.body.position.x) % emojiLose.length;
            const Emoji = EmojiEntity({x:entities.FootBall.body.position.x, y:entities.FootBall.body.position.y -200}, 35, emojiLose[index]);
            entities.Emoji = Emoji;
            playSound('Hi-Hat');            
            setTimeout(() => {
                delete entities.Emoji;
                dispatch({ type: 'game-over' })
                start=true
            }, 500);
            end = true;
        }
        
        
        
    }
    else{
        Matter.Engine.update(engine, time.delta)
    }


   
    return entities;


}
export default Physics