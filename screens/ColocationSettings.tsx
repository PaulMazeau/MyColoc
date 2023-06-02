import React, { useContext, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, FlatList, Alert, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenTitle from '../components/Reusable/ScreenTitle'
import { main } from '../constants/Colors';
import { StatusBar } from 'expo-status-bar';
import Button from '../components/Reusable/ButtonColor';
import SettingsCard from '../components/Settings/SettingsCard';
import * as Clipboard from 'expo-clipboard';
import { FB_AUTH, FB_DB } from '../firebaseconfig';
import { UserContext } from '../UserContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SettingsStackParams } from '../App';
import { arrayRemove, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';

type Props = NativeStackScreenProps<SettingsStackParams, 'ColocationSettings'>;

// Définition du type de données
interface Colocataire {
    id: string;
    name: string;
  }
  
// Données de test
const data: Colocataire[] = [
    { id: '1', name: 'Photo du coloc' },
    // Ajoutez plus de colocataires ici
];
  
  const Item = ({ name }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
    </View>
  );

const ColocationSettingsScreen: React.FC = ({navigation}: Props) => {
    const renderItem = ({ item }: { item: Colocataire }) => <Item name={item.name} />;
    const [user, setUser] = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const handleLeaveColocSetup = () => {
     Alert.alert('Attention', 'Quitter la colocation supprimera toutes les données vous concernant dans la colocation, pensez à régler vos dépenses !',
     [{text :'Continuer', onPress : (()=>{isUserSure()})}, {text:'Annuler'}]) 
    }

    const isUserSure = () => {
      Alert.alert('Quitter la colocation', 'Cela supprimera toutes vos données, êtes-vous sur ?', 
      [{text:'Quitter', onPress: () => {handleLeaveColoc()}}, {text: 'Annuler'}])
    }

    const handleLeaveColoc = async () => {
      try {
      setLoading(true)
      const tacheQuery = query(collection(FB_DB, 'Colocs/'+ user.colocID +'/Taches'), where('concerned', 'array-contains', user.uuid));
      const transacQuery = query(collection(FB_DB, 'Colocs/'+user.colocID+'/Transactions'), where('concerned', 'array-contains', user.uuid));
      const tacheSnapshot = await getDocs(tacheQuery);
      const transacSnapshot = await getDocs(transacQuery);
      tacheSnapshot.forEach(async (t) => {await deleteDoc(doc(FB_DB, 'Colocs/' + user.colocID + '/Taches', t.id))})
      transacSnapshot.forEach(async (t) => {await deleteDoc(doc(FB_DB, 'Colocs/' + user.colocID + '/Transactions', t.id))})
      await updateDoc(doc(FB_DB, 'Colocs', user.colocID), {membersID: arrayRemove(user.uuid)});
      await updateDoc(doc(FB_DB, 'Users', user.uuid), {colocID: "0", nomColoc: "", membersID: []});}
      catch{setLoading(false); Alert.alert('Erreur', 'Check ta connection !')}
      finally{
          setLoading(false); Alert.alert('Réussi', 'Tu as bien quitté la colocation !')
          setUser({...user, colocID: "0", membersID: []})
      }
    }
  return (
    <SafeAreaView style={styles.container}>

    <StatusBar style="dark"/>
    <View style={styles.body}>
      <ScreenTitle title={'Settings'} shouldGoBack/>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: Colocataire) => item.id}
        style={styles.container}
      />
      

      <SettingsCard title="Avatar" onPress={() => navigation.navigate('AvatarSettings')} avatar={{uri: user.avatarUrl, cache:'force-cache'}} />
      <SettingsCard title="Code de la colocation" subtitle={user.colocID} onPress={async () => { await Clipboard.setStringAsync(user.colocID); Alert.alert('Succès', 'Le texte a été copié'); }} />
      <SettingsCard title="Contact :" subtitle="support@coloc.fr" onPress={async () => { await Clipboard.setStringAsync("support@coloc.fr"); Alert.alert('Succès', 'Le texte a été copié'); }} />

      <Button text={'Déconnexion'} colorBackGround={'red'} colorText={'white'} onPress={() => {FB_AUTH.signOut(); setUser(null)}} />
      {loading ? <ActivityIndicator size= 'small'/>: <Button text={'Quitter la colocation'} colorBackGround={'red'} colorText={'white'} onPress={() => handleLeaveColocSetup()} />}
    </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: main.BgColor
  },
  body:{
    flex: 1,
    width: '90%',
    marginHorizontal: '5%'
  },
  item: {
    backgroundColor: '#172ACE',
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontSize: 32,
    color: 'white'
  },
});

export default  ColocationSettingsScreen

function setUser(arg0: null) {
  throw new Error('Function not implemented.');
}
