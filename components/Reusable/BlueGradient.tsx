import React from 'react';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const windowHeight = Dimensions.get('window').height;

interface BlueGradientProps {
  height?: number;  // Cette prop est optionnelle, donc elle peut être undefined
}

const BlueGradient: React.FC<BlueGradientProps> = ({ height }) => {
  const gradientHeight = height ? windowHeight * height : windowHeight * 0.42;
  
  return (
    <LinearGradient
      colors={['#7700FF', '#1672FF']}
      start={{x: 1, y: 1}} 
      end={{x: 0.8, y: 0}} 
      style={{ 
        height: gradientHeight, 
        justifyContent: 'center', 
        alignItems: 'center',
        borderBottomLeftRadius: 40,   
        borderBottomRightRadius: 40,
      }}
    />
  );
}

export default BlueGradient;
