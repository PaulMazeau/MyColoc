import Matter from 'matter-js'
import BasketBall from '../Components/BasketBall'
import { createHoop } from '../Components/Hoop';
import { Dimensions as RNDimensions } from 'react-native';

export default restart => {
    let engine = Matter.Engine.create({ enableSleeping: false })
    let world = engine.world
    world.gravity.y = 3

    const { height, width } = RNDimensions.get('window');
   
    let ball = BasketBall(world, 'black', { x: width * 0.5, y: height * 0.8 }, 60);
    Matter.Body.set(ball.body, { restitution: 0.8 });

    let hoop = createHoop(world, width * 0.5, height * 0.35, 3, 110);


    return {
        physics: { engine, world },
        Hoop: hoop,
        BasketBall: ball,
        
    }
}
