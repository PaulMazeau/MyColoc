import React, {useContext, useEffect, useState} from "react";
import { View, Image, StyleSheet, ImageBackground, Text, Dimensions, TouchableOpacity } from "react-native";
import Button from "../../../components/Reusable/ButtonColor";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { main } from '../../../constants/Colors';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";
import { GameStateContext } from "./GameStateContext";
import { BackHandler } from 'react-native';
import { MiniJeuStackParams } from "../../../components/Navigation/MiniJeuStack";

const Space_Background=require('../../../assets/images/Space_Background.png');
const Logo =require('../../../assets/images/Logo_Minijeu.png');
const CardIncognito =require('../../../assets/images/IncognitoIcon.png');
const CardCivil =require('../../../assets/images/Civil1Icon.png');
const CardCivil2 = require('../../../assets/images/Civil2Icon.png');

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

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

    const [randomCardCivil, setRandomCardCivil] = useState(CardCivil);

    //Permet de ne pas revenir en arriere avec un swipe natif android
    useEffect(() => {

        if (Math.random() < 0.5) {
            setRandomCardCivil(CardCivil);
        } else {
            setRandomCardCivil(CardCivil2);
        }


        const backAction = () => {
          return true;
        };
      
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
      
        return () => backHandler.remove();
        
    }, []);


    useEffect(() => {

        const aliveCount = gameState.filter(player => player.alive).length;
        const incognito = gameState.find(player => player.role === 'incognito');
        setIncognitoName(incognito.player.name)

        // Si seulement 2 joueurs restent et qu'il y a un incognito, naviguer vers 'IncognitoSetUp', sinon naviguer vers 'Vote'
        if (aliveCount === 2 && incognito) {
            setIsWinner('Perdu')
            setNavigateTo('IncognitoSetUp')
        }

        if(selectedPlayer.role == 'incognito'){
            setIsIncognito(true);
            setIsWinner('Gagné');
            setNavigateTo('IncognitoSetUp');
        }
    },[gameState])

    const colorMapping = {
        'Perdu': '#B21A1A',
        'Raté': '#C5A656',
        'Gagné': '#8FBA7A'
    };

    
    

    return (
        
        <ImageBackground 
        source={Space_Background} 
        resizeMode="cover"
        style={styles.imageBackground}
        >
        <SafeAreaView style={styles.global} >
        <StatusBar style="light"/>
            <View style={styles.logo}>
                <Image source={Logo} />
            </View>
            <View style={styles.container}>
                <View style={styles.word}>
                    <Text style={styles.text1}>{isWinner}</Text>
                </View>
                <View style={[styles.card, {backgroundColor: colorMapping[isWinner]}]}>
                    <Image source={isWinner==='Raté' ? randomCardCivil : CardIncognito} style={{height:210, width:210}}/>
                </View>

                <View style={styles.word}>
                <Text style={styles.text2}>{isIncognito ? `${selectedPlayer.player.name} était l'incognito` : `${selectedPlayer.player.name} était un civil`}</Text>
                {isWinner === 'Perdu' && <Text style={styles.text2}>{`${incognitoName} était l'incognito`}</Text>}
                </View>
                <TouchableOpacity style={styles.buttonContinuer} onPress={()=> {navigation.navigate(navigateTo)}}>
                    <Text style={styles.buttonText}>Continuer</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
      </ImageBackground>
    );
};

const styles = StyleSheet.create({
    global: {
        flex:1,
        alignItems:'center',
    },

    container:{
        justifyContent:'space-around',
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
        width:windowWidth*0.7,
        backgroundColor:'#8FBA7A',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
    },

    buttonContinuer: {
        backgroundColor: '#3B41F1',
        borderRadius: 12,
        padding: 10,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 20
    }
});

export default RevealRole;
