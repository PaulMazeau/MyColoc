import { StyleSheet, Text, View, ImageBackground, Image, Dimensions, ScrollView} from 'react-native';
import ClassementCardScrollable from '../../components/MiniJeu/ClassementCardScrollable';
import ClassementCardPodium from '../../components/MiniJeu/ClassementCardPodium'
import {MiniJeuColor} from '../../constants/Colors';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Space_Background=require('../../assets/images/Space_Background.png');
const Logo =require('../../assets/images/Logo_Minijeu.png');


const windowWidth = Dimensions.get('window').width;

//Tableau de scores de la partie AuPlusProche en cours 
const scores = [
    { position: 1, userImage: require('../../assets/images/profilIcon2.png') },
    { position: 2, userImage: require('../../assets/images/profilIcon2.png') },
    { position: 3, userImage: require('../../assets/images/profilIcon2.png') },
    { position: 4, userImage: require('../../assets/images/profilIcon2.png') },
    { position: 5, userImage: require('../../assets/images/profilIcon2.png') },
    { position: 6, userImage: require('../../assets/images/profilIcon2.png') },
    { position: 7, userImage: require('../../assets/images/profilIcon2.png') },
    { position: 8, userImage: require('../../assets/images/profilIcon2.png') },
];

export default function MiniJeu() {
  return (
    <ImageBackground 
      source={Space_Background} 
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <SafeAreaView style={styles.global} edges={['top']} >
        <StatusBar style="light" />
        <View style={styles.global}>
            <View style={styles.logo}>
                <Image source={Logo} />
            </View>
            <Text style={styles.text}>Classement</Text>
            <View style={styles.Classement1}>
                <ClassementCardPodium scores={scores}/>
            </View>
            <View style={styles.Classement2}>
                <ClassementCardScrollable scores={scores} name={"National"} isScrollable={true}/>
            </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
    global: {
        flex:1,
        width:'100%',
        alignItems:'center'
    },

    imageBackground: {
        flex: 1,             
        width: '100%',       
        justifyContent: 'center',
        alignItems: 'center',
    },

    Classement1:{
        flex : 0.57,
        marginBottom:20
    },

    Classement2:{
        flex : 0.4
    },

  text:{
    color : "white",
    fontWeight: '600',
    fontSize: 24,
    marginLeft:40,
    marginBottom:10,
    marginTop:10,
    width:windowWidth,
  },

  container:{
    justifyContent: 'center',
    alignItems:'center',
    width:windowWidth,
  },

  logo:{
    margin:10
  }
});
