import React from 'react';
import { View } from 'react-native';
import Matter from 'matter-js';

const Box = (props) => {
    const width = Math.trunc(Math.max(props.body.bounds.max.x - props.body.bounds.min.x, 2));
    const height = Math.trunc(Math.max(props.body.bounds.max.y - props.body.bounds.min.y, 2));
    const x = props.body.position.x - width / 2;
    const y = props.body.position.y - height / 2;

    return (
        <View style={{
            position: 'absolute',
            left: x,
            top: y,
            width: width,
            height: height,
            backgroundColor: props.color || 'white',
        }} />
    );
};

export default Box;
