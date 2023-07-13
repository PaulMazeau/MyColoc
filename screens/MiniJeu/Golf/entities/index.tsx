import Matter from 'matter-js'
import GolfBall from '../Components/GolfBall'
import { createHoop } from '../Components/Hoop';
import { Dimensions as RNDimensions } from 'react-native';

let collisionCategory1 = 0x0001;

export default (initialForce) => {
    let engine = Matter.Engine.create({ enableSleeping: false })
    let world = engine.world
    world.gravity.y = 0

    const { height, width } = RNDimensions.get('window');
   
    let ball = GolfBall(world, 'black', { x: width * 0.5, y: height * 0.8 }, 4);
    Matter.Body.set(ball.body, { restitution: 0.8, frictionAir : 0.05 });
    ball.body.collisionFilter = { category: collisionCategory1, mask: collisionCategory1 };

    let hoop = createHoop(world, width * 0.5, height * 0.25, 3, 110);

    
    return {
        physics: { engine, world },
        Hoop: hoop,
        GolfBall: ball,
        initialForce: initialForce 
    }
}
