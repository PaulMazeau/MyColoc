import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import GraphiqueEquilibrage from './GraphiqueEquilibrage';
import TransactionCard from './TransactionCard';


const data = [
    { name: 'Alice', value: 100 },
    { name: 'Bob', value: -50 },
    { name: 'Charlie', value: 200 },
    { name: 'Diana', value: -150 },
];

export default function Equilibrage() {
    return (
        <View>
            <GraphiqueEquilibrage data={data}/>
            <Text style={styles.subTitle}>Comment équilibrer ?</Text>
            {/* <TransactionCard /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    subTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 16,
        marginBottom: 12
    }
})
