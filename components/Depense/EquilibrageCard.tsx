import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useRef } from 'react';
import { Colors, Drawer } from 'react-native-ui-lib';
import RemboursementBS from './RemboursementBS';

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
  };


  return (
    <Drawer
      rightItems={[{text: 'Supprimer', background: Colors.red30, onPress: () => handleDelete()}]}      
      style={styles.drawer}
    >
      <TouchableOpacity style={styles.card} onPress={handlePresentPress}>
        <View style={styles.userContainer}>
          <Image source={{uri : deveur.avatarUrl, cache:'force-cache'}} style={styles.avatar} />
          <Text style={styles.userName}>{deveur.nom}</Text>
        </View>
        
        <View style={styles.reminderContainer}>
          <Text style={styles.reminder}>doit rembourser à</Text>
          <Text style={styles.amount}>{montant} €</Text>
        </View>
        
        <View style={styles.userContainer}>
          <Image source={{uri : receveur.avatarUrl, cache:'force-cache'}} style={styles.avatar} />
          <Text style={styles.userName}>{receveur.nom}</Text>
        </View>
      </TouchableOpacity>
      <RemboursementBS onDismiss={handleDismissPress} ref={bottomSheetModalRef}/>
    </Drawer>
  )
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: '5%',
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
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
