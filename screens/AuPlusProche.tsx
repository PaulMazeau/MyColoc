import { StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import {MiniJeuColor} from '../constants/Colors';


const Space_Background=require('../assets/images/Space_Background.png');
const Logo =require('../assets/images/Logo_Minijeu.png');




export default function MiniJeu() {
  return (

    <View style={styles.global}>
        <ImageBackground source ={Space_Background} resizeMode="cover">
          <View style = {styles.container}>
            <View style={styles.logo}>
              <Image source={Logo}/>
            </View>
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
