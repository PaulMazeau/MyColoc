import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Animated, Image } from 'react-native';
import TransactionCard from './TransactionCard';
import * as Crypto from 'expo-crypto';
import { DepenseContext } from '../../UserContext';
import AddDepenseBS from './AddDepenseBS';
import { main } from '../../constants/Colors';
import ContentLoader, { Rect } from 'react-content-loader/native'
import { TouchableOpacity } from 'react-native-gesture-handler';

const MyLoader = () => (
    <View style={{marginHorizontal: 20}}>
    <ContentLoader 
    speed={1}
    width={'100%'}
    height={456}
    backgroundColor="white"
    foregroundColor="#DDD"
    >
    <Rect x="0" y="0" rx="5" ry="5" width="100%" height="50" /> 
    <Rect x="0" y="60" rx="5" ry="5" width="100%" height="50" /> 
    <Rect x="0" y="120" rx="5" ry="5" width="100%" height="50" /> 
    <Rect x="0" y="180" rx="5" ry="5" width="100%" height="50" /> 
    <Rect x="0" y="240" rx="5" ry="5" width="100%" height="50" /> 
    <Rect x="0" y="300" rx="5" ry="5" width="100%" height="50" /> 
    <Rect x="0" y="360" rx="5" ry="5" width="100%" height="50" /> 
    <Rect x="0" y="420" rx="5" ry="5" width="100%" height="50" /> 
    </ContentLoader>
    </View>
  )

//props.transacs est la liste de toutes les transactions
export default function ListeTransaction() {
  const [transac, setTransac] = useContext(DepenseContext)
  const [loading, setLoading] = useState(false);  // Ajoutez cet état
  const [transacToRender, setTransacToRender]  = useState([])   
  const [numberToRender, setNumberToRender] = useState(10)
  useEffect(()=>{
    setTransacToRender(transac.slice(0, numberToRender))
  }, [numberToRender])
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



  const renderTransaction = () => {
   
      if(transac){
      if(transacToRender.length == 0){return(emptyTransaction())}
      else{
      return (
        transacToRender.map((t, i) => {
          return(
            <>
          <TransactionCard transac={t.data()} key={t.id}/>
          {i==numberToRender-1 ? numberToRender == transac.length ? <></> : <TouchableOpacity style={styles.afficherPlus} onPress={()=>{setNumberToRender(transac.length)}}><Text style={styles.textAfficherPlus}>Afficher tout</Text></TouchableOpacity> : <></>}
          </>
          )
        })
      )};
    }}
   
  
  //Fonction d'affichage pour transacation Empty
  const emptyTransaction = () => {
    return( 
    <View style={styles.emptyPageContainer}>
      <Image source={require('../../assets/images/EmptyTransac.png')} style={styles.emptyPageImage} />
      <Text style={styles.texte}>Tu n'as aucune transaction</Text>
    </View>)
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={[1]}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={renderTransaction}
        ListFooterComponent={<View style={{ height: 90 }} />}
      />
      <AddDepenseBS onAddDepense={handleAddDepense}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlist: {
    marginBottom: 90, 
  },
  emptyPageContainer: {
    flex: 1,
    marginTop:100,
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
  afficherPlus: {
    width: '90%',
    marginHorizontal: '5%',
    borderRadius: 10,
    marginBottom: 12,
},
textAfficherPlus: {
  fontWeight: '600',
  fontSize: 19,
}
});
