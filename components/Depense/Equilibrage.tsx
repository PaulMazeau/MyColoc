import React from 'react'
import { StyleSheet, Text, ScrollView, View } from 'react-native'
import GraphiqueEquilibrage from './GraphiqueEquilibrage';
import EquilibrageCard from './EquilibrageCard';
import AddDepenseBS from './AddDepenseBS';


export default function Equilibrage() {
    return (
        <View style={styles.container}>
            <ScrollView
            showsVerticalScrollIndicator={false}
            >
            <GraphiqueEquilibrage/>
            <Text style={styles.subTitle}>Comment équilibrer ?</Text>
            <EquilibrageCard />
            <EquilibrageCard />
            <EquilibrageCard />
            <EquilibrageCard />
            </ScrollView>
            <AddDepenseBS />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 16,
        marginBottom: 12
    }
})
