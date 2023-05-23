import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { MiniJeu } from '../../constants/Colors';

import { LinearGradient } from 'expo-linear-gradient';


const SalonCard = () => {


    return(
        <View style = {styles.global} >
            
        </View>

    );
};

const styles = StyleSheet.create({
    global:{
        backgroundColor: MiniJeu.BgGradientColor1,
        borderRadius: 10,
        width : '80%'
    },

    container:{
        width:'100%',
        height: '100%',
        padding: 15,
    },

    text:{
        color : "white",
        fontWeight: '600',
        fontSize: 22,
    },

})

export default SalonCard;