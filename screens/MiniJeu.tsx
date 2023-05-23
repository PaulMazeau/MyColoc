import { StyleSheet, Text, View, Dimensions, ImageBackground} from 'react-native';
import GameCard from '../components/MiniJeu/GameCard';
import SalonCard from '../components/MiniJeu/SalonCard';
import ScoreBoard from '../components/MiniJeu/ScoreBoard1';


const Space_Background=require('../assets/images/Space_Background.png');


export default function MiniJeu() {
  return (

    <View style={styles.container}>
        <ImageBackground source ={Space_Background} resizeMode="cover">
          <View style = {styles.imageBackgrond}>
            <GameCard/>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  },

  text1:{
    color : "white",
    fontWeight: '600',
    fontSize: 16,
  },

  imageBackgrond:{
  }
});
