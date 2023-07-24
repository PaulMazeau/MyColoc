import React, { useContext, useEffect, useState } from "react";
import { View, Image, StyleSheet, ImageBackground, Text, TouchableOpacity, Modal, ActivityIndicator } from "react-native";
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
import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { FB_DB } from "../../../firebaseconfig";
import { useContentWidth } from "react-native-render-html";
import { AuPlusProcheContext, ColocContext, UserContext } from "../../../UserContext";
import Answer from "../../../components/MiniJeu/Answer";
import AuprocheGame from "../../../components/MiniJeu/AuprocheGame";

const Space_Background=require('../../../assets/images/Space_Background.png');
const Logo =require('../../../assets/images/Logo_Minijeu.png');


type navigationProp = NativeStackNavigationProp<MiniJeuStackParams, 'Guess'>;

const AuPlusProcheWait = () => {
    const navigation = useNavigation<navigationProp>();
    const [refresh, setRefresh] = useState(0)
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
                {loading ? <ActivityIndicator size='large'/> :<Button text={'Démarrer la partie'} onPress={()=>{handleStartSalon()}} colorBackGround={'red'} colorText={'white'}/>}
                </>
            )
        }
        if(userIsIn){
            return(
                <>
                <Text>Demande à {dataOwner.nom} pour démarrer la partie !</Text>
                {loading ? <ActivityIndicator size='large'/> :<Button text={'Quitter la partie'} onPress={()=>{handleLeaveSalon()}} colorBackGround={'red'} colorText={'white'}/>}
                </>
            )
        }
        return(
            <>
            {loading ? <ActivityIndicator size='large'/> :<Button text={'Rejoindre la partie'} onPress={()=>{handleJoinSalon()}} colorBackGround={'red'} colorText={'white'}/>}
            </>
        )
    }
    if(salon && salon.started == false){
    return(
        <SafeAreaView>
            <Text>Il existe un salon. Les participants sont:</Text>
            {dataParticipants.map(c=>{return(
                <Text key={c.uuid}>{c.nom}</Text>
            )})}
            {renderButtonSafely()}
        </SafeAreaView>
    )}
    //lorsque salon est démarré
    if(!userIsIn && salon.started){
        return(
            <SafeAreaView>
                <Text>GAME EN COURS, ATTENDS POUR REJOINDRE</Text>
            </SafeAreaView>
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
