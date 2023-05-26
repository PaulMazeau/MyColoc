import React, { useEffect, useState } from "react";
import { Text, StyleSheet, TouchableOpacity, Image, View } from "react-native";
import { main } from '../../constants/Colors';

interface ButtonProps {
    text: string;
    onPress: () => void;
    percent: number;  // Pourcentage du background bleu
    imageSource: any;  // Source de l'image
}

const ParticipantCardPurcentFilled = ({ text, onPress, percent, imageSource }: ButtonProps) => {
    const [middleSection, setmiddleSection] = useState({});

    useEffect(() => {
        setmiddleSection({
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: `${percent}%`,
            backgroundColor: "#3B41F1",
            width: '100%'
        });
    }, [percent]);

    return (
        <TouchableOpacity onPress={onPress} style={styles.global}>
            <View style={styles.upperSection}>
                <View style={styles.topSection}></View>
                <View style={middleSection}></View>
                <View style={styles.imageContainer}>
                    <Image source={imageSource} />
                </View>
            </View>
            <View style={styles.bottomSection}>
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    global: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 9,
        marginLeft: 9,
        width: '20%',
        borderColor: "#DDDDDD",
        borderWidth: 1,
        overflow: 'hidden',
    },
    upperSection: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '70%',
        alignItems: 'center'
    },
    bottomSection: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '30%',
        backgroundColor: "white",
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    topSection: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '75%',
        backgroundColor: 'transparent',
    },
    text: {
        fontWeight: '400',
        fontSize: 15,
        color: main.TextColor,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        height: 40,
        width: 40,
        overflow: 'hidden',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '20%',
    },
});

export default ParticipantCardPurcentFilled;
