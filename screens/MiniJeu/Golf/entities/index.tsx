import Matter from 'matter-js'
import GolfBall from '../Components/GolfBall'
import {Hole} from '../Components/Hole';
import { Dimensions as RNDimensions } from 'react-native';


export default (initialForce) => {
    let engine = Matter.Engine.create({ enableSleeping: false })
    let world = engine.world
    world.gravity.y = 0

    const { height, width } = RNDimensions.get('window');
   
    let ball = GolfBall(world, 'black', { x: width * 0.5, y: height * 0.7 }, 3);
    Matter.Body.set(ball.body, { restitution: 0.8, frictionAir : 0.05 });


    let hole = {
        position: {x: width * 0.5, y: height * 0.15},
        renderer: <Hole position={{x: width * 0.5, y: height * 0.15}}/>
    };
    //Matter.Body.set(hole)


    
    return {
        physics: { engine, world },
        Hole: hole,
        GolfBall: ball,
        initialForce: initialForce 
    }
}
