import React, { useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, FlatList, Alert } from 'react-native'
import ScreenTitle from '../components/Reusable/ScreenTitle'
import { main } from '../constants/Colors';
import { StatusBar } from 'expo-status-bar';
import Button from '../components/Reusable/ButtonColor';
import SettingsCard from '../components/Settings/SettingsCard';
import * as Clipboard from 'expo-clipboard';
import { FB_AUTH } from '../firebaseconfig';
import { UserContext } from '../UserContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SettingsStackParams } from '../App';

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
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar style="dark"/>
    <View style={styles.body}>
      <ScreenTitle title={'Settings'} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: Colocataire) => item.id}
        style={styles.container}
      />
      
      <SettingsCard title="Nom et mot de passe" onPress={() => navigation.navigate('UserSettings')} />
      <SettingsCard title="Avatar" onPress={() => navigation.navigate('AvatarSettings')} />
      <SettingsCard title="Code de la colocation" subtitle="3000" onPress={async () => { await Clipboard.setStringAsync("3000"); Alert.alert('Succès', 'Le texte a été copié'); }} />
      <SettingsCard title="Contact :" subtitle="support@coloc.fr" onPress={async () => { await Clipboard.setStringAsync("support@coloc.fr"); Alert.alert('Succès', 'Le texte a été copié'); }} />

      <Button text={'Déconnexion'} colorBackGround={'red'} colorText={'white'} onPress={() => {FB_AUTH.signOut(); setUser(null)}} />
      <Button text={'Quitter la colocation'} colorBackGround={'red'} colorText={'white'} onPress={() => console.log('prout')} />
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
