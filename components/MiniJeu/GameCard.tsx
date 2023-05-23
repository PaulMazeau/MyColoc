import React from "react";
import { View, Text, StyleSheet,ImageBackground, useWindowDimensions, Dimensions } from 'react-native';
import PlayButton from "./PlayButton";
import Score from './Score';
import { MiniJeu } from '../../constants/Colors';
import { LinearGradient }  from 'expo-linear-gradient';


const BasketBall_Background=require('../../assets/images/BasketBall_Background.png');

const windowWidth = Dimensions.get('window').width;


const GameCard = () => {


    return(
        <View>
            <LinearGradient colors={[MiniJeu.BgGradientColor1, MiniJeu.BgGradientColor2]} style={styles.global}>
                
            <View style = {styles.container}>

                <View style = {{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style = {styles.text}>BasketBall</Text>
                    <Score/>
                </View>

                <ImageBackground source ={BasketBall_Background} resizeMode="contain">
                    <View style = {styles.imageBackgrond}>
                        <PlayButton/>
                    </View>
                </ImageBackground>

            </View>

            </LinearGradient>
        </View>

    );
};

const styles = StyleSheet.create({
    global:{
        backgroundColor: MiniJeu.BgGradientColor1,
        borderRadius: 10,
        width : windowWidth*0.8
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