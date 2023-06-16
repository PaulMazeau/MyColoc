// TouchIndicator.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

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
                backgroundColor: 'rgba(0,0,0,0.15)',
                borderRadius: radius,
            }}
        />
    );
}


export default TouchIndicator;
