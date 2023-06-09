import React, { useContext } from 'react';
import { StyleSheet, Text, View, FlatList, Animated, Image } from 'react-native';
import TransactionCard from './TransactionCard';
import * as Crypto from 'expo-crypto';
import { DepenseContext } from '../../UserContext';
import AddDepenseBS from './AddDepenseBS';
import { main } from '../../constants/Colors';
//props.transacs est la liste de toutes les transactions
export default function ListeTransaction() {
  const animation = React.useRef(new Animated.Value(0)).current;
  const [transac, setTransac] = useContext(DepenseContext)
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

  const renderTransaction = React.useCallback(
    ({  }) => {
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
    }},
    [animation, translateY]
  );
  
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
      <AddDepenseBS />
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
