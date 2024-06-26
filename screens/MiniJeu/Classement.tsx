import { StyleSheet, Text, View, ImageBackground, Image, Dimensions, ScrollView, Touchable} from 'react-native';
import ClassementCardGap from '../../components/MiniJeu/ClassementCardGap';
import ClassementCardPodium from '../../components/MiniJeu/ClassementCardPodium';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BackIcon from '../../assets/icons/BackIcon'
import { ColocContext, UserContext } from '../../UserContext';
import { doc, getDoc } from 'firebase/firestore';
import { FB_DB } from '../../firebaseconfig';
import { ScoreType } from '../../components/MiniJeu/ClassementCardGap';

const Space_Background=require('../../assets/images/Space_Background.png');
const Logo =require('../../assets/images/Logo_Minijeu.png');


const windowWidth = Dimensions.get('window').width;

export default function MiniJeu() {
  const navigation = useNavigation();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [user, setUser] = useContext(UserContext)
  const [coloc, setColoc] = useContext(ColocContext);
  const [bestNational, setBestNational] = useState([])
  const [scoresColoc, setScoresColoc] = useState<ScoreType>({
    position: 0,
    name: "",
    score: 0,
  });
  const handleTabPress = (index: number) => {
    setSelectedTabIndex(index);
  };

  const colocFormated = coloc.map((c) => {
    // Créer une copie de l'objet coloc
    var rObj = { ...c };
    
    // Vérifier et remplir les scores manquants pour foot, basket et golf
    if (!rObj.footBestScore) {
      rObj.footBestScore = 0;
    }
  
    if (!rObj.basketBestScore) {
      rObj.basketBestScore = 0;
    }
  
    if (!rObj.golfBestScore) {
      rObj.golfBestScore = 0;
    }
  
    return rObj;
  });
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
  const totalScoreArray = colocFormated.map((c)=>c.footBestScore+c.basketBestScore+c.golfBestScore)
  const totalScore = totalScoreArray.reduce((a, b)=>a+b, 0)
  useEffect(()=>{
    const getClassement = async () => {
      const data  = await getDoc(doc(FB_DB, 'Classements', 'total'))
      var bestNationalSetter = data.data().results.map((r)=>{
        var rObj = {}
        rObj['name'] = r.nom
        rObj['score'] = (r.basket || 0) + (r.foot || 0) + (r.golf || 0)
        // Si le nom de la coloc actuelle correspond, on enregistre le score
        if(r.colocID === user.colocID){
          setScoresColoc({
            position: 0, // Cette valeur sera mise à jour plus tard
            name: r.nom,
            score: (r.basket || 0) + (r.foot || 0) + (r.golf || 0),
          });
          }
          return rObj
        })
        bestNationalSetter.sort((a, b)=> b.score - a.score)
        bestNationalSetter = bestNationalSetter.map((r, index)=>{
          var rObj = {}; 
          rObj['position'] = index+1; 
          rObj['name']=r.name; 
          rObj['score']=r.score; 

          // Si le nom de la coloc actuelle correspond, on met à jour la position
          if(r.name === user.nomColoc){
              setScoresColoc(currentScores => ({
                  ...currentScores,
                  position: index + 1,
              }));
          }

          return rObj
      })
      setBestNational(bestNationalSetter)
    }
    getClassement()
  }, [])
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
            <View style={styles.segmentedControl}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTabIndex === 0 && styles.activeTabButton,
          ]}
          onPress={() => handleTabPress(0)}
        >
          <Text
            style={[
              styles.tabButtonText,
              selectedTabIndex === 0 && styles.activeTabButtonText,
            ]}
          >
            Classement local
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTabIndex === 1 && styles.activeTabButton,
          ]}
          onPress={() => handleTabPress(1)}
        >
          <Text
            style={[
              styles.tabButtonText,
              selectedTabIndex === 1 && styles.activeTabButtonText,
            ]}
          >
            Classement national
          </Text>
        </TouchableOpacity>
      </View>
      {selectedTabIndex === 0 ? (
        <ClassementCardPodium scores={scores} name={user.nomColoc} isScrollable={true} scoreTotal={totalScore}/>

      ) : (
        <ClassementCardGap bestNational={bestNational} name={"Toutes les colocs"} scoreColoc={scoresColoc}/>

      )}
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

  logo:{
    margin:10
  },

  segmentedControl: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#222531',
    height:40,
  },

  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    margin: 4,
    paddingHorizontal: 28
  },

  activeTabButton: {
    backgroundColor: '#5368F9',
    borderRadius: 4,
  },
  tabButtonText: {
    color: '#8E8E93',
    fontWeight: 'bold',
    fontSize: 12,
  },
  activeTabButtonText: {
    color: 'white',
  },
});
