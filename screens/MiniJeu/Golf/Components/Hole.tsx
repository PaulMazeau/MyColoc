import React from 'react';
import { View, ImageBackground } from 'react-native';
import Matter from 'matter-js';

let collisionCategory2 = 0x0002;

const Hole = (props) => {
  const { bodies } = props;
  const { position: { x, y }, circleRadius } = bodies[0];
  
  return (
    <ImageBackground
      source={require('./../../../../assets/images/Basket_Hole.png')}
      style={{
        position: 'absolute',
        left: x -67,
        top: y -179,
        width: 250,
        height: 250,
      }}
    >
      {bodies.map((body, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            left: body.position.x - x + 67,
            top: body.position.y - y +179,
            width: circleRadius * 2,
            height: circleRadius * 2,
            borderRadius: circleRadius,
            borderWidth: 1,
            borderColor: 'red',
            backgroundColor: 'transparent',
          }}
        />
      ))}
    </ImageBackground>
  );
};

export const createHole = (world, x, y, radius, ecart) => {
  const body1 = Matter.Bodies.circle(x - ecart / 2, y, radius, { isStatic: true });
  const body2 = Matter.Bodies.circle(x + ecart / 2, y, radius, { isStatic: true });
  body1.collisionFilter.category = collisionCategory2;
  body2.collisionFilter.category = collisionCategory2;

  Matter.World.add(world, [body1, body2]);

  return {
    bodies: [body1, body2],
    ecart,
    renderer: <Hole bodies={[body1, body2]} ecart={ecart} />,
  };
};

export default Hole;
