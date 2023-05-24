import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Horloge from '../../assets/icons/Horloge.svg';
import { Shadows } from '../../constants/Shadow';

const TacheCard = () => {
  return (
    <View style={[styles.global, Shadows.shadow]}>
      <TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.top}>
            <Text style={styles.titre}>Ménage</Text>

            <View style={styles.dateContainer}>
              <Horloge width={17} height={17} />
              <Text style={styles.date}>Ven. 23</Text>
            </View>
          </View>

          <View style={styles.participants}>
            <Image style={styles.avatar1} source={require('../../assets/images/icon.png')} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  global: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 12,
  },

  container: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
  },

  top: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  titre: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 5,
  },

  dateContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  date: {
    fontSize: 14,
    marginLeft: 5,
  },

  avatar1: {
    width: 45,
    height: 45,
    borderRadius: 50,
    overflow: 'hidden',
    marginLeft: -17,
    zIndex: 1,
  },

  participants: {
    flexDirection: 'row',
  },
});

export default TacheCard;
