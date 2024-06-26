import { StyleSheet, Text, View, ImageBackground, Image, Dimensions, ScrollView, TouchableOpacity, Button} from 'react-native';
import ClassementCardScrollable from '../../components/MiniJeu/ClassementCard';
import ClassementCardPodium from '../../components/MiniJeu/ClassementCardPodium'
import {MiniJeuColor} from '../../constants/Colors';
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carrousel from '../../components/MiniJeu/Carousel';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MiniJeuStackParams } from '../../components/Navigation/MiniJeuStack';
import { useNavigation } from '@react-navigation/native';

import BackButton from '../../components/Reusable/BackButton';
import { ColocContext, UserContext } from '../../UserContext';

const Space_Background=require('../../assets/images/Space_Background.png');
const Logo =require('../../assets/images/Logo_Minijeu.png');


type navigationProp = NativeStackNavigationProp<MiniJeuStackParams, 'Classement'>;


const windowWidth = Dimensions.get('window').width;



export default function MiniJeu() {
  const navigation = useNavigation<navigationProp>();
  const [user, setUser] = useContext(UserContext);
  const scoreFoot = user.footBestScore ? user.footBestScore : 0
  const scoreBasket = user.basketBestScore ? user.basketBestScore : 0
  const scoreGolf = user.golfBestScore ? user.golfBestScore : 0
  const userData = [{ScoreTotal: Number(scoreFoot)+Number(scoreBasket)+Number(scoreGolf), ScoreFoot:Number(scoreFoot), ScoreBasket:Number(scoreBasket), ScoreGolf:Number(scoreGolf)}]
  const gameCardData = [
    { title: "BasketBall", scoreUser: userData[0].ScoreBasket, backgroundImageSource: require('../../assets/images/BasketBall_Background.png'), colorGradient1: MiniJeuColor.VioletGradientColor1, colorGradient2: MiniJeuColor.VioletGradientColor2, screen:'Basket'},
    { title: "FootBall", scoreUser: userData[0].ScoreFoot, backgroundImageSource: require('../../assets/images/FootBall_Background.png'), colorGradient1: MiniJeuColor.RedGradientColor1, colorGradient2: MiniJeuColor.RedGradientColor2, screen:'Foot'},
    { title: "Incognito", backgroundImageSource: require('../../assets/images/Incognito_Background.png'), colorGradient1: MiniJeuColor.OrangeGradientColor1, colorGradient2: MiniJeuColor.OrangeGradientColor2, screen:'IncognitoSetUp'},
    { title: "Au plus proche", backgroundImageSource: require('../../assets/images/Au_Plus_Proche_Background.png'), colorGradient1: MiniJeuColor.BlueGRadientColor1, colorGradient2: MiniJeuColor.BlueGRadientColor2, screen:'AuPlusProcheWait'},
    { title: "Golf", scoreUser: userData[0].ScoreGolf, backgroundImageSource: require('../../assets/images/Golf_Background.png'), colorGradient1: MiniJeuColor.GreenGRadientColor1, colorGradient2: MiniJeuColor.GreenGRadientColor2, screen:'Golf'},
  ];

  const [coloc, setColoc] = useContext(ColocContext);
  const colocFormated = coloc.map((c)=> {if(c.footBestScore && c.basketBestScore){return c}else if(c.footBestScore && !c.basketBestScore){
    var rObj = c
    rObj.basketBestScore = 0
    return rObj
  }else if(!c.footBestScore && c.basketBestScore){
    var rObj = c
    rObj.footBestScore = 0
    return rObj
  }else{
    var rObj = c
    rObj.footBestScore = 0
    rObj.basketBestScore = 0
    return rObj
  }
})
colocFormated.sort((c1, c2) => 
  ((c2.footBestScore || 0) + (c2.basketBestScore || 0) + (c2.golfBestScore || 0)) - 
  ((c1.footBestScore || 0) + (c1.basketBestScore || 0) + (c1.golfBestScore || 0))
);
const scores = colocFormated.map((c, index)=>{
  var rObj = {}
  rObj['position'] = index + 1
  rObj['userImage'] = {uri: c.avatarUrl}
  rObj['name'] = c.nom
  rObj['score'] = (c.footBestScore || 0) + (c.basketBestScore || 0) + (c.golfBestScore || 0)
  return rObj
});
  return (
    <ImageBackground 
      source={Space_Background} 
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <SafeAreaView style={styles.global} edges={['top']} >
        <StatusBar style="light" />
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.topLign}>
          <TouchableOpacity style={styles.quitter} onPress={() => navigation.goBack()}>
              <BackButton color={"#5368F9"}/>
          </TouchableOpacity>
          <View style={styles.logo}>
            <Image source={Logo} />
          </View>
          </View>
          
          <Carrousel gameCardData={gameCardData}/>

          <View style={styles.containerTitle}>
            <Text style={styles.text}>Classement</Text>
            <TouchableOpacity  onPress={() => {navigation.navigate('Classement')}} style={styles.Button}>
              <Text style={styles.VoirTout}>Voir tout</Text>
            </TouchableOpacity>
          </View>

          <ClassementCardScrollable scores={scores} isScrollable={false} name={user.nomColoc}/>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  global: {
    flex: 1,
  },
  
  topLign:{
    flexDirection:'row',
    justifyContent : 'center',
    width:'100%'
  },

  imageBackground: {
    flex: 1,             
    width: '100%',       
  },

  text:{
    color : "white",
    fontWeight: '600',
    fontSize: 20,
    marginVertical: 12
  },

  container:{
    justifyContent: 'center',
    alignItems:'center',
    width:windowWidth,
    marginTop: -10,
  },

  logo:{
    margin:10,
    marginTop:15
  },

  quitter: {
    backgroundColor: '#222531',
    height: 30,
    paddingRight: 4,
    borderRadius: 30,
    width: 30,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:10,
    marginTop:25,
    position:'absolute',
    left:0
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'transparent',
  },

  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "90%", 
    marginHorizontal: "5%",
  },

  Button: {
    backgroundColor: '#5368F9',
    height: 'auto', 
    padding: 8,
    justifyContent: 'center', 
    alignItems: 'center',
    borderRadius: 100
  },

  VoirTout: {
    color: 'white',
    fontSize: 12,
  }
});
