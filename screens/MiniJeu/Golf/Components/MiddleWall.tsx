import React from 'react';
import { View } from 'react-native';
import Matter from 'matter-js';
import { Dimensions as RNDimensions } from 'react-native';

const MiddleWall = (props) => {
    
    const bodyStyle = {
        position: 'absolute' as const,
        left: props.body.position.x - 16,
        top: props.body.position.y - 5,
        width: (props.body.bounds.max.x - props.body.bounds.min.x) *0.9,
        height: props.body.bounds.max.y - props.body.bounds.min.y,
        backgroundColor: props.color || 'grey',
    };

    return <View style={bodyStyle} />;
};

export default (world, color, size) => {
    let wallHeight = size || 10;
    let wallWidth = RNDimensions.get('window').width *0.1; 

    let wall = Matter.Bodies.rectangle(
        RNDimensions.get('window').width *2,
        RNDimensions.get('window').height *2,
        wallWidth,
        wallHeight,
        {
            isStatic: true, // it's a wall, it should not move
            label: 'MiddleWall',
            restitution: 1, // Make the wall fully elastic
        }
    );

    Matter.World.add(world, wall);
    

    return {
        body: wall,
        color: color || 'grey',
        renderer: <MiddleWall />,
    };
};
