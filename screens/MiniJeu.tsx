import { StyleSheet, Text, View, ImageBackground, Image, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import SalonCard from '../components/MiniJeu/SalonCard';
import ClassementCardScrollable from '../components/MiniJeu/ClassementCard';
import {MiniJeuColor} from '../constants/Colors';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carrousel from '../components/MiniJeu/Carousel';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MiniJeuStackParams } from '../App';
import { useNavigation } from '@react-navigation/native';

const Space_Background=require('../assets/images/Space_Background.png');
const Logo =require('../assets/images/Logo_Minijeu.png');


type navigationProp = NativeStackNavigationProp<MiniJeuStackParams, 'Classement'>;


const windowWidth = Dimensions.get('window').width;

//Tableau de scores de la Colloc
const scores = [
  { position: 1, userImage: require('../assets/images/profilIcon2.png') },
  { position: 2, userImage: require('../assets/images/profilIcon2.png') },
  { position: 3, userImage: require('../assets/images/profilIcon2.png') },
  { position: 4, userImage: require('../assets/images/profilIcon2.png') },
  { position: 5, userImage: require('../assets/images/profilIcon2.png') },
  { position: 6, userImage: require('../assets/images/profilIcon2.png') },
  { position: 7, userImage: require('../assets/images/profilIcon2.png') },
  { position: 8, userImage: require('../assets/images/profilIcon2.png') },
];

const userData =[
  {ScoreTotal:1800, ScoreFoot:1500, ScoreBasket:1300}
]

//Contient les informations necessaires a faire une gameCard dans le caroussel, incluant le nom du screen vers lequel naviguer
const gameCardData = [
  { title: "BasketBall", scoreUser: userData[0].ScoreBasket, backgroundImageSource: require('../assets/images/BasketBall_Background.png'), colorGradient1: MiniJeuColor.VioletGradientColor1, colorGradient2: MiniJeuColor.VioletGradientColor2, screen:'Basket'},
  { title: "FootBall", scoreUser: userData[0].ScoreFoot, backgroundImageSource: require('../assets/images/FootBall_Background.png'), colorGradient1: MiniJeuColor.RedGradientColor1, colorGradient2: MiniJeuColor.RedGradientColor2, screen:'Foot'},
  { title: "Incognito", scoreUser: 1200, backgroundImageSource: require('../assets/images/Incognito_Background.png'), colorGradient1: MiniJeuColor.OrangeGradientColor1, colorGradient2: MiniJeuColor.OrangeGradientColor2, screen:'IncognitoWait'},
  { title: "Au plus proche", scoreUser: 1200, backgroundImageSource: require('../assets/images/BasketBall_Background.png'), colorGradient1: MiniJeuColor.VioletGradientColor1, colorGradient2: MiniJeuColor.VioletGradientColor2, screen:'AuPlusProcheWait'},
];


export default function MiniJeu() {
  const navigation = useNavigation<navigationProp>();
  return (
    <ImageBackground 
      source={Space_Background} 
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <SafeAreaView style={styles.global} edges={['top']} >
        <StatusBar style="light" />
        <TouchableOpacity style={styles.quitter} onPress={() => navigation.goBack()}>
              <Text style={styles.TextQuitter}>Quitter</Text>
            </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.logo}>
            <Image source={Logo} />
          </View>
          <Carrousel gameCardData={gameCardData}/>
          <Text style={styles.text}>Salons ouverts</Text>
          <SalonCard />
          <Text style={styles.text}>Classement</Text>
          <View style={{flex:1}}>
            <TouchableOpacity onPress={() => {navigation.navigate('Classement')}}>
              <ClassementCardScrollable scores={scores} isScrollable={false}/>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  global: {
    flex: 1,
  },

  imageBackground: {
    flex: 1,             
    width: '100%',       
  },

  text:{
    color : "white",
    fontWeight: '600',
    fontSize: 20,
    marginLeft:40,
    width:windowWidth,
    marginVertical: 12
  },

  container:{
    justifyContent: 'center',
    alignItems:'center',
    width:windowWidth,
    marginTop: -10
  },

  logo:{
    margin:10,
  },

  quitter: {
    backgroundColor: 'white',
    height: 20,
    padding: 'auto',
    borderRadius: 4,
    width: 52,
  },
  
  TextQuitter: {
    fontWeight: '700',
    color: '#001355'
  }
});
