import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { main } from '../../constants/Colors';
import Button from "../Reusable/ButtonColor";
import ParticipantCard from "../Reusable/ParticipantCard";

const windowWidth = Dimensions.get('window').width;

const VoteCard = () => {
    return (
        <View style={styles.global}>
            <View style={styles.firstLign}>
                <Text style={styles.text1}>Vote contre l'incognito</Text>
            </View>
            <View style={styles.secondLign}>
                <ParticipantCard text="julie" colorBackGround="green" colorText="black"/>
                <ParticipantCard text="julie" colorBackGround="green" colorText="black"/>
            </View>
            <View style={styles.thirdLign}>
                <Button text={"Voter"} colorBackGround={"#3B41F1"} colorText={'white'}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    global: {
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: 'space-between',
        width:windowWidth * 0.9,
        padding:10,
        flex:0.5
        
    },

    firstLign: {
        alignItems:'flex-start',
        width:'100%',
        height:'20%'
    },

    secondLign:{
        flexDirection:'row',
        height:'40%'
    },

    thirdLign:{
        height:'20%'
    },

    text1: {
        fontWeight: '600',
        fontSize: 20,
        color: main.TextColor,
    },

    text2: {
        fontWeight: '600',
        fontSize: 20,
        color: "white"
    }
});

export default VoteCard;
