import React, { useState } from "react";
import { View, Image, StyleSheet, ImageBackground, Text,  KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { main } from './../../constants/Colors';
import QuestionNumber from "../../components/MiniJeu/QuestionNumber";
import TimeLeft from "./TimeLeft";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import ButtonColor from '../../components/Reusable/ButtonColor'


const LogoBlackWhite =require('./../../assets/images/Logo_Minijeu_BlackWhite.png');
const Space_Background=require('../../assets/images/Space_Background.png');
const Logo =require('../../assets/images/Logo_Minijeu.png');

type Props = {
    image:any;
    question: string;
    answer: any;
    timeLeft: number;
    numberOfQuestion: any;
    currQuestion: any;
  };

const Guess = ({image, question, answer, timeLeft, currQuestion, numberOfQuestion}: Props) => {
    const [reponse, setReponse] = useState('')
    const [buttonPressed, setButtonPressed] = useState(false)
    return (
        <ImageBackground 
        source={Space_Background} 
        resizeMode="cover"
        style={styles.imageBackground}
        >

        <SafeAreaView style={styles.global} edges={['top']} >
        <StatusBar style="light" />
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={{paddingBottom: 90}} showsVerticalScrollIndicator={false}>

            <View style={styles.logo}>
                <Image source={Logo} />
            </View>
        
            <Image source={{uri : image}} style={styles.Image} />

            <View style={styles.Lign}>
                <QuestionNumber number={currQuestion+1} total={numberOfQuestion}/>
                <TimeLeft number={timeLeft-5}/>
            </View>

            <View style={styles.Question}>
                <Text style={styles.text}>{question}</Text>
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
                    onChangeText={(e)=>{setReponse(e)}}
                />
                </ImageBackground>
            </View>

            <View style={styles.Button}>
            {buttonPressed ? 
                <View style={styles.Wait}>
                <Text style={{color: 'white'}}>Attends {timeLeft-5} secondes pour voir la réponse</Text>
                </View>
                :
                <TouchableOpacity style={styles.Wait} onPress={() => {answer(reponse);setButtonPressed(true)}}>
                <Text style={{color: 'white'}}>Soumettre ta réponse</Text>
                </TouchableOpacity>
           }
            </View>
           
        </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
        </ImageBackground>
    );
  
}

const styles = StyleSheet.create({
    global: {
        flex:1,
        width: '90%',
        marginHorizontal: '5%'
    },

    Question:{
        justifyContent:'flex-start',
        marginTop:20
    },

    logo:{
        margin:10,
        alignItems: 'center'
      },

    inputContainer:{
        height:'20%',
        backgroundColor:main.BgColor,
        borderRadius:10,
        marginTop:15,
        justifyContent:'center',
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
        color: 'white',
        fontWeight: '600',
        fontSize: 20,
    },

    imageBackground: {
        flex: 1,             
        width: '100%', 
    },

    LogoBlackWhite:{
        flex: .7,
    },

    Image:{
        height:300,
        borderRadius: 12
    },

    Button:{
        marginTop:20,
    },

    Lign:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:20
    },

    Wait: {
        backgroundColor: "#172ACE",
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 48,
        marginBottom: 12,
        paddingHorizontal:10,
    }
});

export default Guess
