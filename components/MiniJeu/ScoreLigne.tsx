import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, ImageBackground } from 'react-native';
import Score from './Score';


const windowWidth = Dimensions.get('window').width;


const MedailleOr=require('../../assets/images/MedailleOr.png');

const ScoreLigne = () => {

    return(
        <View style={styles.global}>
            <View style={styles.firstColumn}>
                <ImageBackground source={MedailleOr}>
                    <View style={styles.Medaille}>
                        <Text>1</Text>
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
    global:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin:5
    },

    firstColumn:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    text1:{
        color : "white",
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

    Medaille:{
        paddingLeft:10,
        paddingRight:10,
        paddingTop:5,
        paddingBottom:5
    }


})



export default ScoreLigne;