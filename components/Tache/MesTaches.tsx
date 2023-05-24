import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import TacheCard from './TacheCard';

export default function MesTaches() {
    return (
        <View>
            <Text style={styles.SousTitre}>C'est ton tour!</Text>
            <TacheCard/>
            <Text style={styles.SousTitre}>Toutes tes tâches</Text>
            <TacheCard/>
            <TacheCard/>
        </View>
    )
}

const styles = StyleSheet.create({
    SousTitre: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        marginHorizontal: 16
    }
})
