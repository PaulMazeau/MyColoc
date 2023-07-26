import React from "react";
import { View, Image, StyleSheet, ImageBackground, Text } from "react-native";
import { main } from '../../constants/Colors';
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from "expo-linear-gradient";

const Space_Background=require('../../assets/images/Space_Background.png');
const Logo =require('../../assets/images/Logo_Minijeu.png');

const Answer  = ({reponse, timeLeft, goodAnswer, lastQuestion, points}) => {
  
    return (
        <ImageBackground 
            source={Space_Background} 
            resizeMode="cover"
            style={styles.imageBackground}
        >
        <SafeAreaView style={styles.global} edges={['top']} >
            <StatusBar style="light"/>
                <View style={styles.logo}>
                    <Image source={Logo} />
                </View>
                <View style={styles.podium}>
                    <LinearGradient
                        colors={['#5368F9', '#43348A']}
                        style={styles.linearGradient}
                    />
                    <Text style={styles.text}>La bonne réponse est : {'\n'} {reponse}</Text>
                    <Text style={styles.text}>
                        {goodAnswer ? `Tu as vu juste! ${points} points gagnés` : `Tu n'as pas vu juste ! ${'\n'}Tu as ${points} points gagnés`}
                    </Text>
                </View>

            <View style={styles.brick}>
                <LinearGradient
                        colors={['#EC6262', '#D04445']}
                        style={styles.linearGradient}
                    />
                    {lastQuestion ? <Text style={styles.text}>Les résultats s'afficheront dans {timeLeft}secondes</Text> :<><Text style={styles.text}>Prochaine question dans :</Text>
                    <Text style={styles.text}>{timeLeft}s</Text></>}
            </View>
      </SafeAreaView>
      </ImageBackground>
    )
  
}

const styles = StyleSheet.create({
    global: {
        flex:1,
        width:'90%',
        marginHorizontal: '5%',
        alignItems:'center',
    },

    imageBackground: {
        flex: 1,             
        width: '100%',       
        justifyContent: 'center',
        alignItems: 'center',
    },

    podium:{
        width: '100%',
        marginTop:20,
        padding: 12,
        height: 200,
    },

    linearGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
        borderRadius: 12,
    },

    brick:{
        width: '100%',
        height: 120,
        padding: 12,
    },

    text: {
        color: main.LightWhite,
        fontWeight: '600',
        fontSize: 20,
        marginTop:5
    },

    logo:{
        margin:10
      },

});

export default Answer
