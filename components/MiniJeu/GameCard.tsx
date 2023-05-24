import React from "react";
import { View, Text, StyleSheet, ImageBackground, useWindowDimensions, Dimensions } from 'react-native';
import PlayButton from "./PlayButton";
import Score from './Score';
import { LinearGradient }  from 'expo-linear-gradient';

const windowWidth = Dimensions.get('window').width;

interface GameCardProps {
  gameTitle: string;
  backgroundImageSource: any;
  colorGradient1: string;
  colorGradient2: string;
  scoreUser:number;
}

const GameCard: React.FC<GameCardProps> = ({ gameTitle, backgroundImageSource, colorGradient1, colorGradient2, scoreUser }) => {
  return (
    <View>
      <LinearGradient colors={[colorGradient1, colorGradient2]} style={styles.linearGradient}>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.text}>{gameTitle}</Text>
            <Score score={scoreUser} />
          </View>
          <ImageBackground source={backgroundImageSource} resizeMode="contain">
            <View style={styles.imageBackgrond}>
              <PlayButton />
            </View>
          </ImageBackground>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
    
  linearGradient: {
    borderRadius: 10,
    width: windowWidth * 0.9,
  },
  container: {
    width: '100%',
    height: '100%',
    padding: 15
  },
  text: {
    color: "white",
    fontWeight: '600',
    fontSize: 22,
  },
  imageBackgrond: {
    height: '93%',
    justifyContent: 'flex-end',
  }
});

export default GameCard;
