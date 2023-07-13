import Matter from 'matter-js'
import GolfBall from '../Components/GolfBall'
import {RedLign} from '../Components/RedLign'
import { createHoop } from '../Components/Hoop';
import { Dimensions as RNDimensions } from 'react-native';

let collisionCategory1 = 0x0001;

export default (initialForce) => {
    let engine = Matter.Engine.create({ enableSleeping: false })
    let world = engine.world
    world.gravity.y = 0

    const { height, width } = RNDimensions.get('window');
   
    let ball = GolfBall(world, 'black', { x: width * 0.5, y: height * 0.8 }, 46);
    Matter.Body.set(ball.body, { restitution: 0.8 });
    ball.body.collisionFilter = { category: collisionCategory1, mask: collisionCategory1 };

    let hoop = createHoop(world, width * 0.5, height * 0.25, 3, 110);

    const middleX = (hoop.bodies[0].position.x + hoop.bodies[1].position.x) / 2;
    const middleY = (hoop.bodies[0].position.y + hoop.bodies[1].position.y) / 2;

    
    return {
        physics: { engine, world },
        Hoop: hoop,
        GolfBall: ball,
        initialForce: initialForce 
    }
}
