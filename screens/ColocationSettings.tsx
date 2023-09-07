  import React, { useContext, useState } from 'react'
  import { View, StyleSheet, Text, FlatList, Alert, ActivityIndicator, Image, Dimensions } from 'react-native'
  import { SafeAreaView } from 'react-native-safe-area-context';
  import ScreenTitle from '../components/Reusable/ScreenTitle'
  import { main } from '../constants/Colors';
  import { StatusBar } from 'expo-status-bar';
  import Button from '../components/Reusable/ButtonColor';
  import SettingsCard from '../components/Settings/SettingsCard';
  import * as Clipboard from 'expo-clipboard';
  import { FB_AUTH, FB_DB } from '../firebaseconfig';
  import { ColocContext, UserContext } from '../UserContext';
  import { NativeStackScreenProps } from '@react-navigation/native-stack';
  import { arrayRemove, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
  import { ScrollView } from 'react-native-gesture-handler';
import { SettingsStackParams } from '../components/Navigation/SettingsStack';

  type Props = NativeStackScreenProps<SettingsStackParams, 'ColocationSettings'>;

  const windowHeight = Dimensions.get('window').height;

  // Définition du type de données
  interface Colocataire {
      id: string;
      name: string;
      photo: any;
    }

  //Render d'un coloc dans la flatlist
    const Item = ({ name, photo }) => (
      <View style={styles.colocataire}>
          <View style={styles.ImageContainer}>
          <Image source={{uri : photo}} style={styles.Image}/>
          </View>
          <Text style={styles.nom}> {name} </Text>
      </View>
    );

  const ColocationSettingsScreen: React.FC = ({navigation}: Props) => {
      const renderItem = ({ item }: { item: Colocataire }) => (
        <Item name={item.name} photo={item.photo} />
      );
      const [coloc, setColoc] = useContext(ColocContext);
      const [user, setUser] = useContext(UserContext)
      const [loading, setLoading] = useState(false)


      const data = coloc.map((c)=>{ //data dans le dropdown
        var rObj = {}
        rObj['id'] = c.nom
        rObj['name'] = c.nom
        rObj['photo'] = c.avatarUrl
        return rObj;
      }) 

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
      <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark"/>
      <ScreenTitle title={'Settings'} shouldGoBack/>
      <View style={styles.body}>
      
        <View style={styles.containerFlatList}>
          <View style={styles.flatlist}>
              <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item: Colocataire) => item.id}
              numColumns={3}   
              columnWrapperStyle={{justifyContent:'space-around'}}
              />
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
        <SettingsCard title="Changer d'avatar" onPress={() => navigation.navigate('AvatarSettings')} avatar={{uri: user.avatarUrl, cache:'force-cache'}} />
        <SettingsCard title="Code de la colocation" subtitle={user.colocID} onPress={async () => { await Clipboard.setStringAsync(user.colocID); Alert.alert('Succès', 'Le texte a été copié'); }} />
        <SettingsCard title="Contact :" subtitle="support@coloc.fr" onPress={async () => { await Clipboard.setStringAsync("support@coloc.fr"); Alert.alert('Succès', 'Le texte a été copié'); }} />

        <Button text={'Déconnexion'} colorBackGround={'#E40000'} colorText={'white'} onPress={() => {FB_AUTH.signOut(); setUser(null)}} />
        {loading ? <ActivityIndicator size= 'small'/>: <Button text={'Quitter la colocation'} colorBackGround={'#E40000'} colorText={'white'} onPress={() => handleLeaveColocSetup()} />}
        </ScrollView>
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
      marginHorizontal: '5%',
    },
    containerFlatList: {
      marginBottom:10,
    },
    flatlist:{
      backgroundColor: '#172ACE',
      borderRadius: 10,
      padding:10,
      maxHeight:windowHeight*0.5
    },
    colocataire: {
      alignItems: 'center',
      margin: 6
    },
    ImageContainer: {
      height: 90,
      width: 90,
      borderRadius: 4
    },
    nom: {
      color: 'white',
      fontSize: 13,
      marginTop: 5,
      fontWeight: '700'
    },
    Image: {
      height: '100%',
      width: '100%',
      borderRadius: 5,
    },

  });

  export default  ColocationSettingsScreen