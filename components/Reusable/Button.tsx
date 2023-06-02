import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  color?: string;
}

const CustomButton = ({ title, onPress, backgroundColor = '#172ACE', borderColor = '#000000', borderWidth = 0, color='white' }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor, borderColor, borderWidth }]}>
      <Text style={[styles.buttonText, {color}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginHorizontal: '5%',
    marginTop: 50
  },
  buttonText: {
    fontWeight: '700',
  },
});

export default CustomButton;
