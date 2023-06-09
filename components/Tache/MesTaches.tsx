import React from 'react'
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import TacheCard from './TacheCard';
import AddTacheBS from './AddTacheBS';
import { main } from '../../constants/Colors';
//props.task = all task concerné(sauf suivant) & props.nextTask = all task ou luser est suivant
export default function MesTaches(props) {

    const EmptyPage = () => {
        return (
          <View style={styles.emptyPageContainer}>
            <Image source={require('../../assets/images/EmptyPersonnalTask.png')} style={styles.emptyPageImage} />
            <Text style={styles.emptyPageText}>Oops, tu n'as encore aucune</Text>
            <Text style={styles.emptyPageText}>autre tâche te concernant</Text>
          </View>
        );
    };


    const renderNextTask = () => {
        if(props.nextTask.length == 0){return (<Text style={styles.dots}>. . .</Text>)}
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
    dots:{
        fontSize: 16,
        color: main.TextColor,
        marginLeft: 30,
        fontWeight: '600',
        letterSpacing: -0.6,
        marginBottom:16
    },
    emptyPageText: {
        fontSize: 16,
        color: main.TextColor,
        fontWeight: '600',
        letterSpacing: -0.6,
      },
      emptyPageContainer: {
        marginTop:20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      emptyPageImage: {
        width: 200,
        height: 100,
        marginBottom: 10,
        marginTop: 20,
        resizeMode: 'contain'
      },
})
