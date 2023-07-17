import React from 'react';
import { View, ImageBackground } from 'react-native';


export const Hole = (props) => {
  const [pos, setPos] = React.useState(props.position);
  
    // Update the line position whenever the hole position changes
    React.useEffect(() => {
      setPos(props.position);
  }, [props.position]);
  
  
  return (
    <ImageBackground
      source={require('./../../../../assets/images/Golf_Flag.png')}
      style={{
        position: 'absolute',
        left: pos.x -10,
        top: pos.y - 120,
        width: 55,
        height: 150,
      }}
    />
  );
};

