import React from 'react';
import { StyleSheet, Text, View, FlatList, Animated } from 'react-native';
import TransactionCard from './TransactionCard';


export default function ListeTransaction() {
  const animation = React.useRef(new Animated.Value(0)).current;

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
      return (
        <Animated.View
          style={[
            { opacity: animation, transform: [{ translateY }] },
          ]}
        >
          <TransactionCard />
        </Animated.View>
      );
    },
    [animation, translateY]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
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
