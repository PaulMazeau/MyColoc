import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import TacheCard from './TacheCard'

export default function GlobalTaches() {
    return (
        <View>
            <Text style={styles.SousTitre}>Toutes les tâches</Text>
            <TacheCard/>
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
