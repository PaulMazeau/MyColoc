import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import TacheCard from './TacheCard';
import AddTacheBS from './AddTacheBS';
//props.task = all task concerné(sauf suivant) & props.nextTask = all task ou luser est suivant
export default function MesTaches(props) {
    const renderNextTask = () => {
        if(props.nextTask.length == 0){return (<Text>Pas de prochaine tache</Text>)}
        else{
            return(
            props.nextTask.map(t => {
                return(
                <TacheCard key={t.date} tache={t}/>
                )
            })
        )}
    }
    const renderMyTask = () => {
        if(props.task.length == 0){return (<Text>nada</Text>)}
        else{
            return(
            props.task.map(t => {
                return(
                <TacheCard key={t.date} tache={t}/>
                )
            })
        )}
    }
    return (
        <View style={styles.container}>
            <ScrollView
            showsVerticalScrollIndicator={false}
            >
            <View style={styles.scrollView}>
            <Text style={styles.SousTitre}>C'est ton tour!</Text>
            {renderNextTask()}
            <Text style={styles.SousTitre}>Toutes tes tâches</Text>
            {renderMyTask()}
            </View>
            </ScrollView>
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
    },
    scrollView: {
        marginBottom: 90, 
    },
})
