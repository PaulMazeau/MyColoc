import React, { useState, useEffect } from 'react';
import Svg, { Polygon } from 'react-native-svg';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Light = ({ speed, leftOrRight }) => {
  const [offset, setOffset] = useState(0);
  const maxOffset = 200; // valeur maximum de l'oscillation
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

  const points = leftOrRight
    ? `${width + 20},${height} ${10 + offset},${-50} ${-50 + offset},${10}`
    : `${-width + 400},${height} ${width + offset},${-50} ${width+ 40 + offset},${10}`;


  return (
    <Svg height="100%" width="100%" style={{ position: 'absolute' }}>
      <Polygon
        points={points}
        fill="rgba(255, 251, 135, 0.5)"
        stroke="rgba(255, 251, 135, 0.5)"
        strokeWidth="1"
      />
    </Svg>
  );
};

export default Light;
