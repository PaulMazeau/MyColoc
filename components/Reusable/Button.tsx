import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Linking, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  url?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  color?: string;
  gradientColors?: string[];
  gradientDirection?: {
    start: { x: number, y: number },
    end: { x: number, y: number }
  };
}

const CustomButton = ({ 
  title, 
  onPress, 
  url, 
  backgroundColor = '#172ACE', 
  borderColor = '#000000', 
  borderWidth = 0, 
  color='white',
  gradientColors,
  gradientDirection = { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } }
}: ButtonProps) => {
  
  const handlePress = () => {
    if (url) {
      Linking.openURL(url);
    } else if (onPress) {
      onPress();
    }
  }

  const ButtonContent = () => (
    <Text style={[styles.buttonText, {color}]}>{title}</Text>
  );

  return (
    <TouchableOpacity 
      onPress={handlePress} 
      style={[styles.buttonContainer, { borderColor, borderWidth }]}>
      {gradientColors ? (
        <LinearGradient 
          colors={gradientColors} 
          start={gradientDirection.start}
          end={gradientDirection.end}
          style={[styles.button, { borderColor, borderWidth }]}>
          <ButtonContent />
        </LinearGradient>
      ) : (
        <View style={[styles.button, { backgroundColor }]}>
          <ButtonContent />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 10,
    width: '90%',
    marginHorizontal: '5%',
    marginTop: 25,
  },
  button: {
    padding: 10,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '700',
  },
});

export default CustomButton;
