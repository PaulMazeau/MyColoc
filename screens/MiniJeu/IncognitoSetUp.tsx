import React, { useContext, useEffect, useState } from "react";
import { View, Image, StyleSheet, ImageBackground, Text, TouchableOpacity, Alert } from "react-native";
import Regles from '../../components/MiniJeu/Regles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { main } from '../../constants/Colors';
import { MiniJeuStackParams } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import BackButton from "../../components/Reusable/BackButton";
import PlayersCard from "../../components/MiniJeu/PlayersCard";
import { GameStateContext } from './GameStateContext';




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
    const [gameState, setGameState] = useContext(GameStateContext);

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
    }

    useEffect(() => {
        if (selectedPlayers.length > 0) {
            assignRoles();
        }
    }, [selectedPlayers])


    const route = useRoute();
    
    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         if (route.name === 'IncognitoSetUp') {
    //             const newGameState = gameState.map(playerState => ({
    //                 ...playerState,
    //                 alive: true,
    //             }));
    //             setGameState(newGameState);
    //         }
    //     });
    
    //     return unsubscribe;
    // }, [navigation, route]);


    
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
                <PlayersCard selectedPlayers={selectedPlayers} setSelectedPlayers={setSelectedPlayers} onPress={() => {
                    selectedPlayers.length<=2? 
                    Alert.alert("Il manque des joueurs","Sélectionne au moins trois joueurs !")
                    :
                    navigation.navigate('PassPhone', {gameState})
                    }}/>
                <Regles text="Tous les joueurs obtiennent un mot identique, sauf un ! Démasquez l'Incognito en donnant chacun votre tour un indice sur votre mot, puis votez. L'Incognito gagne s'il survit et qu'il nereste que 2 joueurs."/>
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
