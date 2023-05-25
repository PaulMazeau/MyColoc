import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { main } from '../../constants/Colors'

export default function Solde() {
    return (
        <View style={styles.container}>
      <Text style={styles.textTop}>30 derniers jours</Text>
      <TouchableOpacity style={styles.button} onPress={() => console.log('prout')}>
        <Text style={styles.textInside}>330 euros</Text>
      </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 16,
        width: '60%'
      },
      textTop: {
        position: 'absolute', 
        top: -8,
        fontSize: 14,
        paddingHorizontal: 6,
        color: '#000',
        backgroundColor: main.BgColor,
        zIndex: 2
      },
      button: {
        height: 60, // Or whatever size you want
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 2,
      },
      textInside: {
        fontSize: 18,
        color: 'black',
      },
})
