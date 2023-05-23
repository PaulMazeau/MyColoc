import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { Shadows } from '../../constants/Shadow';

const MonSolde = () => {
  return (
    <View style={[styles.container, Shadows.shadow]}>
      <TouchableOpacity onPress={() => console.log('DepenseStack')}>
        <View style={styles.innerContainer}>
          <View style={styles.ImageContainer}>
            <Image source={require('../../assets/images/icon.png')} style={styles.Image}/>
          </View>
          <View>
            <Text style={styles.titre}>22 EUR</Text>
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
