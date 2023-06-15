import Matter from 'matter-js'
import FootBall from '../Components/FootBall'
import { Dimensions as RNDimensions } from 'react-native';


export default restart => {
    let engine = Matter.Engine.create({enableSleeping: false})

    let world = engine.world
    world.gravity.y = 0.4


    const { height, width } = RNDimensions.get('window');
    
    return {
        physics : {engine, world},
        FootBall : FootBall(world,'black',{x:width*0.5,y:height*0.8},50)
    }
}