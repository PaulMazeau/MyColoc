import React from "react";
import { View, Text, StyleSheet } from "react-native";


const Guess = () => {

    return (
        <View style={styles.global}>
            <Text>Page Guess</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    global: {
        flex:1
    },
});

export default Guess;
