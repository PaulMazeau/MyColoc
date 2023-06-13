import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Animated, Image } from 'react-native';
import TransactionCard from './TransactionCard';
import * as Crypto from 'expo-crypto';
import { DepenseContext } from '../../UserContext';
import AddDepenseBS from './AddDepenseBS';
import { main } from '../../constants/Colors';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'

const MyLoader = () => (
    <View style={{marginHorizontal: 20}}>
    <ContentLoader 
    speed={5}
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

//props.transacs est la liste de toutes les transactions
export default function ListeTransaction() {
  const animation = React.useRef(new Animated.Value(0)).current;
  const [transac, setTransac] = useContext(DepenseContext)
  const [loading, setLoading] = useState(false);  // Ajoutez cet état
      

  // Ajoutez cette fonction pour être appelée lorsque vous ajoutez une dépense
  const handleAddDepense = () => {
     setLoading(true);
     setTimeout(() => {
         setLoading(false);
     }, 2000);
 };

 if(loading){
     return(
       <View>
         {MyLoader()}
       </View>
     )
 }

  const fadeIn = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    fadeIn();
  }, []);

  //useMemo -> éviter de tout recalculer la distance en Y à chaque rendu
  const translateY = React.useMemo(
    () =>
      animation.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0],
      }),
    [animation]
  );

  const renderTransaction = () => {
   
      if(transac){
      if(transac.length == 0){return(emptyTransaction())}
      else{
      return (
        transac.map((t) => {
          return(
            <Animated.View
          style={[
            { opacity: animation, transform: [{ translateY }] },
          ]}
          key={t.id}
        >
          <TransactionCard transac={t.data()} key={t.id}/>
        </Animated.View>
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
});
