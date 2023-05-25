import React, {useContext, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {UserContext} from '../UserContext'
import { FB_AUTH, FB_DB } from '../firebaseconfig';
import "react-native-get-random-values";
import {v4 as uuid} from 'uuid';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { TextInput } from 'react-native-gesture-handler';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
export default function NoColoc() {
    const [user, setUser] = useContext(UserContext);
    const [nomColoc, setNomColoc] = useState(null);
    const [codeColoc, setCodeColoc] = useState(null);
    const handleCreateColoc = async () => {
        const userID = FB_AUTH.currentUser.uid
        var colocID = uuid().substring(0, 6)
        console.log(colocID)
        var colocData = await getDoc(doc(FB_DB, "Colocs", colocID));
        while(colocData.exists()){ //checking if colodID already exists
            colocID = uuid().stringify().substring(0, 6)
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
        <View>
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

const styles = StyleSheet.create({})

