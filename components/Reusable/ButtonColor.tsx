import React from "react";
import { Text, StyleSheet,TouchableOpacity } from "react-native";

interface ButtonProps {
    text: string;
    colorBackGround: string;
    colorText: string;
    onPress: () => void;
  }

const Button = ({ text, colorBackGround, colorText, onPress }: ButtonProps) => {
    const styles = StyleSheet.create({
        global: {
            backgroundColor: colorBackGround,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            height:"100%",
        },
        text: {
            fontWeight: '600',
            fontSize: 20,
            color: colorText
        }
    });

    return (
        <TouchableOpacity onPress={onPress} style={styles.global}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

export default Button;