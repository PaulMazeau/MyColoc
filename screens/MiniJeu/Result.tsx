import React, {useState} from "react";
import { View, Image, StyleSheet, ImageBackground, Text, Dimensions } from "react-native";
import Button from "../../components/Reusable/ButtonColor";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { main } from '../../constants/Colors';
import { MiniJeuStackParams } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";

const Space_Background=require('../../assets/images/Space_Background.png');
const Logo =require('../../assets/images/Logo_Minijeu.png');
const CardIncognito =require('../../assets/images/Card.png');
const CardCivil =require('../../assets/images/Card.png');
const windowHeight = Dimensions.get('window').height;

type navigationProp1 = NativeStackNavigationProp<MiniJeuStackParams, 'IncognitoSetUp'>;
type navigationProp2 = NativeStackNavigationProp<MiniJeuStackParams, 'MiniJeu'>;

const Result = () => {
    const navigation1 = useNavigation<navigationProp1>();
    const navigation2 = useNavigation<navigationProp2>();
    
    //Variable qui permet de set l'ecran gagné si true ou l'ecran perdu si false
    const [isWinner, setIsWinner] = useState(true);
    
    //Variable qui permet de set l'ecran Incognito si true ou Civil si false
    const [isIncognito, setIsIncognito] = useState(true);

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
                    <Text style={styles.text1}>{isWinner ? "Gagné" : "Perdu"}</Text>
                </View>
                <View style={styles.card}>
                <Image source={isIncognito ? CardIncognito : CardCivil} />
                </View>
                <View style={styles.word}>
                <Text style={styles.text2}>{isIncognito ? "Tu étais l'incognito" : "Tu étais un civil"}</Text>
                </View>
                <Button text={"Recommencer"} colorBackGround={"#3B41F1"} colorText={'white'} onPress={()=> navigation1.navigate('IncognitoSetUp')}/>
                <Button text={"Lobby"} colorBackGround={"#3B41F1"} colorText={'white'} onPress={()=> navigation2.navigate('MiniJeu')}/>
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

    word:{
        justifyContent:'center',
        alignItems:'center',
        flex:1
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

export default Result;
