import React from "react";
import { View, Image, StyleSheet, ImageBackground, Text,  KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { main } from './../../constants/Colors';
import QuestionNumber from "../../components/MiniJeu/QuestionNumber";
import TimeLeft from "./TimeLeft";
import { MiniJeuStackParams } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import ButtonColor from '../../components/Reusable/ButtonColor'


const LogoBlackWhite =require('./../../assets/images/Logo_Minijeu_BlackWhite.png');

type Props = {
    image:any;
    question: string
  };

const Guess = ({image, question}: Props) => {
  
    return (
        <View style={{width:'100%', flex:1}}>
            <View style={styles.Logo}>
                <Image source={image} style={styles.Image} />
            </View>
            <View style={styles.Lign}>
                <QuestionNumber number={2} total={10}/>
                <TimeLeft number={30}/>
            </View>
            <View style={styles.Question}>
                <Text style={styles.text}>Quelle est la distance Terre-Lune</Text>
            </View>
            <View style={{width:'100%', height:'100%',alignItems:'center'}}>
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
            </View>
            </View>
        </View>
    );
  
}

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
        alignItems:'center'
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
        marginTop:20,
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

export default Guess
