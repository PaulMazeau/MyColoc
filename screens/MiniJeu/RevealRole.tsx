import React, {useContext, useEffect, useState} from "react";
import { View, Image, StyleSheet, ImageBackground, Text, Dimensions } from "react-native";
import Button from "../../components/Reusable/ButtonColor";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { main } from '../../constants/Colors';
import { MiniJeuStackParams } from '../../App';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";
import { GameStateContext } from "./GameStateContext";

const Space_Background=require('../../assets/images/Space_Background.png');
const Logo =require('../../assets/images/Logo_Minijeu.png');
const CardIncognito =require('../../assets/images/Card.png');
const CardCivil =require('../../assets/images/Card.png');
const windowHeight = Dimensions.get('window').height;

type UniversalNavigationProp = NativeStackNavigationProp<MiniJeuStackParams, keyof MiniJeuStackParams>;
type Props = NativeStackScreenProps<MiniJeuStackParams, 'RevealRole'>;



const RevealRole = ({route}:Props) => {
    const navigation = useNavigation<UniversalNavigationProp>();
    const { selectedPlayer } = route.params;
    const [gameState, setGameState] = useContext(GameStateContext);
    type Screen = "Vote" | "IncognitoSetUp";
    const [navigateTo, setNavigateTo] = useState<Screen>('Vote');

    
    //Variable qui permet de set à gagné, raté ou perdu
    const [isWinner, setIsWinner] = useState('Raté');
    
    //Variable qui permet de set l'ecran Incognito si true ou Civil si false
    const [isIncognito, setIsIncognito] = useState(false);

    const [incognitoName, setIncognitoName] = useState('');

    useEffect(() => {
        Elimination()
        if(selectedPlayer.role == 'incognito'){
            setIsIncognito(true);
            setIsWinner('Gagné')
            setNavigateTo('IncognitoSetUp')
        }
        
    }, [selectedPlayer]); // Exécutez ceci uniquement lorsque selectedPlayer change

    useEffect(() => {

        const aliveCount = gameState.filter(player => player.alive).length;
        const incognito = gameState.find(player => player.alive && player.role === 'incognito');

        // Si seulement 2 joueurs restent et qu'il y a un incognito, naviguer vers 'IncognitoSetUp', sinon naviguer vers 'Vote'
        if (aliveCount === 2 && incognito) {
            setIsWinner('Perdu')
            setNavigateTo('IncognitoSetUp')
            setIncognitoName(incognito.player.name)
        }
    },[gameState])


    const Elimination = () => {
        // modifie le gameState avec le joueur voté isAlive=false
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
    };
    

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
                <View style={styles.word}>
                    <Text style={styles.text1}>{isWinner}</Text>
                </View>
                <View style={styles.card}>
                <Image source={isIncognito ? CardIncognito : CardCivil} />
                </View>
                <View style={styles.word}>
                <Text style={styles.text2}>{isIncognito ? `${selectedPlayer.player.name} était l'incognito` : `${selectedPlayer.player.name} était un civil`}</Text>
                {isWinner === 'Perdu' && <Text style={styles.text2}>{`${incognitoName} était l'incognito`}</Text>}
                </View>
                <Button text={"Continuer"} colorBackGround={"#3B41F1"} colorText={'white'} onPress={()=> {navigation.navigate(navigateTo)}}/>
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
    },

    word:{
        marginTop:20,
        alignItems:'center'
    },

    text1: {
        color: main.LightWhite,
        fontWeight: '600',
        fontSize: 40,
    },

    text2: {
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
    },

    card:{
        height:windowHeight*0.35,
    }
});

export default RevealRole;
