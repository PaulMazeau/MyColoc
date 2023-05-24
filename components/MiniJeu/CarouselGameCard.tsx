import React from "react";
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import GameCard from './GameCard';

interface CarouselProps {
  gameData: { title: string; backgroundImageSource: any }[];
}

const Carousel: React.FC<CarouselProps> = ({ gameData }) => {
  const windowWidth = Dimensions.get('window').width;

  return (
    <View style={styles.global}>
      <FlatList
        data={gameData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        renderItem={({ item }) => (
          <View style={[styles.container, { width: windowWidth }]}>
            <GameCard gameTitle={item.title} backgroundImageSource={item.backgroundImageSource} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  global: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  },

  container:{
    justifyContent:'center',
    alignItems:'center'
  }
});

export default Carousel;
