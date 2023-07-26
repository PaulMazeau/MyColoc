import React, { useEffect } from 'react';
import { Image } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

function FloatingAvatar({ url, size = 40 }) {
  const float = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    const duration = Math.random() * 400 + 800;

    float.value = withRepeat(
      withSequence(
        withTiming(-10, { duration }),
        withTiming(10, { duration }),
      ),
      -1,
    );

    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration }),
        withTiming(1, { duration }),
      ),
      -1,
    );
  }, []);

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: float.value },
        { scale: scale.value },
      ],
    };
  });

  return (
    <Animated.View style={style}>
      <Image 
        source={{ uri: url }} 
        style={{ width: size, height: size, borderRadius: size / 2, marginHorizontal: 12, }} 
      />
    </Animated.View>
  );
}

export default FloatingAvatar;
