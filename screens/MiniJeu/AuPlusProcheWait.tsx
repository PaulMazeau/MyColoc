import React, { useState } from "react";
import { View, Image, StyleSheet, ImageBackground, Text, TouchableOpacity } from "react-native";
import Regles from './../../components/MiniJeu/Regles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import WaitingCard from "../../components/MiniJeu/WaitingCard";
import { main } from '../../constants/Colors';
import { MiniJeuStackParams } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/Reusable/ButtonColor";
import BackButton from "../../components/Reusable/BackButton";

const Space_Background=require('../../assets/images/Space_Background.png');
const Logo =require('../../assets/images/Logo_Minijeu.png');


type navigationProp = NativeStackNavigationProp<MiniJeuStackParams, 'Guess'>;

const AuPlusProcheWait = () => {
    const navigation = useNavigation<navigationProp>();
    const [userIsOwner, setUserIsOwner] = useState(true);

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
                <Text style={styles.text}>Au plus proche</Text>
            </View>
            <View style={styles.Button}>
                <Button text={'Créer un salon'} colorText={'white'} colorBackGround={'blue'} onPress={() => {}}/>
            </View>
            <View style={styles.container}>
                <WaitingCard userIsOwner={userIsOwner} onPress={() => 
                    {userIsOwner? navigation.navigate('Guess') : navigation.navigate('Guess')}
                }/>
                <Regles text="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt"/>
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

    title:{
        flexDirection:'row',
        justifyContent:'flex-start',
        width:'100%',
        marginLeft:20,
        alignItems:'center',
        marginTop:50,
    },

    container:{
        alignItems:'center',
        justifyContent:'space-between',
        flex:1,
        paddingBottom:40,
        paddingTop:15
    },

    Button:{
        justifyContent:'flex-start',
        width:'100%',
        paddingHorizontal:20,
        marginTop:20,
    },

    text: {
        color: main.LightWhite,
        fontWeight: '600',
        fontSize: 20,
        marginLeft:10
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

export default AuPlusProcheWait;
