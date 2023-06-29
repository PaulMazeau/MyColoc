import React from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import Score from './Score';
import { MiniJeuColor } from "../../constants/Colors";

const MedailleOr = require('../../assets/images/MedailleOr.png');
const MedailleArgent = require('../../assets/images/MedailleArgent.png');
const MedailleBronze = require('../../assets/images/MedailleBronze.png');

interface ScoreLigneProps {
    position?: number;
    userImage?: NodeRequire;
    name?: string;
    score:number;
}

const ScoreLigne: React.FC<ScoreLigneProps> = ({ position, userImage, name, score }) => {
    const positionString = position !== undefined ? position.toString() : '';
    let imageSource = null;
    let couleur = "white";

    //Permet de choisir une medaille et une couleur selon la position du User
    if (position === 1) {
        imageSource = MedailleOr;
        couleur = MiniJeuColor.Or
    } else if (position === 2) {
        imageSource = MedailleArgent;
        couleur = MiniJeuColor.Argent
    } else if (position === 3) {
        imageSource = MedailleBronze;
        couleur = MiniJeuColor.Bronze
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
                    <Image source={userImage} />
                </View>
                <Text style={styles.text1}> {name} </Text>
            </View>

            <Score score={score} color={couleur}/>
        </View>
    );
};

function getImageSource(position: number): string | undefined {
    if (position === 1) {
      return MedailleOr;
    } else if (position === 2) {
      return MedailleArgent;
    } else if (position === 3) {
      return MedailleBronze;
    }
  
    return undefined;
  }
  

const styles = StyleSheet.create({
    global: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 5,
        marginTop:15
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
