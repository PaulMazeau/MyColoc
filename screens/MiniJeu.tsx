import { StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import SalonCard from '../components/MiniJeu/SalonCard';
import ScoreBoard from '../components/MiniJeu/ScoreBoard1';
import Carousel from '../components/MiniJeu/CarouselGameCard';


const Space_Background=require('../assets/images/Space_Background.png');
const Logo =require('../assets/images/Logo_Minijeu.png');


const gameData = [
  { title: "BasketBall", backgroundImageSource: require('../assets/images/BasketBall_Background.png') },
  { title: "FootBall", backgroundImageSource: require('../assets/images/FootBall_Background.png') },
  { title: "Jeu 3", backgroundImageSource: require('../assets/images/BasketBall_Background.png') },
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
            <ScoreBoard/>
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
