import React from "react";
import { View, Image, StyleSheet, ImageBackground, Text, TouchableOpacity, Dimensions } from "react-native";
import VoteCard from "../../components/MiniJeu/VoteCard";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { main } from '../../constants/Colors';
import { MiniJeuStackParams } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useNavigation } from "@react-navigation/native";

const Space_Background=require('../../assets/images/Space_Background.png');
const Logo =require('../../assets/images/Logo_Minijeu.png');
const Card =require('../../assets/images/Card.png');
const windowHeight = Dimensions.get('window').height;


type navigationProp = NativeStackNavigationProp<MiniJeuStackParams, 'Mot'>;

const Mot = () => {
    const navigation = useNavigation<navigationProp>();
    return (
        <ImageBackground 
        source={Space_Background} 
        resizeMode="cover"
        style={styles.imageBackground}
        >
        <SafeAreaView style={styles.global} >
        <StatusBar style="light" />
        <View style={styles.global}>
            <View style={styles.logo}>
                <Image source={Logo} />
            </View>
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.text1}>Romain commence</Text>
                </View>
                <ImageBackground 
                source={Card} 
                resizeMode="contain"
                style={styles.card}
                >
                    <View style={styles.word}>
                        <Text style={styles.text2}>Marseille</Text>
                    </View>
                </ImageBackground>
                <VoteCard/>
            </View>
        </View>
        </SafeAreaView>
      </ImageBackground>
    );
};

const styles = StyleSheet.create({
    global: {
        flex:1,
        width:'100%',
        alignItems:'center',
    },

    container:{
        justifyContent:'space-between',
        flex:1,
        paddingBottom:40,
        paddingTop:20
    },

    title:{
        justifyContent:'flex-start',
        width:'100%',
        paddingLeft:20,
        marginTop:20
    },

    text1: {
        color: main.LightWhite,
        fontWeight: '600',
        fontSize: 20,
    },

    text2: {
        color: main.TextColor,
        fontWeight: '600',
        fontSize: 35,
    },

    word:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,

    },

    imageBackground: {
        flex: 1,             
        width: '100%',       
        justifyContent: 'center',
        alignItems: 'center',
    },

    logo:{
        margin:10
    },

    card:{
        height:windowHeight*0.35,
    }
});

export default Mot;
