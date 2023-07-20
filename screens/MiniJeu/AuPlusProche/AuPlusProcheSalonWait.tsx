import { doc, getDoc } from 'firebase/firestore'
import React, { useContext, useEffect } from 'react'
import { View, Text } from 'react-native'
import { FB_DB } from '../../../firebaseconfig'
import { UserContext } from '../../../UserContext'
import { useNavigation } from '@react-navigation/native'


export default function AuPlusProcheSalonWait() {
    const [user, setUser] = useContext(UserContext)
    const navigation = useNavigation()
    useEffect(()=>{
        const getData = async ()=>{
            await getDoc(doc(FB_DB, 'Colocs/'+user.colocID+'/Salon/', 'salon'))
        }
        getData()
    }, [])
  return (
    <View>
      <Text>AuPlusProcheSalonWait</Text>
    </View>
  )
}
