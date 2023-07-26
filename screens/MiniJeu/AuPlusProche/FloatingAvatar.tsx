import React, { useEffect } from 'react';
import { Image } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming, Easing } from 'react-native-reanimated';

function FloatingAvatar({ url, size = 40 }) {
  const float = useSharedValue(-10);  // Initialiser à -10
  const scale = useSharedValue(1);

  useEffect(() => {
    const duration = Math.random() * 400 + 800;

    float.value = withRepeat(
      withTiming(20, { duration: 2 * duration, easing: Easing.inOut(Easing.sin) }),  // Aller de -10 à 10 en douceur
      -1,
      true,  // Inverse l'animation pour avoir un mouvement de haut en bas
    );

    scale.value = withRepeat(
      withTiming(0.1, { duration: 2 * duration, easing: Easing.inOut(Easing.sin) }),  // Aller de 1 à 1.1 en douceur
      -1,
      true,  // Inverse l'animation pour avoir un mouvement de zoom in et out
    );
  }, []);

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: float.value },
        { scale: scale.value + 1 },  // Ajouter 1 pour passer de [0.1, 0.2] à [1, 1.1]
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
