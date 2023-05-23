import React from "react";
import { View, Text, StyleSheet,ImageBackground } from 'react-native';
import PlayButton from "./PlayButton";
import Score from './Score';
import { MiniJeu } from '../../constants/Colors';


const BasketBall_Background=require('../../images/BasketBall_Background.png');

const GameCard = () => {

    return(
        <View style = {styles.global} >
            
            <View style = {styles.container}>

                <View style = {{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style= {styles.text}>BasketBall</Text>
                    <Score/>
                </View>

                <ImageBackground source ={BasketBall_Background} resizeMode="contain">
                    <View style = {styles.imageBackgrond}>
                        <PlayButton/>
                    </View>
                </ImageBackground>

            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    global:{
        backgroundColor: MiniJeu.BgColor1,
        width: '80%',
        height: '30%',
        borderRadius: 10,
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

    imageBackgrond:{
        height : '93.5%',
        justifyContent :'flex-end'
    }
})

export default GameCard;