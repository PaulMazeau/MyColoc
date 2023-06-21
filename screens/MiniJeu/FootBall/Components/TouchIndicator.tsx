// TouchIndicator.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

export const TouchIndicatorEntity = (position, size) => {
    return {
        position,
        size,
        visible: false,
        renderer: <TouchIndicator/>
    };
};

const TouchIndicator = props => {
    const radius = props.size / 2;
    const x = props.position.x - radius;
    const y = props.position.y - radius;

    if (!props.visible) {
        return null;
    }

    return (
        <View
            style={{
                position: 'absolute',
                top: y,
                left: x,
                width: radius * 2,
                height: radius * 2,
                backgroundColor: 'rgba(0,0,0,0.2)',
                borderRadius: radius,
            }}
        />
    );
}

  


export default TouchIndicatorEntity;
