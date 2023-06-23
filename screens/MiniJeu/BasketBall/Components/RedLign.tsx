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
          left: pos.x - 55,
          top: pos.y-1,
          width: 116,
          height: 7,
          backgroundColor: 'red',
          borderRadius:20,
          display: props.isVisible?'flex':'none',
        }}
      />
    );
  };
  