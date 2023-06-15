import Matter from 'matter-js'
import { Dimensions } from 'react-native';


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
            y: -30,
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

        let touchPoint = {x: t.event.pageX, y: t.event.pageY + 100 };
        let ballPosition = entities.FootBall.body.position;

        if (distance(touchPoint, ballPosition) < (entities.FootBall.body.circleRadius * 1.5)) {
            //console.log(true);

            // Create a vector from the touch point to the center of the ball
            let vector = {x: ballPosition.x - touchPoint.x, y: ballPosition.y - touchPoint.y};

            // Normalize the vector to a unit length, then multiply by the desired speed
            let speed = 30;
            let length = Math.sqrt(vector.x*vector.x + vector.y*vector.y);
            vector.x = vector.x / length * speed/2;

            dispatch({type: 'new-point'})
            Matter.Body.setVelocity(entities.FootBall.body, {
                x: vector.x,
                y: - speed,
            })
        }
    
    })


    if(entities.FootBall.body.position.y > (height*1.2)){
        dispatch({ type: 'game-over' })
        start=true
    }

    Matter.Engine.update(engine, time.delta)
    
    return entities;

}
export default Physics