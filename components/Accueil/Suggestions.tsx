import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Suggestions from '../../assets/icons/Suggestions.svg'
import { Shadows } from '../../constants/Shadow';

const SelectionImg = require('../../assets/images/Selection.png')

const Suggestion  = () => {
  return (
    <View style={[styles.container, Shadows.shadow]}>
        <Text style={styles.text}>
            Découvrez une selection de recettes, {'\n'}sorties, jeux et restaurants à faire {'\n'}entre colocataires.
        </Text>

        <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.bouton}>
                <Text style={styles.boutonText}>Bientôt disponible</Text>
                <Suggestions/>
            </TouchableOpacity>
            <Image source={SelectionImg} style={styles.image}/>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    height: 142,
    justifyContent: 'space-between',
    marginLeft: 16,
    marginRight: 16,
    padding: 15,
    marginBottom: 12,
  },

  text: {
    fontSize: 14,
  },

  bottomContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent:'space-between',
  },

  bouton: {
    backgroundColor: '#B1C1FF',
    borderRadius: 5,
    height: 35,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    width: '55%'
  },

  boutonText: {
    color:'white',
    fontSize: 14,
    fontWeight: '700',
    marginRight: 10,
  },

  image: {
    height: 60,
    width: 60,
    borderRadius: 7,
  },
});

export default Suggestion;
