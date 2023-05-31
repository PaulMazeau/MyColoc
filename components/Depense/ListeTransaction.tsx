import React, { useContext } from 'react';
import { StyleSheet, Text, View, FlatList, Animated } from 'react-native';
import TransactionCard from './TransactionCard';
import * as Crypto from 'expo-crypto';
import { DepenseContext } from '../../UserContext';
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
      if(transac.length == 0){return(<Text>Pas de transac</Text>)}
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

  return (
    <View style={styles.container}>
      <FlatList
        data={[1]}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={renderTransaction}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
