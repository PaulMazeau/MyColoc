import { StyleSheet, Text, View, Dimensions, ImageBackground} from 'react-native';
import GameCard from '../components/MiniJeu/GameCard';
import SalonCard from '../components/MiniJeu/SalonCard';
import ScoreBoard from '../components/MiniJeu/ScoreBoard1';
import Carousel from '../components/MiniJeu/CarouselGameCard';


const Space_Background=require('../assets/images/Space_Background.png');


const gameData = [
  { title: "Jeu 1", backgroundImageSource: require('../assets/images/BasketBall_Background.png') },
  { title: "Jeu 2", backgroundImageSource: require('../assets/images/BasketBall_Background.png') },
  { title: "Jeu 3", backgroundImageSource: require('../assets/images/BasketBall_Background.png') },
];


export default function MiniJeu() {
  return (

    <View style={styles.global}>
        <ImageBackground source ={Space_Background} resizeMode="cover">
          <View style = {styles.container}>
            <Carousel gameData={gameData}/>
            <Text style={styles.text1}>Salons ouverts</Text>
            <SalonCard/>
            <Text style={styles.text1}>Classement</Text>
            <ScoreBoard/>
          </View>

        </ImageBackground>
        
        {/* <Text style={styles.text1}>Salons ouverts</Text>
        <SalonCard/>
        <Text style={styles.text1}>Classement</Text>
        <ScoreBoard/> */}
    
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
  }
});
