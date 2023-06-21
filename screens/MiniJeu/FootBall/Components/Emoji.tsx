// Emoji.tsx
import React, { useEffect, useRef, useState } from 'react';
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
        visible: false,
        renderer: <Emoji/>
    };
};

const Emoji = props => {
    const { position, size, image } = props;
    const animVal = useRef(new Animated.Value(0)).current; 
    const [visible, setVisible] = useState(props.visible);
  
    useEffect(() => {
      if (props.visible) {
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
        }, 1000);
      }
    }, [props.visible]);

    useEffect(() => {
        Animated.spring(
            animVal,
            {
                toValue: -75,
                friction: 5,
                tension: 90,
                useNativeDriver: true,
            }
        ).start();
    }, [animVal]);

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
