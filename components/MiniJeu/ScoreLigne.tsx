import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, ImageBackground } from 'react-native';
import Score from './Score';

const MedailleOr = require('../../assets/images/MedailleOr.png');
const MedailleArgent = require('../../assets/images/MedailleArgent.png');
const MedailleBronze = require('../../assets/images/MedailleBronze.png');
const MedailleBlanche = require('../../assets/images/MedailleBlanche.png');

interface ScoreLigneProps {
    position?: number;
}

const ScoreLigne: React.FC<ScoreLigneProps> = ({ position }) => {
    const positionString = position !== undefined ? position.toString() : '';
    let imageSource = null;

    if (position === 1) {
        imageSource = MedailleOr;
    } else if (position === 2) {
        imageSource = MedailleArgent;
    } else if (position === 3) {
        imageSource = MedailleBronze;
    }

    return (
        <View style={styles.global}>
            <View style={styles.firstColumn}>
                <ImageBackground source={imageSource}>
                    <View style={styles.Medaille}>
                        <Text>{positionString}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.ImageContainer}>
                    <Image source={require('../../assets/images/icon.png')} />
                </View>
                <Text style={styles.text1}> Julie </Text>
            </View>

            <Score score={1800} />
        </View>
    );
};

const styles = StyleSheet.create({
    global: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 5
    },

    firstColumn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    text1: {
        color: "white",
        fontWeight: '600',
        fontSize: 16,
    },

    ImageContainer: {
        height: 40,
        width: 40,
        overflow: 'hidden',
        borderRadius: 5,
        marginRight: 10,
        marginLeft: 10,
    },

    Medaille: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5
    }
})

export default ScoreLigne;
