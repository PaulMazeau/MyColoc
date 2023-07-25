import React, { useContext, useEffect, useMemo, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { ColocContext } from '../../UserContext';
import { main } from '../../constants/Colors';

const screenWidth = Dimensions.get('window').width;
const barWidth = screenWidth * 0.40;

const GraphiqueEquilibrage = () => {
  const [coloc, setColoc] = useContext(ColocContext);
  const onlyZeros = (arr) => {
    for(var i=0; i<arr.length; ++i){
      if(arr[i].value !== 0){
        return false
      }
    }
    return true
  } 
  //formatage des soldes pr que ça rentre dans le graph
  const unsortedData = coloc.map((u) => {
    var rObj = {}
    rObj['name'] = u.nom
    if(Math.abs(u.solde)<= 0.009){
      rObj['value'] = 0
    }else{
      rObj['value'] = u.solde
    }
    return rObj;
  })
  //tri pr afficher par ordre croissant
  const data = unsortedData.sort((d1, d2) => (d1.value<d2.value) ? 1 : (d1.value>d2.value) ? -1 : 0);
  // Utilisation de useMemo pour le calcul de maxVal
  const maxVal = Math.max(...data.map((item) => Math.abs(item.value)))

  // Utilisation d'une seule valeur partagée pour l'animation
  const animation = useSharedValue(0);

  //réglage de l'animation
  useEffect(() => {
    animation.value = withTiming(barWidth, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
  }, []);

  //fonction pour afficher l'emptyGraphe
  const emptyGraph = () => {
    return(
      <View style={styles.emptyPageContainer}>
        <Image source={require('../../assets/images/EmptyDepense.png')} style={styles.emptyPageImage} />
        <Text style={styles.texte}>Oops, il n'y a encore aucune dépense</Text>
      </View>
  )
  };

  return (
    <View style={styles.container}>

      {onlyZeros(unsortedData) ? emptyGraph() : data.filter(item => item.value !== 0).map((item, index) => {
        const itemWidth = barWidth * (Math.abs(item.value) / maxVal);
        const animatedStyle = {
          width: 150 * (itemWidth / barWidth), //reglage la taille des bars par rapport aux valeurs
          backgroundColor: item.value >= 0 ? 'green' : 'red',
        };
  
        return (
          <View key={index} style={styles.barContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.baseLine}>
              <Animated.View
                style={[
                  styles.bar,
                  {
                    right: item.value < 0 ? '50%' : undefined,
                    left: item.value >= 0 ? '50%' : undefined,
                  },
                  animatedStyle,
                ]}
              />
              <Text style={[styles.value, item.value >= 0 ? styles.valueLeft : styles.valueRight]}>
                {item.value.toFixed(2)} €
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24
  },
  name: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "600"
  },
  barContainer: {
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 10,
  },
  baseLine: {
    flexDirection: 'row',
    height: 30,  // Augmenter la hauteur de la barre
    width: '100%',
  },
  bar: {
    height: 30,  // Augmenter la hauteur de la barre
    position: 'absolute',
    borderRadius: 4,
  },
  value: {
    color: 'black',
    fontSize: 12,  // Réduire la taille du texte pour qu'il soit adapté à la hauteur de la barre
    position: 'absolute',
    fontWeight: '700',
    alignSelf: 'center',
    marginHorizontal: 10
  },
  valueLeft: {
    right: '50%',
  },
  valueRight: {
    left: '50%',
  },
  emptyPageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyPageImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  texte: {
    fontSize: 16,
    color: main.TextColor,
    marginLeft: 5,
    fontWeight: '600',
    letterSpacing: -0.6,
  },
});

export default GraphiqueEquilibrage;
