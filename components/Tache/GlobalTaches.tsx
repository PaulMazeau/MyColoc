import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import TacheCard from './TacheCard'
import AddTacheBS from '../Depense/AddTacheBS'
//props.task = list all task
export default function GlobalTaches(props) {
    const renderTask = () => {
        if(props.task.length == 0){return (<Text>nada</Text>)}
        else{
            return(
            props.task.map(t => {
                return(
                <TacheCard key={t.date} desc={t.desc}/>
                )
            })
        )}
    }
    return (
        <View style={styles.container}>
            <Text style={styles.SousTitre}>Toutes les tâches</Text>
            {renderTask()}
            <AddTacheBS />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    SousTitre: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        marginHorizontal: 16
    }
})
