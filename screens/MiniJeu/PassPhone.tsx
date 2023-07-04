import React from "react";
import { View, Image, StyleSheet, ImageBackground, Text, Dimensions } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { main } from '../../constants/Colors';
import { MiniJeuStackParams } from '../../App';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

import { useNavigation } from "@react-navigation/native";
import Button from "../../components/Reusable/ButtonColor";

const Space_Background=require('../../assets/images/Space_Background.png');
const Logo =require('../../assets/images/Logo_Minijeu.png');
const windowHeight = Dimensions.get('window').height;

type Props = NativeStackScreenProps<MiniJeuStackParams, 'PassPhone'>;

type navigationProp = NativeStackNavigationProp<MiniJeuStackParams, 'Mot'>;



const PassPhone = ({route}: Props) => {
    const {gameState} = route.params;
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
            <View style={styles.logo}>
                <Image source={Logo} />
            </View>
            <View style={styles.container}>
                <View style={styles.containerText}>
                    <Text style={styles.text1}>Passe le téléphone à Paul, son môt va être dévoilé</Text>
                </View>
                <Button text="Réveler le mot" colorBackGround={main.MainColor} colorText="white" onPress={() => {navigation.navigate('Mot'); console.log(gameState)}}/>
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
        paddingTop:20,
        paddingHorizontal:10
    },

    text1: {
        color: main.LightWhite,
        fontWeight: '600',
        fontSize: 20,
        textAlign:'center'
    },

    containerText:{
        
        flex:1,
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
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

export default PassPhone;
