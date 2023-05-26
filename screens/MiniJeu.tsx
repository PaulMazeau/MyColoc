import { StyleSheet, Text, View, ImageBackground, Image, Dimensions} from 'react-native';
import SalonCard from '../components/MiniJeu/SalonCard';
import ClassementCard from '../components/MiniJeu/ClassementCard';
import WaitingCard from '../components/MiniJeu/WaitingCard';
import CarouselGame from '../components/MiniJeu/CarouselGameCard';
import {MiniJeuColor} from '../constants/Colors';
import { StatusBar } from 'expo-status-bar';
import VoteCard from '../components/MiniJeu/VoteCard'
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';


const Space_Background=require('../assets/images/Space_Background.png');
const Logo =require('../assets/images/Logo_Minijeu.png');


const windowWidth = Dimensions.get('window').width;

const userData =[
  {ScoreTotal:1800, ScoreFoot:1500, ScoreBasket:1300}
]

const gameData = [
  { title: "BasketBall", scoreUser: userData[0].ScoreBasket, backgroundImageSource: require('../assets/images/BasketBall_Background.png'), colorGradient1: MiniJeuColor.VioletGradientColor1, colorGradient2: MiniJeuColor.VioletGradientColor2},
  { title: "FootBall", scoreUser: userData[0].ScoreFoot, backgroundImageSource: require('../assets/images/FootBall_Background.png'), colorGradient1: MiniJeuColor.RedGradientColor1, colorGradient2: MiniJeuColor.RedGradientColor2},
  { title: "Incognito", scoreUser: 1200, backgroundImageSource: require('../assets/images/Incognito_Background.png'), colorGradient1: MiniJeuColor.OrangeGradientColor1, colorGradient2: MiniJeuColor.OrangeGradientColor2},
  { title: "Au plus proche", scoreUser: 1200, backgroundImageSource: require('../assets/images/BasketBall_Background.png'), colorGradient1: MiniJeuColor.VioletGradientColor1, colorGradient2: MiniJeuColor.VioletGradientColor2},
];




export default function MiniJeu() {
  return (
    <ImageBackground 
      source={Space_Background} 
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <SafeAreaView style={styles.global} >
        <StatusBar style="light" />
        <View style={styles.container}>
          <View style={styles.logo}>
            <Image source={Logo} />
          </View>
          <CarouselGame gameData={gameData} />
          <Text style={styles.text}>Salons ouverts</Text>
          {/* <SalonCard /> */}
          <WaitingCard/>
          <Text style={styles.text}>Classement</Text>
          <ClassementCard/>
          {/* <VoteCard /> */}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  global: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  },

  imageBackground: {
    flex: 1,             
    width: '100%',       
    justifyContent: 'center',
    alignItems: 'center',
  },

  text:{
    color : "white",
    fontWeight: '600',
    fontSize: 20,
    marginLeft:40,
    marginBottom:10,
    width:windowWidth,
  },

  container:{
    justifyContent: 'center',
    alignItems:'center'
  },

  logo:{
    margin:10
  }
});
