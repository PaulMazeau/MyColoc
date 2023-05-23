import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { MiniJeu } from '../../constants/Colors';
import Score from './Score';


const windowWidth = Dimensions.get('window').width;

const ScoreLigne = () => {

    return(
        <View style={styles.global}>
            <View style={styles.firstColumn}>
                <Text> A </Text>
                <View style={styles.ImageContainer}>
                    <Image source={require('../../assets/icon.png')} />
                </View>
                <Text style={styles.text1}> Julie </Text>
            </View>

            <Score/>
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


})

export default ScoreLigne;