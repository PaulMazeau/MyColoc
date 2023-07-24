import React, { useContext, useEffect, useState } from "react";
import { View, Image, StyleSheet, ImageBackground, Text,KeyboardAvoidingView, ScrollView, TouchableOpacity, Alert } from "react-native";
import Regles from '../../../components/MiniJeu/Regles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { main } from '../../../constants/Colors';
import { MiniJeuStackParams } from '../../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import BackButton from "../../../components/Reusable/BackButton";
import PlayersCard from "../../../components/MiniJeu/PlayersCard";
import { GameStateContext } from './GameStateContext';
import { wordPairs } from './IncognitoWords';
import QuestionNumber from "../../../components/MiniJeu/QuestionNumber";
import TimeLeft from "./../../../components/MiniJeu/TimeLeft";
import { TextInput } from "react-native-gesture-handler";
import ButtonColor from '../../../components/Reusable/ButtonColor'
import Guess from "../../../components/MiniJeu/Guess";
import Answer from "../../../components/MiniJeu/Answer";





const Space_Background=require('../../../assets/images/Space_Background.png');
const Logo =require('../../../assets/images/Logo_Minijeu.png');

const LogoBlackWhite =require('./../../../assets/images/Logo_Minijeu_BlackWhite.png');

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
    
            // Navigate to the new screen with the new game state
            navigation.navigate('PassPhone', { gameState: newGameState });

    }
    




    
    return (
        <KeyboardAvoidingView behavior={"height"} style={{flex: 1}}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
            {/* <Guess image={require('./../../../assets/images/ImageDemo.png')} question="Qu'elle est la distance Terre-Lune ?"/> */}
            <Answer/>
            {/* <View style={styles.Logo}>
                <Image source={require('./../../../assets/images/ImageDemo.png')} style={styles.Image} />
            </View>
            <View style={styles.Lign}>
                <QuestionNumber number={2} total={10}/>
                <TimeLeft number={30}/>
            </View>
            <View style={styles.Question}>
                <Text style={styles.text}>Quelle est la distance Terre-Lune</Text>
            </View>
            <View style={styles.inputContainer}>
                <ImageBackground 
                source={LogoBlackWhite} 
                resizeMode='contain'
                style={styles.LogoBlackWhite}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Ecris ta réponse ici..."
                    placeholderTextColor="#B7B7B7"
                    textAlignVertical="top"
                />
                </ImageBackground>
            </View>
            <View style={styles.Button}>
            <ButtonColor colorBackGround={main.MainColor} colorText={main.LightWhite} text={'Soumettre ta réponse'} onPress={() => {navigation.navigate('Answer')}}/>
            </View> */}
        </View>
        </SafeAreaView>
              </ImageBackground>
            </ScrollView>
        </KeyboardAvoidingView>
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
        paddingBottom:20,
        paddingTop:20
    },

    Question:{
        justifyContent:'flex-start',
        width:'100%',
        paddingLeft:20,
        marginTop:20
    },

    inputContainer:{
        width:'90%',
        height:'20%',
        backgroundColor:main.BgColor,
        borderRadius:10,
        marginTop:15
    },

    blackWhiteBg:{
        backgroundColor:main.BgColor,
        borderRadius:10,
        marginTop:10,
        height:'50%',
        padding:10,
        alignItems:'flex-start',
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

    Logo:{
        margin:10
    },

    LogoBlackWhite:{
        flex:1,
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
    }
});

export default IncognitoSetUp;
