import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Button = ({ text, colorText, colorBackGround }) => {
    const styles = StyleSheet.create({
        global: {
            backgroundColor: colorBackGround,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center'
        },
        text: {
            fontWeight: '600',
            fontSize: 20,
            color: colorText
        }
    });

    return (
        <View style={styles.global}>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

export default Button;
