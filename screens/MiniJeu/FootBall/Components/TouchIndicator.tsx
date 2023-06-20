// TouchIndicator.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Matter from 'matter-js'

export const TouchIndicatorEntity = (world, position, size) => {
    let body = Matter.Bodies.circle(position.x, position.y, size / 2, { isStatic: true, isSensor: true });
    Matter.World.add(world, body);
    
    return {
      body: body,
      size,
      renderer: <TouchIndicator/>
    };
};

const TouchIndicator = props => {
    const radius = props.body.circleRadius; 
    const x = props.body.position.x - radius; 
    const y = props.body.position.y - radius; 

    return (
        <View 
            style={{
                position: 'absolute',
                top: y,
                left: x,
                width: radius * 2,
                height: radius * 2,
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderRadius: radius,
            }}
        />
    );
}



export default TouchIndicatorEntity;
