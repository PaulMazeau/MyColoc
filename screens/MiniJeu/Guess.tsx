import React from "react";
import { View, Image, StyleSheet, ImageBackground, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { main } from '../../constants/Colors';
import QuestionNumber from "../../components/MiniJeu/QuestionNumber";
import TimeLeft from "./TimeLeft";
import { RootStackParams } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";

const Space_Background=require('../../assets/images/Space_Background.png');
const Logo =require('../../assets/images/Logo_Minijeu.png');
const LogoBlackWhite =require('../../assets/images/Logo_Minijeu_BlackWhite.png');
const Visual =require('../../assets/images/ImageDemo.png');


//type navigationProp = NativeStackNavigationProp<RootStackParams, 'Role'>;

const Guess = () => {
    //const navigation = useNavigation<navigationProp>();
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
            <View style={styles.Logo}>
                <Image source={Visual} style={styles.Image} />
            </View>
            <View style={styles.Lign}>
                <QuestionNumber number={2} total={10}/>
                <TimeLeft number={30}/>
            </View>
            <View style={styles.Question}>
                <Text style={styles.text}>Quelle est la distance Terre-Lune</Text>
            </View>
            <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Ecris ta réponse ici"
              placeholderTextColor={main.TextColor}
              textAlignVertical="top"
            />
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
        width:'100%',
        paddingLeft:20,
        paddingRight:20,
        marginTop:10
    },

    textInput:{
        backgroundColor:main.BgColor,
        borderRadius:10,
        marginTop:10,
        height:'50%',
        padding:10,
        alignItems:'flex-start',
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
        height:'20%'
    },

    Image:{
        width:350,
        height:300,
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

export default Guess;
