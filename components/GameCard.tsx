import React from "react";
import { View, Text, StyleSheet,ImageBackground } from 'react-native';
import PlayButton from "./PlayButton";
import Score from './Score'


const BasketBall_Background=require('../images/BasketBall_Background.png');

const GameCard = () => {

    return(
        <View style = {styles.global} >
            <ImageBackground source ={BasketBall_Background} resizeMode="contain">
            <View style = {styles.container}>
                <View style = {{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style= {styles.text}>BasketBall</Text>
                    <Score/>
                </View>
                <PlayButton/>
            </View>
            </ImageBackground>
        </View>

    );
};

const styles = StyleSheet.create({
    global:{
        backgroundColor : "#8E80EA",
        width: '80%',
        height : '30%',
        borderRadius : 10,
    },

    container:{
        width :'100%',
        height : '100%',
        padding : 15
    },

    text:{
        color : "white",
        fontWeight: '600',
        fontSize: 22,
    }
})

export default GameCard;