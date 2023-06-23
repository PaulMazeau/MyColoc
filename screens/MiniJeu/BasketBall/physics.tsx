import Matter from 'matter-js'
import { Dimensions } from 'react-native';
import EmojiEntity from './Components/Emoji';
import { loadSounds, playSound } from './SoundManager';

let start = true;
let end =false;
let isEmojiVisible = false;
let emojiId;

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

loadSounds();

let vector = {x:0, y:0};

let collisionCategory1 = 0x0001; 
let collisionCategory2 = 0x0002; 



const Physics = (entities, {touches, time, dispatch}) => {
    if(start){

        entities.BasketBall.body.collisionFilter = { category: collisionCategory2, mask: collisionCategory1 };
        const emoji = EmojiEntity({x:0,y:0}, 50, null);
        entities.emoji = emoji;
        playSound('Drum');
        Matter.Body.setVelocity(entities.BasketBall.body, {
            x: 0,
            y: -40,
        })
        start=false;
        end = false;
    }

    let engine = entities.physics.engine;
    const { height } = Dimensions.get('window');



    if(isEmojiVisible){
        entities.emoji.visible = true;
        emojiId = setTimeout(() => {
            entities.emoji.visible = false
            isEmojiVisible =false;
        },500)
    }

    

    touches
    .filter(t => t.type === 'press')
    .forEach( t=> {
        let touchPoint = {x: t.event.pageX, y: t.event.pageY };
        let ballPosition = entities.BasketBall.body.position;

        if (distance({x : touchPoint.x, y : touchPoint.y + 60}, ballPosition) < (entities.BasketBall.body.circleRadius * 1.5)) {


            entities.emoji.image = emojiWin[Math.floor(Math.random() * emojiWin.length)];
            entities.emoji.position = touchPoint;
            clearTimeout(emojiId);
            isEmojiVisible= true;

            vector = {x: ballPosition.x - touchPoint.x, y: ballPosition.y - touchPoint.y};
            let speed = 30;
            let length = Math.sqrt(vector.x*vector.x + vector.y*vector.y);
            vector.x = vector.x / length * speed/2;
            dispatch({type: 'new-point'})

            
            Matter.Body.setVelocity(entities.BasketBall.body, {
                x: vector.x,
                y: - speed,
            })

            playSound('Drum')
        }
    })

    entities.BasketBall.size -= 0.5;


    if(entities.BasketBall.body.velocity.y > 0){
        entities.BasketBall.body.collisionFilter = { category: collisionCategory1, mask: collisionCategory2 };
    }


    entities.BasketBall.angle += vector.x * 1.75;

    if(entities.BasketBall.body.position.y > (height*1.2)){
        if(end==false){
            vector = {x:0, y:0};
            playSound('Hi-Hat');            
            dispatch({ type: 'game-over' })
            start=true
            end = true;
        }
    }
    else{
        Matter.Engine.update(engine, time.delta)
    }

    return entities;
}
export default Physics;
