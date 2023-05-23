import React from 'react';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const windowHeight = Dimensions.get('window').height;

function BlueGradient() {
  return (
    <LinearGradient
      colors={['#7700FF', '#1672FF']}
      start={{x: 1, y: 1}} 
      end={{x: 0.8, y: 0}} 
      style={{ 
        height: windowHeight * 0.42, 
        justifyContent: 'center', 
        alignItems: 'center',
        borderBottomLeftRadius: 40,   
        borderBottomRightRadius: 40,
      }}
    />
  );
}

export default BlueGradient;
