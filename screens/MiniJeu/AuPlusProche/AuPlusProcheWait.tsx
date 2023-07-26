import React, { useContext, useEffect, useState } from "react";
import { View, Image, StyleSheet, ImageBackground, Text, TouchableOpacity, Modal, ActivityIndicator, Alert } from "react-native";
import Regles from '../../../components/MiniJeu/Regles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import WaitingCard from "../../../components/MiniJeu/WaitingCard";
import { main } from '../../../constants/Colors';
import { MiniJeuStackParams } from '../../../components/Navigation/MiniJeuStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";
import Button from "../../../components/Reusable/ButtonColor";
import BackButton from "../../../components/Reusable/BackButton";
import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { FB_DB } from "../../../firebaseconfig";
import { AuPlusProcheContext, ColocContext, UserContext } from "../../../UserContext";
import Answer from "../../../components/MiniJeu/Answer";
import AuprocheGame from "../../../components/MiniJeu/AuprocheGame";
import FloatingAvatar from "./FloatingAvatar";

const Space_Background=require('../../../assets/images/Space_Background.png');
const Logo =require('../../../assets/images/Logo_Minijeu.png');


type navigationProp = NativeStackNavigationProp<MiniJeuStackParams, 'Guess'>;

const AuPlusProcheWait = () => {
    const navigation = useNavigation<navigationProp>();
    const [user, setUser] = useContext(UserContext)
    const [coloc, setColoc] = useContext(ColocContext)
    const [salon, setSalon] = useContext(AuPlusProcheContext)
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCreateSalon = async ()=>{
        try {
            setLoading(true)
            const entry = {
                started: false,
                participants: [user.uuid],
                questionUid: '1',
                points : [],
                owner: user.uuid
            } 
            await setDoc(doc(FB_DB, 'Colocs/'+user.colocID+'/Salon', 'salon'), entry)
        } catch (error) {
            alert(error.message)
        }finally{
            setLoading(false)
            setModalVisible(false)
        }
    }
    const handleJoinSalon = async () => {
        try {
            setLoading(true)
            await updateDoc(doc(FB_DB, 'Colocs/'+user.colocID+'/Salon', 'salon'), {participants: arrayUnion(user.uuid)})
        } catch (error) {
            alert(error.message)
        }finally{setLoading(false)}
    }
    const handleStartSalon = async () => {
        try {
            setLoading(true)
            await updateDoc(doc(FB_DB, 'Colocs/'+user.colocID+'/Salon', 'salon'), {started: true})
        } catch (error) {
            alert(error.message)
        }finally{setLoading(false)}
    }

    const handleLeaveSalon = async () => {
        try {
           setLoading(true) 
           await updateDoc(doc(FB_DB, 'Colocs/'+user.colocID+'/Salon', 'salon'), {participants: arrayRemove(user.uuid)})
        } catch (error) {
            alert(error.message)
        }finally{setLoading(false)}
    }
    const handleReplaceSalonChecker = () => {
        Alert.alert('Nouveau salon', "Creer un nouveau salon supprimera l'existant. Êtes-vous sur ?",
        [{text :'Oui', onPress : (()=>{handleReplaceSalon()})}, {text:'Non'}])
    }
    const handleReplaceSalon = async () => {
        try {
            setLoading(true)
            const entry = {
                started: false,
                participants: [user.uuid],
                questionUid: '1',
                points : [],
                owner: user.uuid
            } 
            await setDoc(doc(FB_DB, 'Colocs/'+user.colocID+'/Salon', 'salon'), entry)
        } catch (error) {
            alert(error.message)
        }finally{
            setLoading(false)
        }
    }
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
                            {loading ? <ActivityIndicator size='large'/> : <Button text={'Oui'} onPress={()=>{handleCreateSalon()}} colorBackGround={'blue'} colorText={'white'}/>}
                            <Button text={'Non'} onPress={()=>{setModalVisible(false)}} colorBackGround={'red'} colorText={'white'}/>
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
    const dataParticipants = coloc.filter(c=> salon.participants.includes(c.uuid))
    const userIsIn = salon.participants.includes(user.uuid)
    const renderButtonSafely = () => {
        const dataOwner = coloc.find(c => c.uuid == salon.owner)
        const userIsOwner = salon.owner == user.uuid 
        if(userIsOwner){
            return(
                <>
                {loading ? <ActivityIndicator size='large'/> :<Button text={'Démarrer la partie'} onPress={()=>{handleStartSalon()}} colorBackGround={'#5368F9'} colorText={'white'}/>}
                {loading ?  <ActivityIndicator size='large'/>:<Button text={'Creer un nouveau salon'} onPress={()=>{handleReplaceSalonChecker()}} colorBackGround={'#5368F9'} colorText={'white'}/>}
                </>
            )
        }
        if(userIsIn){
            return(
                <>
                <Text>Demande à {dataOwner.nom} pour démarrer la partie !</Text>
                {loading ? <ActivityIndicator size='large'/> :<Button text={'Quitter la partie'} onPress={()=>{handleLeaveSalon()}} colorBackGround={'#5368F9'} colorText={'white'}/>}
                {loading ?  <ActivityIndicator size='large'/>:<Button text={'Creer un nouveau salon'} onPress={()=>{handleReplaceSalonChecker()}} colorBackGround={'#5368F9'} colorText={'white'}/>}
                </>
            )
        }
        return(
            <>
            {loading ? <ActivityIndicator size='large'/> :<Button text={'Rejoindre la partie'} onPress={()=>{handleJoinSalon()}} colorBackGround={'#5368F9'} colorText={'white'}/>}
            {loading ?  <ActivityIndicator size='large'/>:<Button text={'Creer un nouveau salon'} onPress={()=>{handleReplaceSalonChecker()}} colorBackGround={'#5368F9'} colorText={'white'}/>}
            </>
        )
    }
    if(salon && salon.started == false){
    return(
        <ImageBackground 
        source={Space_Background} 
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <SafeAreaView style={styles.global} edges={['top']}>
          <View style={styles.topLign}>
            <TouchableOpacity style={styles.quitter} onPress={() => navigation.goBack()}>
              <BackButton color={"#5368F9"}/>
            </TouchableOpacity>
            <View style={styles.logo}>
              <Image source={Logo} />
            </View>
          </View>
          <View style={styles.WaitingGroup}>
          {dataParticipants.map(c => {
            return (
                <FloatingAvatar key={c.uuid} url={c.avatarUrl} />
            );
            })}
            </View>
            <View style={styles.TitleSalon}>
            <Text style={styles.SalonTextStyle}>Bienvenue dans le salon</Text>
            <Text style={styles.participant}>Tu vas retrouver ici tout les participants de ta partie. Le propriétaire lancera quand tout le monde sera là.</Text>
            </View>
          {renderButtonSafely()}
        </SafeAreaView>
      </ImageBackground>
           
    )}
    //lorsque salon est démarré
    if(!userIsIn && salon.started){
        return(
            <ImageBackground 
            source={Space_Background} 
            resizeMode="cover"
            style={styles.imageBackground}
            >
            <SafeAreaView style={styles.global} edges={['top']}>
                <View style={styles.topLign}>
                    <TouchableOpacity style={styles.quitter} onPress={() => navigation.goBack()}>
                        <BackButton color={"#5368F9"}/>
                    </TouchableOpacity>
                    <View style={styles.logo}>
                        <Image source={Logo} />
                    </View>
                </View>
                <Text style={{color: 'white'}}>Une partie est en cour, attends la fin avant de pourvoir rejoindre</Text>
            </SafeAreaView>
            </ImageBackground>
        )
    }
    return(
        <AuprocheGame />
    )

};

const styles = StyleSheet.create({
    global: {
        flex:1,
        width:'100%',
    },
    topLign:{
        flexDirection:'row',
        justifyContent : 'center',
        width:'100%'
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
        margin:10,
        alignItems: 'center'
    },

    quitter: {
        backgroundColor: '#222531',
        height: 30,
        paddingRight: 4,
        borderRadius: 30,
        width: 30,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:10,
        marginTop:25,
        position:'absolute',
        left:0
      },
      participantContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      avatar: {
        width: 40, 
        height: 40, 
        borderRadius: 20,
        marginRight: 10, 
      },
      participant: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '500'
      },
      WaitingGroup: {
          flexDirection:'row',
          marginHorizontal: '5%',
          borderRadius: 12,
          padding: 12,
          marginBottom: 24,
      },
      SalonTextStyle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10,
        color: 'white',
        textAlign: 'center',
        marginTop: 70
      },
      TitleSalon: {
          width: '90%',
          marginHorizontal: '5%',
          marginBottom: 12
      }
});

export default AuPlusProcheWait;
