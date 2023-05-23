import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Suggestions from '../../assets/icons/Suggestions.svg'

const SelectionImg = require('../../assets/Images/Selection.png')

const Suggestion  = () => {
  return (
    <View style={styles.global}>
        <View style={styles.container}>
            <Text style={styles.text}>
                Découvrez une selection de recettes, {'\n'}sorties, jeux et restaurants à faire {'\n'}entre colocataires.
            </Text>

            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Bientôt disponible</Text>
                    <Suggestions/>
                </TouchableOpacity>
                <Image source={SelectionImg} style={styles.image}/>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  global: {
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  container: {
    elevation: 2,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    height: 142,
    justifyContent: 'space-between',
    marginLeft: 16,
    marginRight: 16
  },
  
  text: {
    fontSize: 14,
  },

  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent:'space-between'
  },

  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    marginRight: 10,
    color:'white',
  },

  button: {
    backgroundColor: '#B1C1FF',
    borderRadius: 5,
    height: 35,
    justifyContent: 'center',
    width: '55%'
  },

  image: {
    height: 60,
    width: 60,
    borderRadius: 7,
  },
});

export default Suggestion;
