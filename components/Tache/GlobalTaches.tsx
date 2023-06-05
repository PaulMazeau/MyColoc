import React from 'react'
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import TacheCard from './TacheCard'
import AddTacheBS from './AddTacheBS'
import { main } from '../../constants/Colors';
//props.task = list all task
export default function GlobalTaches(props) {
    
    const EmptyPage = () => {
        return (
          <View style={styles.emptyPageContainer}>
            <Image source={require('../../assets/images/Empty.png')} style={styles.emptyPageImage} />
            <Text style={styles.emptyPageText}>Oops, Il n'y encore aucune tâche à faire</Text>
          </View>
        );
    };
    
    const renderTask = () => {
        if(props.task.length == 0){return (<EmptyPage/>)}
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
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            >
                <Text style={styles.SousTitre}>Toutes les tâches</Text>
                {renderTask()}
            </ScrollView>
            <AddTacheBS />
           
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    emptyPageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      emptyPageImage: {
        width: 150,
        height: 150,
        marginBottom: 10,
      },
      emptyPageText: {
        fontSize: 16,
        color: main.TextColor,
        marginLeft: 5,
        fontWeight: '600',
        letterSpacing: -0.6,
      },
})
