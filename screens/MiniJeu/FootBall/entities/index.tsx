import Matter from 'matter-js'
import FootBall from '../Components/FootBall'
import { Dimensions as RNDimensions } from 'react-native';
import TouchIndicator from '../Components/TouchIndicator';
import Score from '../Components/Score';


export const TouchIndicatorEntity = (world, position, size) => {
  let body = Matter.Bodies.circle(position.x, position.y, size / 2, { isStatic: true, isSensor: true });
  Matter.World.add(world, body);
  
  return {
    body: body,
    size,
    renderer: <TouchIndicator/>
  };
};



export default restart => {
    let engine = Matter.Engine.create({enableSleeping: false})
    let world = engine.world
    world.gravity.y = 6.81

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
        Score: { 
          score: 0, 
          renderer: <Score/>,
          updateScore: function(newScore) {
            this.score = newScore;
          }
        },

        FootBall : ball,
    }
}
