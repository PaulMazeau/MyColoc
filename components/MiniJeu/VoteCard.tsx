import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { main } from '../../constants/Colors';
import Button from "../Reusable/ButtonColor";
import ParticipantCardPurcentFilled from "../Reusable/ParticipantCardPurcentFilled";

const windowWidth = Dimensions.get('window').width;

const VoteCard = () => {
    return (
        <View style={styles.global}>
            <View style={styles.firstLign}>
                <Text style={styles.text1}>Vote contre l'incognito</Text>
            </View>
            <View style={styles.secondLign}>
                <ParticipantCardPurcentFilled text="julie" percent={70} imageSource={require('../../assets/images/profilIcon.png')}/>
                <ParticipantCardPurcentFilled text="Mehdi" percent={10} imageSource={require('../../assets/images/profilIcon.png')}/>
                <ParticipantCardPurcentFilled text="Clara" percent={0} imageSource={require('../../assets/images/profilIcon.png')}/>
                <ParticipantCardPurcentFilled text="Max" percent={20} imageSource={require('../../assets/images/profilIcon.png')}/>
                
            </View>
            <View style={styles.thirdLign}>
                <Button text={"Voter"} colorBackGround={"#3B41F1"} colorText={'white'}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    global: {
        backgroundColor: "#EDF0FA",
        borderRadius: 10,
        justifyContent: 'space-between',
        width:windowWidth * 0.9,
        padding:10,
        flex:0.5,
        marginBottom:10
        
    },

    firstLign: {
        alignItems:'flex-start',
        width:'100%',
        height:'15%'
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
