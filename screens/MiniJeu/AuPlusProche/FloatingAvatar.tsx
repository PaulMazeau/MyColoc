import React, { useEffect } from 'react';
import { Image } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming, Easing } from 'react-native-reanimated';

function FloatingAvatar({ url, size = 40 }) {
  const float = useSharedValue(-10); 
  const scale = useSharedValue(1);

  useEffect(() => {
    const duration = Math.random() * 1000 + 500;

    float.value = withRepeat(
      withTiming(20, { duration: 2 * duration, easing: Easing.inOut(Easing.sin) }),  
      -1,
      true,  
    );

    scale.value = withRepeat(
      withTiming(0.1, { duration: 2 * duration, easing: Easing.inOut(Easing.sin) }),  
      -1,
      true,  
    );
  }, []);

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: float.value },
        { scale: scale.value + .8 },  
      ],
    };
  });

  return (
    <Animated.View style={style}>
      <Image 
        source={{ uri: url }} 
        style={{ width: size, height: size, borderRadius: size / 2, marginHorizontal: 14, }} 
      />
    </Animated.View>
  );
}

export default FloatingAvatar;
