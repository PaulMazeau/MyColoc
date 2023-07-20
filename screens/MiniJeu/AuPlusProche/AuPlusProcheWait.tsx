import React, { useContext, useEffect, useState } from "react";
import { View, Image, StyleSheet, ImageBackground, Text, TouchableOpacity, Modal } from "react-native";
import Regles from '../../../components/MiniJeu/Regles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import WaitingCard from "../../../components/MiniJeu/WaitingCard";
import { main } from '../../../constants/Colors';
import { MiniJeuStackParams } from '../../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";
import Button from "../../../components/Reusable/ButtonColor";
import BackButton from "../../../components/Reusable/BackButton";
import { doc, getDoc } from "firebase/firestore";
import { FB_DB } from "../../../firebaseconfig";
import { useContentWidth } from "react-native-render-html";
import { AuPlusProcheContext, UserContext } from "../../../UserContext";

const Space_Background=require('../../../assets/images/Space_Background.png');
const Logo =require('../../../assets/images/Logo_Minijeu.png');


type navigationProp = NativeStackNavigationProp<MiniJeuStackParams, 'Guess'>;

const AuPlusProcheWait = () => {
    const navigation = useNavigation<navigationProp>();
    const [userIsOwner, setUserIsOwner] = useState(true);
    const [refresh, setRefresh] = useState(0)
    const [user, setUser] = useContext(UserContext)
    const [salon, setSalon] = useContext(AuPlusProcheContext)
    const [modalVisible, setModalVisible] = useState(false);
    
    if(!salon){
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
                    <Button text={'Créer un salon'} colorText={'white'} colorBackGround={'blue'} onPress={() => {setModalVisible(true)}}/>
                    <Modal visible={modalVisible} animationType="slide">
                        <SafeAreaView style={styles.container}>
                            <Text style={styles.title}>Creer un salon ?</Text>
                            <Button text={'Oui'} onPress={()=>{setModalVisible(false)}} colorBackGround={'blue'} colorText={'white'}/>
                        </SafeAreaView>
                    </Modal>
                </View>
                <View style={styles.container}>
                {/* <WaitingCard userIsOwner={userIsOwner} onPress={() => 
                        {userIsOwner? navigation.navigate('Guess') : navigation.navigate('Guess')}
                    }/>  */}
                    <TouchableOpacity onPress={()=>{navigation.navigate('AuPlusProcheSalonWait')}}><Text style={{color : 'red'}}>Tu ne vois pas de salon mais tu devrais ? Clique pour rafraîchir</Text></TouchableOpacity>
                
                </View>
            </View>
            </SafeAreaView>
        </ImageBackground>
    )}
    else{
        return(
            <SafeAreaView>
                <Text>Il existe un Salon. Le rejoindre OU re créer une nouvelle partie</Text>
            </SafeAreaView>
        )
    }

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
