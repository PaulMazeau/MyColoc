import React, { useEffect, useState } from "react";
import { Text, StyleSheet, TouchableOpacity, Image, View } from "react-native";
import { main } from './../../constants/Colors';

interface ButtonProps {
    text: string;
    onPress: () => void;
    percent: number;  // Changer ici
}

const ParticipantCard = ({ text, onPress, percent }: ButtonProps) => {
    const [bottomSectionStyle, setBottomSectionStyle] = useState({});

    useEffect(() => {
        setBottomSectionStyle({
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: `${percent}%`,  // Convertir le pourcentage en string ici
            backgroundColor: 'blue',
            width: '101%'
        });
    }, [percent]);  // Changer ici

    return (
        <TouchableOpacity onPress={onPress} style={styles.global}>
            <View style={styles.topSection}></View>
            <View style={bottomSectionStyle}></View>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/images/profilIcon.png')} />
            </View>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    global: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        marginLeft: 5,
        width: '20%',
        borderColor: main.MainColor,
        borderWidth: 1.5,
        overflow: 'hidden',
    },
    topSection: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '80%',
        backgroundColor: 'white',
    },
    text: {
        fontWeight: '400',
        fontSize: 20,
        color: main.TextColor,
        position: 'absolute',
        bottom: '10%',
    },
    imageContainer: {
        height: 40,
        width: 40,
        overflow: 'hidden',
        borderRadius: 20,
        alignItems: 'center',
        position: 'absolute',
        top: '20%',
    },
});

export default ParticipantCard;
