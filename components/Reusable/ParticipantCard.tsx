import React from "react";
import { Text, StyleSheet, TouchableOpacity, Image, View } from "react-native";
import { main } from './../../constants/Colors';

interface ButtonProps {
    text: string;
    onPress: () => void;
}

const ParticipantCard = ({ text, onPress }: ButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.global}>
            <View style={styles.topSection}></View>
            <View style={styles.bottomSection}></View>
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
        overflow: 'hidden',  // Cache les parties des vues d'arrière-plan qui dépassent du bouton
    },
    topSection: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '80%',  // Couvre 60% du bouton
        backgroundColor: 'white',
    },
    bottomSection: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '20%',  // Couvre 40% du bouton
        backgroundColor: 'blue',
        width:'101%'
    },
    text: {
        fontWeight: '400',
        fontSize: 20,
        color: main.TextColor,
        position: 'absolute',  // Maintient le texte au centre du bouton
        bottom: '10%',  // Ajustez ces valeurs en fonction de l'endroit où vous voulez que le texte apparaisse
    },
    imageContainer: {
        height: 40,
        width: 40,
        overflow: 'hidden',
        borderRadius: 20,
        alignItems: 'center',
        position: 'absolute',  // Maintient l'image au centre du bouton
        top: '20%',  // Ajustez ces valeurs en fonction de l'endroit où vous voulez que l'image apparaisse
    },
});

export default ParticipantCard;
