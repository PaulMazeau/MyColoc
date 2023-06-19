// Emoji.tsx
import React, { useEffect, useRef } from 'react';
import { Image, Animated } from 'react-native';

const images = [
    require('./../../../../assets/images/Biceps_Emoji.png'),
    require('./../../../../assets/images/Clapping_Emoji.png'),
    require('./../../../../assets/images/High_Five_Emoji.png'),
    require('./../../../../assets/images/Thumbs_Up_Emoji.png'),
];

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
    const animVal = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(
            animVal,
            {
                toValue: -100,
                duration: 1000,
                useNativeDriver: true
            }
        ).start();
    }, [animVal])

    return (
        <Animated.Image 
            style={{
                position: 'absolute',
                top: position.y - size / 2,
                left: position.x - size / 2,
                width: size,
                height: size,
                padding:10,
                transform: [{
                    translateY: animVal
                }]
            }}
            source={image}
        />
    );
}

export default EmojiEntity;
