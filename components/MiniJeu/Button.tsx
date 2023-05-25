import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MiniJeuColor } from '../../constants/Colors';

const Button = ({ text }) => {
    return (
        <View style={styles.global}>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    global: {
        backgroundColor: "white",
        borderRadius: 10,
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        fontWeight: '600',
        fontSize: 20,
        color: MiniJeuColor.TextColor1
    }
});

export default Button;
