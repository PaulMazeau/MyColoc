import React, { useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;
const barWidth = screenWidth * 0.40;

const GraphiqueEquilibrage = ({data}) => {
  const maxVal = Math.max(...data.map((item) => Math.abs(item.value)));

  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        const animation = useSharedValue(0);

        useEffect(() => {
          animation.value = withTiming(barWidth * (Math.abs(item.value) / maxVal), {
            duration: 2000,
            easing: Easing.bounce,
          });
        }, []);

        const animatedStyle = useAnimatedStyle(() => {
          return {
            width: animation.value,
            backgroundColor: item.value >= 0 ? 'green' : 'red',
          };
        });

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
                {item.value} €
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
});

export default GraphiqueEquilibrage;
