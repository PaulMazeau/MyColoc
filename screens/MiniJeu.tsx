import { StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import SalonCard from '../components/MiniJeu/SalonCard';
import Classement from '../components/MiniJeu/ClassementCard';
import Carousel from '../components/MiniJeu/CarouselGameCard';
import {MiniJeuColor} from '../constants/Colors';


const Space_Background=require('../assets/images/Space_Background.png');
const Logo =require('../assets/images/Logo_Minijeu.png');

const userData =[
  {ScoreTotal:1800, ScoreFoot:1500, ScoreBasket:1300}
]

const gameData = [
  { title: "BasketBall", scoreUser: 1800, backgroundImageSource: require('../assets/images/BasketBall_Background.png'), colorGradient1: MiniJeuColor.VioletGradientColor1, colorGradient2: MiniJeuColor.VioletGradientColor2},
  { title: "FootBall", scoreUser: 1500, backgroundImageSource: require('../assets/images/FootBall_Background.png'), colorGradient1: MiniJeuColor.RedGradientColor1, colorGradient2: MiniJeuColor.RedGradientColor2},
  { title: "Incognito", scoreUser: 1200, backgroundImageSource: require('../assets/images/Incognito_Background.png'), colorGradient1: MiniJeuColor.OrangeGradientColor1, colorGradient2: MiniJeuColor.OrangeGradientColor2},
  { title: "Au plus proche", scoreUser: 1200, backgroundImageSource: require('../assets/images/BasketBall_Background.png'), colorGradient1: MiniJeuColor.VioletGradientColor1, colorGradient2: MiniJeuColor.VioletGradientColor2},
];




export default function MiniJeu() {
  return (

    <View style={styles.global}>
        <ImageBackground source ={Space_Background} resizeMode="cover">
          <View style = {styles.container}>
            <View style={styles.logo}>
              <Image source={Logo}/>
            </View>
            <Carousel gameData={gameData}/>
            <Text style={styles.text1}>Salons ouverts</Text>
            <SalonCard/>
            <Text style={styles.text1}>Classement</Text>
            <Classement/>
          </View>

        </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  global: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  },

  text1:{
    color : "white",
    fontWeight: '600',
    fontSize: 16,
  },

  container:{
    justifyContent: 'center',
    alignItems:'center'
  },

  logo:{
    margin:10
  }
});
