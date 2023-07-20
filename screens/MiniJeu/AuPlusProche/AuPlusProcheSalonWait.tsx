import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { FB_DB } from '../../../firebaseconfig'
import { AuPlusProcheContext, ColocContext, UserContext } from '../../../UserContext'
import { useNavigation } from '@react-navigation/native'
import BackButton from '../../../components/Reusable/BackButton'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function AuPlusProcheSalonWait() {
    const [user, setUser] = useContext(UserContext)
    const [coloc, setColoc] = useContext(ColocContext)
    const [appData, setAppData] = useContext(AuPlusProcheContext)
    console.log(appData)
    const [snap, setSnap] = useState(null)
    useEffect(()=>{
        const subscriber = onSnapshot(doc(FB_DB, 'Colocs/'+user.colocID+'/Salon', 'salon'), (docSnap) => {setSnap(docSnap)})
        return () => {subscriber()}
      }, [])
    useEffect(()=>{
        
    }, [snap])
    
  return (
    <SafeAreaView>
    <BackButton color="black"/>
      <Text>AuPlusProcheSalonWait</Text>
    </SafeAreaView>
  )
}
