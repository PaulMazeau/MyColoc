import Matter from 'matter-js'
import { Dimensions } from 'react-native';
import TouchIndicator from './Components/TouchIndicator';
import { TouchIndicatorEntity } from './entities';


function distance(point1, point2) {
    let a = point1.x - point2.x;
    let b = point1.y - point2.y;

    return Math.sqrt( a*a + b*b );
}

let start = true;


const Physics = (entities, {touches, time, dispatch}) => {
    
    if(start){
        Matter.Body.setVelocity(entities.FootBall.body, {
            x: 0,
            y: -50,
        })
        start=false;
    }

    let engine = entities.physics.engine
    const { height } = Dimensions.get('window');

    touches
    .filter(t => t.type === 'press')
    .forEach( t=> {
        //console.log(distance({x: t.event.pageX, y: t.event.pageY}, entities.FootBall.body.position))
        //console.log(entities.FootBall.body.circleRadius)

        let touchPoint = {x: t.event.pageX, y: t.event.pageY + 150 };
        let ballPosition = entities.FootBall.body.position;

        if (distance(touchPoint, ballPosition) < (entities.FootBall.body.circleRadius * 1)) {
            //console.log(true);

            // Create a vector from the touch point to the center of the ball
            let vector = {x: ballPosition.x - touchPoint.x, y: ballPosition.y - touchPoint.y};

            // Normalize the vector to a unit length, then multiply by the desired speed
            let speed = 60;
            let length = Math.sqrt(vector.x*vector.x + vector.y*vector.y);
            vector.x = vector.x / length * speed/2;

            dispatch({type: 'new-point'})
            Matter.Body.setVelocity(entities.FootBall.body, {
                x: vector.x,
                y: - speed,
            })
        }

        let world = entities.physics.world;
        entities.TouchIndicator = TouchIndicatorEntity(world, {x:touchPoint.x,y:touchPoint.y-150}, 50);;
        setTimeout(() => {
            delete entities.TouchIndicator;
        }, 100);
    
    })


    if(entities.FootBall.body.position.y > (height*1.2)){
        dispatch({ type: 'game-over' })
        start=true
    }

    Matter.Engine.update(engine, time.delta)
    
    return entities;

}
export default Physics