import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { main } from '../../constants/Colors';
import Button from "./Button";

const windowWidth = Dimensions.get('window').width;

const VoteCard = () => {
    return (
        <View style={styles.global}>
            <View style={styles.firstLign}>
                <Text style={styles.text1}>Vote contre l'incognito</Text>
            </View>
            <Text style={styles.text1}>blabla</Text>
            <Button text={"Voter"} color={"#3B41F1"}/>
        </View>
    );
};

const styles = StyleSheet.create({
    global: {
        backgroundColor: "white",
        borderRadius: 10,
        height: '25%',
        justifyContent: 'space-between',
        alignItems: 'center',
        width:windowWidth * 0.9,
        
    },

    firstLign: {
        alignItems:'flex-start',
        width:'100%',
        margin:5,
        marginLeft:30
    },

    text1: {
        fontWeight: '600',
        fontSize: 20,
        color: main.TextColor
    },

    text2: {
        fontWeight: '600',
        fontSize: 20,
        color: "white"
    }
});

export default VoteCard;
