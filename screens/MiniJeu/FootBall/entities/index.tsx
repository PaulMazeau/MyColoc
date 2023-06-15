import Matter from 'matter-js'
import FootBall from '../Components/FootBall'
import { Dimensions as RNDimensions } from 'react-native';

export default restart => {
    let engine = Matter.Engine.create({enableSleeping: false})
    let world = engine.world
    world.gravity.y = 3

    const { height, width } = RNDimensions.get('window');

    
    let ball = FootBall(world,'black',{x:width*0.5,y:height*0.8},60)
    Matter.Body.set(ball.body, {restitution: 0.8});

    
    const wallOptions = { isStatic: true, restitution: 0.8 };
    const wallThickness = 100;
    const walls = [
      
      // Left wall
      Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height*2.5, wallOptions),
      // Right wall
      Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height*2.5, wallOptions)
    ];
    Matter.World.add(world, walls);

    return {
        physics : {engine, world},
        FootBall : ball
    }
}
