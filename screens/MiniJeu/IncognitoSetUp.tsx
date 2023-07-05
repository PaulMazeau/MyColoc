import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, ImageBackground, Text, TouchableOpacity } from "react-native";
import Regles from '../../components/MiniJeu/Regles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { main } from '../../constants/Colors';
import { MiniJeuStackParams } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../components/Reusable/BackButton";
import PlayersCard from "../../components/MiniJeu/PlayersCard";

const Space_Background=require('../../assets/images/Space_Background.png');
const Logo =require('../../assets/images/Logo_Minijeu.png');

const wordPairs = [
    ['chat', 'chaton'],
    ['maison', 'villa'],
    ['voiture', 'automobile'],
    ['pomme', 'poire'],
    ['chien', 'chiot'],
];


type navigationProp = NativeStackNavigationProp<MiniJeuStackParams, 'PassPhone'>;

const IncognitoSetUp = () => {
    const navigation = useNavigation<navigationProp>();
    
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [gameState, setGameState] = useState([]);
    const [gameStateCopy, setGameStateCopy] = useState([]);

    // Function to assign roles
    const assignRoles = () => {

        const randomWordPair = wordPairs[Math.floor(Math.random() * wordPairs.length)];


        // choose a random index for the 'incognito' player
        const incognitoIndex = Math.floor(Math.random() * selectedPlayers.length);

        const newGameState = selectedPlayers.map((player, index) => ({
            player,
            role: index === incognitoIndex ? 'incognito' : 'civil',
            alive: true,
            mot: index === incognitoIndex ? randomWordPair[1] : randomWordPair[0]
        }));

        setGameState(newGameState);
        setGameStateCopy(newGameState)
    }

    useEffect(() => {
        if (selectedPlayers.length > 0) {
            assignRoles();
        }
    }, [selectedPlayers])

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
            <View style={styles.title}>
                <BackButton color="white"/>
                <Text style={styles.text}>Incognito</Text>
            </View>
            <View style={styles.container}>
                <PlayersCard selectedPlayers={selectedPlayers} setSelectedPlayers={setSelectedPlayers} onPress={() => {selectedPlayers.length<=2? console.log('choisissez au moins 3 joueurs'):navigation.navigate('PassPhone', {gameState, gameStateCopy})}}/>
                <Regles text="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt"/>
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
        alignItems:'center'
    },

    container:{
        justifyContent:'space-between',
        flex:1,
        paddingBottom:40,
        paddingTop:20
    },

    title:{
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
        width:'100%',
        paddingLeft:20,
        marginTop:20
    },

    text: {
        color: main.LightWhite,
        fontWeight: '600',
        fontSize: 20,
    },

    imageBackground: {
        flex: 1,             
        width: '100%',       
        justifyContent: 'center',
        alignItems: 'center',
    },

    logo:{
        margin:10
    }
});

export default IncognitoSetUp;
