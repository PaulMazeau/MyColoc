import React, { useContext, useState } from 'react'
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native'
import GraphiqueEquilibrage from './GraphiqueEquilibrage';
import EquilibrageCard from './EquilibrageCard';
import AddDepenseBS from './AddDepenseBS';
import { ColocContext } from '../../UserContext';
import { main } from '../../constants/Colors';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'

const MyLoader = () => {
  return (
      <View style={{marginHorizontal: 20}}>
      <ContentLoader 
      speed={1}
      width={'100%'}
      height={456}
      backgroundColor="white"
      foregroundColor="#DDD"
      >
      <Rect x="0" y="0" rx="5" ry="5" width="100%" height="200" /> 
      <Rect x="0" y="216" rx="5" ry="5" width="100%" height="20" /> 
      <Rect x="0" y="252" rx="5" ry="5" width="100%" height="60" /> 
      <Rect x="0" y="324" rx="5" ry="5" width="100%" height="60" /> 
      <Rect x="0" y="396" rx="5" ry="5" width="100%" height="60" /> 
      </ContentLoader>
      </View>
  )
}

export default function Equilibrage() {
    const [coloc, setColoc] = useContext(ColocContext);
    const [loading, setLoading] = useState(false);  // Ajoutez cet état
      

     // Ajoutez cette fonction pour être appelée lorsque vous ajoutez une dépense
     const handleAddDepense = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    };

    if(loading){
        return(
          <View>
            {MyLoader()}
          </View>
        )
    }

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
            <GraphiqueEquilibrage/>
            <Text style={styles.subTitle}>Comment équilibrer ?</Text>
            {renderEquilibrage()}
            </View>
            </ScrollView>
            <AddDepenseBS onAddDepense={handleAddDepense}/>
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
