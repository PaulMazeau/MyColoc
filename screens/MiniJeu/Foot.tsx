import React from "react";
import { View, Text, StyleSheet } from "react-native";


const Foot = () => {

    return (
        <View style={styles.global}>
            <Text>Page Foot</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    global: {
        flex:1
    },
});

export default Foot;
