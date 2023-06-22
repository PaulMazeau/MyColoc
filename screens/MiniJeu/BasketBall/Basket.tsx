import React from "react";
import { View, Text, StyleSheet } from "react-native";


const Basket = () => {

    return (
        <View style={styles.global}>
            <Text>Page Basket</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    global: {
        flex:1
    },
});

export default Basket;
