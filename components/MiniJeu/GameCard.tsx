import React from "react";
import { View, Text, StyleSheet, ImageBackground, useWindowDimensions, Dimensions } from 'react-native';
import Button from "./Button";
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
      <ImageBackground source={backgroundImageSource} resizeMode="contain">
        
        <View style={styles.container}>
          <View style={styles.firstLign}>
            <Text style={styles.text}>{gameTitle}</Text>
            <Score score={scoreUser} color={"white"}/>
          </View>

          <View style={styles.secondLign}>
            <Button text={'Jouer'} colorBackGround={"white"} colorText={colorGradient1}/>
          </View>
        </View>

      </ImageBackground>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
    
  linearGradient: {
    borderRadius: 10,
    width: windowWidth * 0.75,
  },
  container: {
    width: '100%',
    height: '100%',
    padding: 15,
    justifyContent:'space-between'
  },
  firstLign:{
    flexDirection: 'row', 
    justifyContent: 'space-between',
    height:"15%"
  },
  secondLign:{
    height:"20%"
    
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
