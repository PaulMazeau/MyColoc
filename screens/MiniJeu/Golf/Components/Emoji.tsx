// Emoji.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Image, Animated } from 'react-native';


export const EmojiEntity = (position, size, image) => {
    return {
        position,
        size,
        image,
        renderer: <Emoji/>
    };
};

const Emoji = props => {
    const { position, size, image } = props;
    const animVal = useRef(new Animated.Value(0)).current; 
  

    useEffect(() => {
        if (props.visible) {
            animVal.setValue(0); // Reset the animation
            Animated.spring(
                animVal,
                {
                    toValue: -75,
                    friction: 5,
                    tension: 90,
                    useNativeDriver: true,
                }
            ).start();
        }
    }, [props.visible, animVal]);

    if (!props.visible) {
        return null;
    }

    return (
        <Animated.View
            style={{
                position: 'absolute',
                top: position.y - size / 2,
                left: position.x - size / 2,
                transform: [{ translateY: animVal }],
            }}
        >
            <Image
                style={{
                    width: size,
                    height: size,
                    padding: 10,
                }}
                source={image}
            />
        </Animated.View>
    );
}

export default EmojiEntity;
