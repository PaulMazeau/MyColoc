import React, {useContext, useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import {UserContext} from '../UserContext'
import { FB_AUTH, FB_DB } from '../firebaseconfig';
import * as Crypto from 'expo-crypto';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { main } from '../constants/Colors';
import BlueGradient from '../components/Reusable/BlueGradient';

export default function NoColoc() {
    const [user, setUser] = useContext(UserContext);
    const [nomColoc, setNomColoc] = useState(null);
    const [codeColoc, setCodeColoc] = useState(null);
    const handleCreateColoc = async () => {
        const userID = FB_AUTH.currentUser.uid
        var colocID = Crypto.randomUUID().substring(0, 6)
        console.log(colocID)
        var colocData = await getDoc(doc(FB_DB, "Colocs", colocID));
        while(colocData.exists()){ //checking if colodID already exists
            colocID = Crypto.randomUUID().substring(0, 6)
            colocData = await getDoc(doc(FB_DB, "Colocs", colocID))
        }
        const colocEntry = {
            id: colocID,
            nom: nomColoc,
            membersID: [userID],
        }
        await setDoc(doc(FB_DB, 'Colocs', colocID),colocEntry); //creating the coloc file
        await updateDoc(doc(FB_DB, 'Users', userID), {colocID: colocID, nomColoc: nomColoc, membersID: [FB_AUTH.currentUser.uid]}); //updating user file
        setUser({...user, colocID: colocID, nomColoc: nomColoc, membersID: [FB_AUTH.currentUser.uid]}) //updating user context
    }

    const handleJoinColoc = async () => { //update de la prop membersID des autres membres coté serveurs
        const colocData = await getDoc(doc(FB_DB, "Colocs", codeColoc));
        if(!(colocData.exists())){alert("Ce code n'existe pas !"); setCodeColoc("")}
        else {
            var membersID = colocData.data().membersID;
            membersID.push(FB_AUTH.currentUser.uid);
            await updateDoc(doc(FB_DB, "Users", FB_AUTH.currentUser.uid), {colocID: codeColoc, nomColoc: colocData.data().nom, membersID: membersID})
            await updateDoc(doc(FB_DB, "Colocs", codeColoc), {membersID: membersID});
            setUser({...user, colocID: codeColoc, nomColoc: colocData.data().nom, membersID: membersID})
        }
    }
    return (
        <View style={styles.container}>
            <BlueGradient height={0.6}/>
            <TextInput
            value={nomColoc}
            onChangeText={(text) => setNomColoc(text)}
            placeholder='creer ta coloc'/>
            <TouchableOpacity onPress={() => handleCreateColoc()}><Text>creer</Text></TouchableOpacity>
            <TextInput
            value={codeColoc}
            onChangeText={(text) => setCodeColoc(text)}
            placeholder='join ta coloc'/>
            <TouchableOpacity onPress={() => handleJoinColoc()}><Text>join</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => {FB_AUTH.signOut(); setUser(null)}}><Text>deconnexion</Text></TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({container: {
    flex: 1,
    backgroundColor: main.BgColor,
  },})

