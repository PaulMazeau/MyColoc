import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { MiniJeuColor } from '../../constants/Colors';

const windowWidth = Dimensions.get('window').width;

const VoteCard = () => {
    return (
        <View style={styles.global}>
            <Text style={styles.text}>blabla</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    global: {
        backgroundColor: "white",
        borderRadius: 10,
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        width:windowWidth * 0.9
    },

    text: {
        fontWeight: '600',
        fontSize: 20,
        color: MiniJeuColor.TextColor1
    }
});

export default VoteCard;
