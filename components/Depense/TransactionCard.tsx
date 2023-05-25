import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Shadows } from '../../constants/Shadow';
import RemboursementBS from './RemboursementBS';

const TransactionCard = () => {
  const test = false; // Variable pour savoir si c le g a rembourse ou pas 

  //Gestion de la BottomSheet pour l'affiche des informations d'une tâche
const bottomSheetModalRef = useRef(null);

const handlePresentPress = () => {
  bottomSheetModalRef.current?.present();
};

  const renderContent = () => {
    if (test) {
      return (
        <View style={styles.textContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.title}>Alexandre</Text>
            <View style={styles.payeeContainer}>
              <Text style={styles.subtitle}>a remboursé</Text>
            </View>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.title}>10€</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.textContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.title}>Prout</Text>
            <View style={styles.payeeContainer}>
              <Text style={styles.subtitle}>Payé par Paul</Text>
            </View>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.title}>20€</Text>
          </View>
        </View>
      );
    }
  };

  return (
    <TouchableOpacity style={{flex: 1}} onPress={handlePresentPress}>
    <View style={[styles.container, Shadows.shadow]}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/icon.png')} style={styles.image} />
      </View>
      {renderContent()}
    </View>
    <RemboursementBS ref={bottomSheetModalRef} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    marginBottom: 12,
  },
  imageContainer: {
    height: 40,
    width: 40,
    overflow: 'hidden',
    borderRadius: 7,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 10,
  },
  rightContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 10,
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 19,
  },
  subtitle: {
    fontSize: 14,
  },
  payeeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});

export default TransactionCard;
