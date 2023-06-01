import React from "react";
import { View, Image, StyleSheet, ImageBackground, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { main } from '../../constants/Colors';
import { MiniJeuStackParams } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";

const Space_Background=require('../../assets/images/Space_Background.png');
const Logo =require('../../assets/images/Logo_Minijeu.png');
const Podium =require('../../assets/images/Podium.png');


type navigationProp = NativeStackNavigationProp<MiniJeuStackParams, 'Answer'>;

const Guess = () => {
    const navigation = useNavigation<navigationProp>();
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
            <View style={styles.podium}>
                <ImageBackground 
                source={Podium} 
                resizeMode="stretch"
                style={styles.podiumImage}
                >
                    <Text style={styles.text1}>La bonne</Text>
                    <Text style={styles.text2}>réponse est</Text>
                    <Text style={styles.text3}>300 000 km</Text>
                </ImageBackground>
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
        paddingBottom:20,
        paddingTop:20
    },

    podium:{
        width:"80%",
        height:"20%"
    },

    podiumImage:{
        height:'100%',
        width:'100%',
        justifyContent:'space-between',
        alignItems:'center',
    },

    inputContainer:{
        width:'90%',
        height:'20%',
        backgroundColor:main.BgColor,
        borderRadius:10,
        marginTop:15
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
        marginTop:5
    },

    text2: {
        color: main.LightWhite,
        fontWeight: '600',
        fontSize: 27,
    },

    text3: {
        color: main.LightWhite,
        fontWeight: '600',
        fontSize: 40,
        marginBottom:10
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
    }
});

export default Guess;
