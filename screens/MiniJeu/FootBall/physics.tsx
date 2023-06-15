import Matter from 'matter-js'
import { Dimensions } from 'react-native';


const Physics = (entities, {touches, time, dispatch, kick}) => {
    let engine = entities.physics.engine
    const { height } = Dimensions.get('window');

    touches
    .filter(t => t.type === 'press' || t.type === 'kick')
    .forEach( t=> {
        Matter.Body.setVelocity(entities.FootBall.body, {
            x:0,
            y:-35,
        })
    
    })


    if(entities.FootBall.body.position.y > height){
        dispatch({ type: 'game-over' })
    }

    Matter.Engine.update(engine, time.delta)
    
    return entities;

}
export default Physics