import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const ImgBg = require('../Img/MiniJeu.png');

// Variables de style réutilisées
const SHADOW = {
  shadowColor: 'black',
  shadowOffset: { width: -2, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 2,
};

const BORDER_RADIUS = 10;

//props est le solde de l'utilisateur obtenu après connexion a la db
const MiniJeu = () => {
  return (
    <View style={styles.global}>
      <ImageBackground 
        source={ImgBg} 
        resizeMode="cover" 
        imageStyle={{ borderRadius: BORDER_RADIUS }}
      >
        <View style={styles.container}>
          <View>
            <Text style={styles.titre}> Mini jeu</Text>
            <Text style={styles.texte}>Bientôt disponible</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  global: {
    ...SHADOW,
    marginTop: 12,
    width: '42.5%',
    borderRadius: BORDER_RADIUS,
  },
  container: {
    padding: 10,
    borderRadius: BORDER_RADIUS,
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
  },
  titre: {
    fontWeight: '600',
    fontSize: 19,
    color: 'white',
  },
  texte: {
    fontSize: 14,
    color: 'white',
    marginLeft: 5,
    letterSpacing: -0.6,
  },
});

export default MiniJeu;
