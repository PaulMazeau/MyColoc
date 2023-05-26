import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { main } from '../../constants/Colors';
import Button from "../Reusable/ButtonColor";
import ParticipantCardPurcentFilled from "../Reusable/ParticipantCardPurcentFilled";

const windowWidth = Dimensions.get('window').width;

const VoteCard = () => {

    //Liste des participants
    const participants = [
        { text: 'Julie', percent: 70, imageSource: require('../../assets/images/profilIcon.png') },
        { text: 'Mehdi', percent: 10, imageSource: require('../../assets/images/profilIcon.png') },
        { text: 'Clara', percent: 0, imageSource: require('../../assets/images/profilIcon.png') },
        { text: 'Max', percent: 20, imageSource: require('../../assets/images/profilIcon.png') },
        { text: 'Clara', percent: 0, imageSource: require('../../assets/images/profilIcon.png') },
        { text: 'Max', percent: 20, imageSource: require('../../assets/images/profilIcon.png') },
    ];

    //Génère les ParticipantCardPurcentFilled
    const renderParticipants = (participants) => {
        return participants.map((participant, index) => (
            <ParticipantCardPurcentFilled 
                key={index} 
                text={participant.text} 
                percent={participant.percent} 
                imageSource={participant.imageSource}
            />
        ));
    };

    return (
        <View style={styles.global}>
            <View style={styles.firstLign}>
                <Text style={styles.text1}>Vote contre l'incognito</Text>
            </View>
            <View style={styles.secondLign}>
                {renderParticipants(participants)}
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
        height:'40%',
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
