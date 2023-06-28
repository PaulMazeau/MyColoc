import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const Light = ({ speed, rightOrLeft }) => {
  const [offset, setOffset] = useState(0);
  const maxOffset = 30; // valeur maximum de l'oscillation
  const [direction, setDirection] = useState(1);

  useEffect(() => {

    const interval = setInterval(() => {
      setOffset(prevOffset => {
        if (prevOffset <= -maxOffset) {
          // Change direction when reaching the max or min offset
          setDirection(1);
        }
        if (prevOffset >= maxOffset ) {
            // Change direction when reaching the max or min offset
            setDirection(-1);
          }
        // Update offset
        return prevOffset + direction * Math.min(speed, 50);
      });
    }, 20); // Update every 20 milliseconds

    // Cleanup when unmounting the component
    return () => clearInterval(interval);

    
  }, [offset]);

  const points = rightOrLeft ?
  `${width},${height-30} ${30},${-50} ${-20},${10}`
  : `${0},${height-30} ${width-30},${-10} ${width+20},${10}`;

  const transform = rightOrLeft 
  ? [
      { translateX : width/2},
      { translateY : height/2},
      { rotate: `${offset}deg`},
      { translateX : -width/2},
      { translateY : -height/2},
    ]
  : [
      { translateX : -width/2},
      { translateY : height/2},
      { rotate: `${offset}deg`},
      { translateY : -height/2},
      { translateX : width/2},
    ];


  

  return (
    <View style={{ 
      position: 'absolute',
      width: '100%',
      height: '100%',
      transform: transform,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end'
    }}>
      <Svg height="100%" width="100%">
        <Polygon
          points={points}
          fill="rgba(255, 251, 135, 0.5)"
          stroke="rgba(255, 251, 135, 0.5)"
          strokeWidth="1"
        />
      </Svg>
    </View>
  );
};

export default Light;
