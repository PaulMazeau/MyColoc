import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import TacheCard from './TacheCard'
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
        <View>
            <Text style={styles.SousTitre}>Toutes les tâches</Text>
            {renderTask()}
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
