import React, { useContext, useEffect, useState } from "react";
import { View, Image, StyleSheet, ImageBackground, Text, TouchableOpacity, BackHandler, Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { main } from '../../../constants/Colors';
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import VoteCard from "../../../components/MiniJeu/VoteCard";
import Button from "../../../components/Reusable/ButtonColor";
import { useNavigation } from "@react-navigation/native";
import { GameStateContext } from './GameStateContext';
import RevealRole from "./RevealRole";
import { UserContext } from "../../../UserContext";
import { MiniJeuStackParams } from "../../../components/Navigation/MiniJeuStack";

const Space_Background=require('../../../assets/images/Space_Background.png');
const Logo =require('../../../assets/images/Logo_Minijeu.png');
const Megaphone = require('../../../assets/images/megaphone.png')

type navigationProp = NativeStackNavigationProp<MiniJeuStackParams, 'RevealRole'>;

interface Player {
    id: string;
    name: string;
    photo: any;
}

interface PlayerInfo {
    player: Player;
    role: string;
    alive: boolean;
    mot: string;
}


const Vote = () => {
    const [selectedPlayer, setSelectedPlayer] = useState<PlayerInfo | null>(null);
    const [gameState, setGameState] = useContext(GameStateContext)
    const navigation = useNavigation<navigationProp>();

    let data = gameState.map((c) => ({
        ...c // on inclut toutes les propriétés de chaque élément de selectedPlayers
    }));


    const handleVote = () => {
        if (selectedPlayer) {
            //Met a jour le gameState avec la personne eliminée
            const newGameState = gameState.map(player => {
            if (player.player.id === selectedPlayer.player.id) {
              return {
                ...player,
                alive: false,
              }
            }
    
            return player;
          });
          setGameState(newGameState);
          navigation.navigate('RevealRole', {selectedPlayer});
          setSelectedPlayer(null)
        } else {
            Alert.alert("Aucune sélection","Sélectionne le joueur que vous souhaitez exclure")
        }
    };

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
            <View style={styles.Logo}>
                <Image source={Logo} />
            </View>
            <View style={styles.container}>
                <View style={styles.consigne}>
                    <ImageBackground 
                    source={Megaphone} 
                    resizeMode="contain"
                    style={styles.imageBackground}
                    >
                        <Text style={styles.text1}>Énoncez chacun un indice puis désignez quelqu'un à éliminier</Text>
                    </ImageBackground>
                </View>
                <View style={styles.voteCard}>
                    <VoteCard data={data} selectedPlayer={selectedPlayer} onPress={setSelectedPlayer} />
                </View>
                <Button text="Voter" colorBackGround={"#3B41F1"} colorText="white" onPress={() => handleVote()}/>
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

    voteCard:{
        flex:0.7,
    },

    classement:{
        flex:0.8,
        paddingBottom:20,
        paddingTop:30,
    },

    container:{
        width:'90%',
        flex:1,
        marginBottom:40,
        justifyContent:'space-around'
    },

    textInput:{
        backgroundColor:'rgba(237, 240, 250, 0.85)',
        borderRadius:10,
        padding:10,
        alignItems:'flex-start',
        flex:1,
        marginLeft:8,
        fontSize :17
    },

    text1: {
        color: main.LightWhite,
        fontWeight: '600',
        fontSize: 20,
    },

    text2: {
        color: main.LightWhite,
        fontWeight: '600',
        fontSize: 27,
    },


    imageBackground: {
        flex: 1,             
        width: '100%',       
        justifyContent: 'center',
        alignItems: 'center',
    },

    Logo:{
        margin:10
    },

    Image:{
        width:350,
        height:300,
    },

    Button:{
        width:'90%',
        marginTop:20
    },

    Lign:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        paddingLeft:20,
        paddingRight:20,
        marginTop:20
    },

    consigne: {
        backgroundColor: '#3B41F1',
        height: 200,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },

    
});

export default Vote;
