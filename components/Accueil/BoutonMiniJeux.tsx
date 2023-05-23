import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Shadows } from '../../constants/Shadow';

const ImgBg = require('../../assets/images/MiniJeu.png');


//props est le solde de l'utilisateur obtenu après connexion a la db
const BoutonMiniJeu = () => {
  return (
    <View style={[styles.global, Shadows.shadow]}>
      <ImageBackground 
        source={ImgBg} 
        resizeMode="cover" 
        imageStyle={{ borderRadius: 10 }}
      >
        <View style={styles.container}>
          <View>
            <Text style={styles.titre}> Mini jeu</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  global: {
    width: '41%',
    borderRadius: 10,
  },
  container: {
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
  },
  titre: {
    fontWeight: '600',
    fontSize: 22,
    color: 'white',
  },
  texte: {
    fontSize: 14,
    color: 'white',
    marginLeft: 5,
    letterSpacing: -0.6,
  },
});

export default BoutonMiniJeu;
