import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { Shadows } from '../../constants/Shadow'

const EquilibrageCard = () => {
  return (
    <TouchableOpacity style={{flex: 1}} onPress={() => console.log('test')}>
    <View style={[styles.container, Shadows.shadow]}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/icon.png')} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.title}>Alexandre</Text>
            <View style={styles.payeeContainer}>
              <Text style={styles.subtitle}>doit remboursé</Text>
            </View>
          </View>
          <View style={styles.middleContainer}>
            <Text style={styles.title}>10€</Text>
          </View>
          <View style={styles.rightContainer}>
            <View style={styles.imageContainer}>
                 <Image source={require('../../assets/images/icon.png')} style={styles.image} />
            </View>
          </View>
        </View>
    </View>
    </TouchableOpacity>
  )
}

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
      middleContainer: {
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
})

export default EquilibrageCard