import React, { useContext } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { Shadows } from '../../constants/Shadow';
import { UserContext } from '../../UserContext';

const MonSolde = ({onPress}) => {
  const [user, setUser] = useContext(UserContext)
  const renderNumber = (number) => {
    const fixed = number.toFixed(2)
    if (fixed == 0){
      return '0'
    }
    return fixed
  }
  return (
    <View style={[styles.container, Shadows.shadow]}>
      <TouchableOpacity onPress={() => {onPress()}}>
        <View style={styles.innerContainer}>
          <View style={styles.ImageContainer}>
          <Image source={user.avatarUrl ? {uri: user.avatarUrl, cache:'force-cache'} : require('../../assets/images/icon.png')} style={styles.Image}/>
          </View>
          <View>
            <Text style={styles.titre}>{renderNumber(user.solde)} €</Text>
            <Text style={styles.text}>Mon solde</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '55%',
    backgroundColor:'white',
    borderRadius:10
  },
  
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    height: 70,
  },

  ImageContainer: {
    height: 40,
    width: 40,
    overflow: 'hidden',
    borderRadius: 5,
    marginRight: 10,
  },

  Image: {
    height: '100%',
    width: '100%',
  },

  titre: {
    fontWeight: '600',
    fontSize: 19,
  },

  text: {
    fontSize: 14,
  },
});

export default MonSolde;
