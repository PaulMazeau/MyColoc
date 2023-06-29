import { StyleSheet, Text, View, ImageBackground, Image, Dimensions, ScrollView, Touchable} from 'react-native';
import ClassementCardScrollable from '../../components/MiniJeu/ClassementCard';
import ClassementCardPodium from '../../components/MiniJeu/ClassementCardPodium';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BackIcon from '../../assets/icons/BackIcon'
import { ColocContext, UserContext } from '../../UserContext';

const Space_Background=require('../../assets/images/Space_Background.png');
const Logo =require('../../assets/images/Logo_Minijeu.png');


const windowWidth = Dimensions.get('window').width;


// const scores = [
//     { position: 1, userImage: require('../../assets/images/profilIcon2.png'), name:'Julie', score:1800},
//     { position: 2, userImage: require('../../assets/images/profilIcon.png'), name:'Bruno', score:1800 },
//     { position: 3, userImage: require('../../assets/images/profilIcon2.png'), name:'Julie', score:1800 },
//     { position: 4, userImage: require('../../assets/images/profilIcon2.png'), name:'Julie', score:1800 },
//     { position: 5, userImage: require('../../assets/images/profilIcon2.png'), name:'Julie', score:1800 },
//     { position: 6, userImage: require('../../assets/images/profilIcon2.png'), name:'Julie', score:1800 },
//     { position: 7, userImage: require('../../assets/images/profilIcon2.png'), name:'Julie', score:1800 },
//     { position: 8, userImage: require('../../assets/images/profilIcon2.png'), name:'Julie', score:1800 },
// ];

const scoresNational = [
  { position: 1, userImage: require('../../assets/images/profilIcon2.png'), name:'Zacoloc', score:1800 },
  { position: 2, userImage: require('../../assets/images/profilIcon.png'), name:'trucloc', score:1800 },
  { position: 3, userImage: require('../../assets/images/profilIcon2.png'), name:'trucloc', score:1800 },
  { position: 4, userImage: require('../../assets/images/profilIcon2.png'), name:'trucloc', score:1800 },
  { position: 5, userImage: require('../../assets/images/profilIcon2.png'), name:'trucloc', score:1800 },
  { position: 6, userImage: require('../../assets/images/profilIcon2.png'), name:'trucloc', score:1800 },
  { position: 7, userImage: require('../../assets/images/profilIcon2.png'), name:'trucloc', score:1800 },
  { position: 8, userImage: require('../../assets/images/profilIcon2.png'), name:'trucloc', score:1800 },
];

export default function MiniJeu() {
    const navigation = useNavigation();
  const [user, setUser] = useContext(UserContext)
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
  colocFormated.sort((c1, c2)=> c2.footBestScore+c2.footBestScore - c1.footBestScore - c1.basketBestScore)
  const scores = colocFormated.map((c, index)=>{
    var rObj = {}
    rObj['position'] = index +1
    rObj['userImage'] = {uri: c.avatarUrl}
    rObj['name'] = c.nom
    rObj['score'] = c.footBestScore+c.basketBestScore
    return rObj
  }) 
  const totalScoreArray = colocFormated.map((c)=>c.footBestScore+c.basketBestScore)
  const totalScore = totalScoreArray.reduce((a, b)=>a+b, 0)
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
            <TouchableOpacity onPress={() => {navigation.goBack() }} style={styles.lign}>
                <BackIcon color="white" size={28}/>
                <Text style={styles.text}>Classement</Text>
            </TouchableOpacity>
            <View style={styles.Classement1}>
                <ClassementCardPodium scores={scores} name={user.nomColoc} isScrollable={true} scoreTotal={totalScore}/>
            </View>
            <View style={styles.Classement2}>
                <ClassementCardScrollable scores={scoresNational} name={"National"} isScrollable={true}/>
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

    lign:{
        flexDirection:'row',
        marginLeft:70,
        alignItems:'center',
        marginBottom:10
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
    marginBottom:10,
    marginTop:10,
    marginLeft:8,
    width:windowWidth,
    justifyContent:'center',
    alignItems:'center'
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
