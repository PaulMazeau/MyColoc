import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Horloge from '../../assets/icons/Horloge.svg';
import { Shadows } from '../../constants/Shadow';

const TacheCardAccueil = () => {
  return (
    <TouchableOpacity style={[styles.card, Shadows.shadow]} onPress={() => console.log('prout')}>
      <View style={styles.container}>
        <View>
          <Text style={styles.titre}>Ménage</Text>
          <View style={styles.dateContainer}>
            <Horloge width={17} height={17}/>
            <Text style={styles.date}>Ven. 26</Text>
          </View>
        </View>
        <Image style={styles.avatar} source={require('../../assets/icon.png')}/>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 70,
    justifyContent: 'center',
    padding: 15,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titre: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 14,
    marginLeft: 5,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },
});

export default TacheCardAccueil;
