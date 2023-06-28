import React from "react";
import { View } from "react-native";

export const RedLign = (props) => {
    const [pos, setPos] = React.useState(props.hoopPos);
  
    // Update the line position whenever the hoop position changes
    React.useEffect(() => {
      setPos(props.hoopPos);
    }, [props.hoopPos]);
  
    return (
      <View
        style={{
          position: 'absolute',
          left: pos.x - 52,
          top: pos.y+0.4,
          width: 110,
          height: 4.5,
          backgroundColor: 'red',
          borderRadius:20,
          display: props.isVisible?'flex':'none',
        }}
      />
    );
  };
  