import { StyleSheet, Text, View, Image, ScrollView, Alert } from 'react-native';
import BlueGradient from '../components/Reusable/BlueGradient';
import Header from '../components/Reusable/Header';
import { main } from '../constants/Colors';
import BoutonMiniJeu from '../components/Accueil/BoutonMiniJeux';
import MonSolde from '../components/Accueil/MonSolde';
import Suggestion from '../components/Accueil/Suggestions';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import TacheCard from '../components/Tache/TacheCard';
import TacheCardEmpty from '../components/Tache/TacheCardEmpty';
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { FB_DB } from '../firebaseconfig';
import GetNotificationPermission from '../GetNotificationPermission';
import { useNavigation } from '@react-navigation/native';
import { RootStackParams, SettingsStackParams } from '..//App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
const Appartement = require('../assets/images/Appartement.png');
type RootStackNavigationProp = NativeStackNavigationProp<RootStackParams, 'SettingsStack'>;



const AccueilScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [user, setUser] = useContext(UserContext);
  const [nextTask, setNextTask] = useState(null);
  const [wentIn, setWentIn] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  const getTache = async () => {
    const q = query(collection(FB_DB, "Colocs/" + user.colocID + "/Taches"), where('nextOne', '==', user.uuid), orderBy('date', 'desc'), limit(1));
    const data = await getDocs(q);
    setNextTask(data);
  };


  useFocusEffect(
    React.useCallback(() => {
      getTache();
    }, [])
  );

  const onDelete = () => {
    getTache();
  };

  
  

  const renderNextTache = () => {
    if(nextTask){
      if(nextTask.docs.length >0){
        return(
          nextTask.docs.map((doc)=>{
            return(
              <TacheCard tache={doc.data()} key={doc.id} onDelete={onDelete}/>
            )
          })
        )
      }
      else{
        return(
          <TacheCardEmpty imageSource={{uri: user.avatarUrl}}/>
        )
      }
    }
    else{
      return(
        <Text>Tu es le suivant sur aucune tâche</Text>
      )
    }
  }
  const avatar = () => {
    if(firstRender){
    setFirstRender(false)
    if(!wentIn)
    if(user.avatarUrl == ''){
      Alert.alert('Choisis un avatar', 'Sélectionne un avatar parmis ceux disponible pour continuer !',
      [{text :'OK', onPress : (()=>{navigation.navigate('SettingsStack', { screen: 'AvatarSettings' }); setWentIn(true)})}])
      return(
        <></>
      )
  }}}

  
  return (
    <View style={styles.container}>
      <BlueGradient />
      <GetNotificationPermission/>
      {avatar()}
      <View style={styles.appartementContainer}>
        <Image source={Appartement} style={styles.AppartementImage}/>
      </View>
      <View style={styles.headerContainer}>
        <Header/>
      </View>
      <ScrollView
      showsVerticalScrollIndicator={false}
      >
        <View style={styles.scrollView}>
          <Text style={styles.TitreCategorie1}>La selection du mois</Text>
          <Suggestion />
          <View style={styles.row}>
            <MonSolde onPress={() => {navigation.navigate('DepenseStack')}}/>
            <BoutonMiniJeu/>
          </View>
          <Text style={styles.TitreCategorie1}>Ta prochaine Tâche</Text>
          {renderNextTache()}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: main.BgColor,
  },
  headerContainer: {
    position: "absolute",
    width: "100%",
    top: 0,
    zIndex: 1,
  },
  appartementContainer: {
    position: "absolute",
    top: "10%",
    width: "100%",
    zIndex: 1,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  TitreCategorie1: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
    marginRight: 16,
    marginLeft: 16,
    marginTop: 10
  },
  TitreCategorie2: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  AppartementImage: {
    width: 300,
    height: 250,
  },
  scrollView: {
    marginBottom: 90, 
},
});

export default AccueilScreen;
