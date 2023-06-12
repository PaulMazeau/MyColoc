import React, { useContext } from 'react'
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native'
import GraphiqueEquilibrage from './GraphiqueEquilibrage';
import EquilibrageCard from './EquilibrageCard';
import AddDepenseBS from './AddDepenseBS';
import { ColocContext } from '../../UserContext';
import { main } from '../../constants/Colors';


export default function Equilibrage() {
    const [coloc, setColoc] = useContext(ColocContext);

    //Fonction d'affichage pour l'equilibrage empty
    const emptyEquilibrage = () => {
        return (
        <View style={styles.emptyPageContainer}>
            <Image source={require('../../assets/images/EmptyTransac.png')} style={styles.emptyPageImage} />
            <Text style={styles.texte}>Il n'y a rien à équilibrer</Text>
        </View>
        );
    }

    const renderEquilibrage = () => {
        var toRender = []
        var colocCopy = [...coloc]
        colocCopy.sort((a, b) => b.solde - a.solde)
        while(colocCopy.length>=2){
            let doitLePlus = colocCopy.pop()
            let estDuLePlus = colocCopy[0]
            if(!((-0.1 < estDuLePlus.solde && estDuLePlus.solde < 0.1) || (-0.1 < doitLePlus.solde && doitLePlus.solde < 0.1))){
                toRender.push( <EquilibrageCard deveur={doitLePlus} receveur={estDuLePlus} montant={-doitLePlus.solde} key={doitLePlus.uuid}/>)
                colocCopy[0] = {colocID: estDuLePlus.colocID, nom: estDuLePlus.nom, nomColoc: estDuLePlus.nomColoc, solde: (estDuLePlus.solde + doitLePlus.solde), tache: estDuLePlus.tache, uuid: estDuLePlus.uuid, avatarUrl: estDuLePlus.avatarUrl}
                if(-0.1 < colocCopy[0].solde && colocCopy[0].solde < 0.1){
                    colocCopy = [...colocCopy.slice(1)]
                }
                colocCopy.sort((a, b) => b.solde - a.solde)
            }else{colocCopy.pop()}
        }
        if (toRender.length > 0) {
            return (
              toRender.map(d =>{
                return(
                  d
                )
              }
              )
            )
            
          }
        return (emptyEquilibrage())
    }
      
    return (
        <View style={styles.container}>
            <ScrollView
            showsVerticalScrollIndicator={false}
            >
            <View style={styles.scrollView}>
            {/* <GraphiqueEquilibrage/> */}
            <Text style={styles.subTitle}>Comment équilibrer ?</Text>
            {renderEquilibrage()}
            </View>
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
        width: 90,
        height: 90,
        marginBottom: 10,
      },
      texte: {
        fontSize: 16,
        color: main.TextColor,
        marginLeft: 5,
        fontWeight: '600',
        letterSpacing: -0.6,
      },
})
