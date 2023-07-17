import Matter from 'matter-js'
import GolfBall from '../Components/GolfBall'
import { Dimensions as RNDimensions } from 'react-native';

let collisionCategory1 = 0x0001;

export default (initialForce) => {
    let engine = Matter.Engine.create({ enableSleeping: false })
    let world = engine.world
    world.gravity.y = 0

    const { height, width } = RNDimensions.get('window');
   
    let ball = GolfBall(world, 'black', { x: width * 0.5, y: height * 0.7 }, 2);
    Matter.Body.set(ball.body, { restitution: 0.8, frictionAir : 0.05 });
    ball.body.collisionFilter = { category: collisionCategory1, mask: collisionCategory1 };


    
    return {
        physics: { engine, world },
        GolfBall: ball,
        initialForce: initialForce 
    }
}
