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
            y: -35,
        })
        start=false;
    }

    let engine = entities.physics.engine
    const { height } = Dimensions.get('window');

    touches
    .filter(t => t.type === 'press')
    .forEach( t=> {
        console.log(t.event.locationX)
        console.log(t.event.locationY)
        console.log(entities.FootBall.body.position)
        //if (true/*distance([t.event.locationX,t.event.locationY],entities.FootBall.body.position) < entities.FootBall.body.circleRadius*/) {
            Matter.Body.setVelocity(entities.FootBall.body, {
                x: 0,
                y: -35,
            })
        //}
    
    })


    if(entities.FootBall.body.position.y > height){
        dispatch({ type: 'game-over' })
        start=true
    }

    Matter.Engine.update(engine, time.delta)
    
    return entities;

}
export default Physics