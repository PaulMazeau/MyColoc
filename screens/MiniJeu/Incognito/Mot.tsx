import React, { useContext, useEffect } from "react";
import { View, Image, StyleSheet, ImageBackground, Text, TouchableOpacity, Dimensions, BackHandler } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { main } from '../../../constants/Colors';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import Button from "../../../components/Reusable/ButtonColor";

import { useNavigation } from "@react-navigation/native";
import PassPhone from "./PassPhone";
import { GameStateContext } from "./GameStateContext";
import { MiniJeuStackParams } from "../../../components/Navigation/MiniJeuStack";

const Space_Background=require('../../../assets/images/Space_Background.png');
const Logo =require('../../../assets/images/Logo_Minijeu.png');
const Card =require('../../../assets/images/Card.png');
const windowHeight = Dimensions.get('window').height;

type Props = NativeStackScreenProps<MiniJeuStackParams, 'Mot'>;

type navigationProp = NativeStackNavigationProp<MiniJeuStackParams, 'PassPhone'>;

const Mot = ({route}: Props) => {
    const {playerInfo, updatedGameState} = route.params;
    const gameState = updatedGameState

    const navigation = useNavigation<navigationProp>();

    //Permet de ne pas revenir en arriere avec un swipe natif android
    useEffect(() => {
        const backAction = () => {
          return true;
        };
      
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
      
        return () => backHandler.remove();
    }, []);

    
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
                    <Text style={styles.text1}>{playerInfo.player.name}ton mot est :</Text>
                </View>
                <ImageBackground 
                source={Card} 
                resizeMode="contain"
                style={styles.card}
                >
                    <View style={styles.word}>
                        <Text style={styles.text2}>{playerInfo.mot}</Text>
                    </View>
                </ImageBackground>
                <Button text="Continuer" colorText="white" colorBackGround={"#3B41F1"} onPress={() => {(updatedGameState.length<= 0)? navigation.navigate('Vote'):navigation.navigate('PassPhone', {gameState})}}/>
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
        width:'90%',
        marginHorizontal: '5%',
        flex:1,
        paddingTop:20,
        paddingBottom:40
    },

    title:{
        justifyContent:'flex-start',
        width:'100%',
        marginBottom: 12
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
        maxWidth:220,
        textAlign:'center'
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
        flex:1,
        width:'100%',
        marginBottom:80
    }
});

export default Mot;
