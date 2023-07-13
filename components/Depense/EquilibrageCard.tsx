import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useRef } from 'react';
import { Colors, Drawer } from 'react-native-ui-lib';
import RemboursementBS from './RemboursementBS';
import * as Haptics from 'expo-haptics';
import { Shadows } from '../../constants/Shadow';

const EquilibrageCard = ({deveur, receveur, montant}) => {
  const bottomSheetModalRef = useRef(null);
  
  const handlePresentPress = () => {
    bottomSheetModalRef.current?.present();
  };
  
  const handleDismissPress = () => {
    bottomSheetModalRef.current?.dismiss();
  };
  
  const handleDelete = async () => {
    console.log('delete');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  };


  return (
    <View style={styles.body}>
    <Drawer
      rightItems={[{text: 'Supprimer', background: Colors.red30, onPress: () => handleDelete()}]}      
      style={styles.drawer}
    >
    <View style={styles.global}>
    
      <TouchableOpacity style={styles.card} onPress={handlePresentPress}>
        <View style={styles.userContainer}>
          <Image source={{uri : deveur.avatarUrl, cache:'force-cache'}} style={styles.avatar} />
          <Text style={styles.userName}>{deveur.nom}</Text>
        </View>
        
        <View style={styles.reminderContainer}>
          <Text style={styles.reminder}>doit rembourser à</Text>
          <Text style={styles.amount}>{montant.toFixed(2)} €</Text>
        </View>
        
        <View style={styles.userContainer}>
          <Image source={{uri : receveur.avatarUrl, cache:'force-cache'}} style={styles.avatar} />
          <Text style={styles.userName}>{receveur.nom}</Text>
        </View>
      </TouchableOpacity>
      <RemboursementBS onDismiss={handleDismissPress} ref={bottomSheetModalRef} deveur={deveur} receveur={receveur} montant={montant}/>
    
    </View>
    </Drawer>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    marginBottom: 12,
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    marginHorizontal: '5%',
    ...Shadows.shadow,
  },
  global: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16
  },
  drawer: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  userContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  reminderContainer: {
    alignItems: 'center',
  },
  reminder: {
    fontSize: 14,
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EquilibrageCard;
