import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import GameCard from './GameCard';
import { FlatList } from 'react-native-gesture-handler';


interface CarouselProps {
  gameData: { title: string; scoreUser:number; backgroundImageSource: any; colorGradient1: string; colorGradient2: string }[];
}


const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Carousel: React.FC<CarouselProps> = ({ gameData }) => {
  const windowWidth = Dimensions.get('window').width;

  //Variables pour la pagination
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageChange = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / windowWidth);
    setCurrentPage(newIndex);
  };

  //Indicateur de pagination qui s'affiche sous le carousel
  const renderIndicator = () => {
    return (
      <View style={styles.indicatorContainer}>
        {gameData.map((_, index) => (
          <View
            key={index}
            style={[styles.indicator, index === currentPage && styles.indicatorActive]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.global}>
      <AnimatedFlatList
        data={gameData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        renderItem={({ item }) => (
          <View style={[styles.container, { width: windowWidth }]}>
            <GameCard gameTitle={item.title} scoreUser={item.scoreUser} backgroundImageSource={item.backgroundImageSource} colorGradient1={item.colorGradient1} colorGradient2={item.colorGradient2}/>
          </View>
        )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: new Animated.Value(0) } } }],
          { useNativeDriver: true, listener: handlePageChange }
        )}
        scrollEventThrottle={16}
      />
      {renderIndicator()}
    </View>
  );
};

const styles = StyleSheet.create({
  global: {
    flex: 0.8,
    justifyContent:'center',
    alignItems:'center',
  },

  container:{
    justifyContent:'center',
    alignItems:'center',
  },

  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'grey',
    marginHorizontal: 4,
  },
  indicatorActive: {
    backgroundColor: 'white',
  },

});

export default Carousel;
