import React from "react";
import { View, Text, StyleSheet } from "react-native";


const Result = () => {

    return (
        <View style={styles.global}>
            <Text>Page Result</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    global: {
        flex:1
    },
});

export default Result;
