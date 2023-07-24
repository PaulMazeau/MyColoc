import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { RootStackParams } from '../../App';
import { Shadows } from '../../constants/Shadow';
import { Tile } from 'react-native-elements';

const ImgBg = require('../../assets/images/MiniJeu.png');
type navigationProp = NativeStackNavigationProp<RootStackParams, 'MiniJeuStack'>;

//props est le solde de l'utilisateur obtenu après connexion a la db
const BoutonMiniJeu = () => {
  const navigation = useNavigation<navigationProp>();
  return (
    <View style={[styles.global, Shadows.shadow]}>
      <TouchableOpacity onPress={() => {navigation.navigate('MiniJeuStack')}}>
      {/* <TouchableOpacity onPress={() => {Alert.alert('','Les minis jeux arrivent bientôt !')}}> */}
        <ImageBackground 
          source={ImgBg} 
          resizeMode="cover" 
          imageStyle={{ borderRadius: 10 }}
        >
          <View style={styles.container}>
              <Text style={styles.titre}> Mini jeu</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
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
