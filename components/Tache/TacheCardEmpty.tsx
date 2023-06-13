import React from 'react';
import { View, Text, StyleSheet, Image,  } from 'react-native';
import Horloge from '../../assets/icons/Horloge.svg';
import { Shadows } from '../../constants/Shadow';

// props.tache = tache
const TacheCardEmpty = ({ imageSource }) => {
  
    return (
      <View style={styles.body}>
          <View style={styles.global}>
          <View style={styles.container}>
            <View style={styles.top}>
              <Text style={styles.titre}>Tu n'as aucune tâche à venir</Text>
  
              <View style={styles.dateContainer}>
                <Horloge width={17} height={17} />
              </View>
            </View>
  
            <Image style={styles.avatar1} source={imageSource}/>
          </View>
      </View>
      </View>
    );
  };
const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 12,
    ...Shadows.shadow
  },

  global: {
    backgroundColor: 'white',
    borderRadius: 10,
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

  bottomSheet: {
    flex: 1, 
    backgroundColor: 'orange', 
    margin: 16, 
    borderRadius: 35, 
    marginBottom: 16 
 },
 bottomSheetText: {
   fontSize: 20,
   fontWeight: 'bold',
   color: 'white',
   textAlign: 'center',
   marginTop: 12
 },
 confirmer: {
  color: 'white',
  fontSize: 13,
  textAlign: 'center',
  padding: 5
},

ButtonConfirm: {
  backgroundColor: 'blue',
  width: 90,
  height: 34,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10,
  marginRight: 35
},

Button: {
  backgroundColor: 'blue',
  width: 52,
  height: 34,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10,
},
drawer: {
  borderRadius: 10
},
});

export default TacheCardEmpty;

