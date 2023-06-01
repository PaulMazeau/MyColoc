import React from "react";
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import { MiniJeuColor } from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import ScoreLigne from './ScoreLigne';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MiniJeuStackParams } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from "react-native-gesture-handler";
import UserBubble from "./UserBubble";


const windowWidth = Dimensions.get('window').width;

type navigationProp = NativeStackNavigationProp<MiniJeuStackParams, 'Classement'>;

interface Score {
  position: number;
  userImage: any; 
}

interface Props {
  scores: Score[];
}

const ScoreBoardPodium = ({ scores }: Props) => {
  //Générer une ligne de score suivi d'un separateur
  const renderScoreLines = (scores: Score[]) => {
    return scores.map((score, index) => (
      <React.Fragment key={index}>
        <ScoreLigne position={score.position} userImage={score.userImage}/>
        {/* Permet de ne pas afficher de séparateur sur le dernier score */}
        {index !== scores.length - 1 && <View style={styles.separator}/>}   
      </React.Fragment>
    ));
  };

  const navigation = useNavigation<navigationProp>();

  return(
    <View style={styles.global}>
      <LinearGradient colors={[MiniJeuColor.VioletGradientColor1, MiniJeuColor.VioletGradientColor2]} style={styles.backgroundGradient}>
        <ScrollView>
            <Text style={styles.text1}>Zacoloc</Text>
            <View style={styles.lign1}>
             <Text style={styles.text2}>Score total :</Text>
             <Text style={styles.text2}>450</Text>
            </View>
            
            <View style={styles.lign2}>
            <View style={styles.Row}>
                <View style={styles.ImageContainer}>
                    <Image source={scores[0].userImage} style={styles.Image}/>
                </View>
                <Text style={styles.name}>Julie</Text>
            </View>
            <View style={styles.Row}>
                <View style={[styles.ImageContainer, {height:80, width:80}]}>
                    <Image source={scores[0].userImage} style={styles.Image}/>
                </View>
                <Text>Julie</Text>
            </View>
            <UserBubble name="Julie" userImage={scores[0].userImage}/>
            </View>
          {renderScoreLines(scores)}
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  global:{
    flex:1
  },

  backgroundGradient:{
    borderRadius: 10,
    width : windowWidth*0.9,
    padding : 10,
  },

  Row:{
    flexDirection:'column', 
    alignItems:'center',
    justifyContent:'center',
    paddingBottom:5,
    marginHorizontal:20,
  },

  text1:{
    color : "white",
    fontWeight: '600',
    fontSize: 20,
  },

  text2:{
    color : "white",
    fontWeight: '600',
    fontSize: 16,
    marginRight:5
  },

  name:{
    alignItems:'center',
    marginHorizontal:0,
  },

  lign1:{
    justifyContent:'flex-start',
    flexDirection:'row'
  },

  lign2:{
    justifyContent:'center',
    alignItems:'baseline',
    flexDirection:'row',
    marginBottom:10
  },

  ImageContainer: {
    height: 40,
    width: 40,
    overflow: 'hidden',
    borderRadius: 50,
  },

  Image:{
    height:'100%',
    width:"100%"
  },

  separator: {
    height : 1,
    width : "100%",
    backgroundColor : "#EDF0FA",
    marginTop : 10,
    marginBottom : 10
  },
});

export default ScoreBoardPodium;
