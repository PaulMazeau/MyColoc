import React from "react";
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import { MiniJeuColor } from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import ScoreLigne from './ScoreLigne';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MiniJeuStackParams } from '../../components/Navigation/MiniJeuStack';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from "react-native-gesture-handler";
import UserBubble from "./UserBubble";
import Score from "./Score";


const windowWidth = Dimensions.get('window').width;

type navigationProp = NativeStackNavigationProp<MiniJeuStackParams, 'Classement'>;

type ScoreType = {
  position: number;
  userImage: any;
  name: string;
  score:number;
};

type ScoreBoardProps = {
  scores: ScoreType[];
  scoreTotal?: number;
  name?: string;
  isScrollable: boolean;
  imageCorner?: any;
};

const ScoreBoardPodium = ({ scores, name, isScrollable, scoreTotal, imageCorner }: ScoreBoardProps) => {

  //Générer une ligne de score suivi d'un separateur
  const renderScoreLines = (scores: ScoreType[]) => {

    return scores.map((score, index) => (
      <React.Fragment key={index}>
        <ScoreLigne position={score.position} userImage={score.userImage} name={score.name} score={score.score}/>
        {/* Permet de ne pas afficher de séparateur sur le dernier score */}
        {index !== scores.length - 1 && <View style={styles.separator}/>}   
      </React.Fragment>
    ));
  };

  const navigation = useNavigation<navigationProp>();

  const content = () => {
    return (
      <View style={{marginBottom:15}}>
        <View style={styles.lign}>
        <Text style={styles.text1}>{name}</Text>
        {
          scoreTotal==null?
          <View/>
          :
          <View style={styles.lign1}>
            <Score score={scoreTotal} color={'white'}/>
          </View>
        }
        </View>
        { scores.length >= 3 && (
          <View style={styles.lign2}>
            <UserBubble name={scores[1].name} userImage={scores[1].userImage} size={40}/>
            <UserBubble name={scores[0].name} userImage={scores[0].userImage} size={80}/>
            <UserBubble name={scores[2].name} userImage={scores[2].userImage} size={40}/>
          </View>
        )}

        {renderScoreLines(scores)}
      </View>
    );
  };

  return(
    <View style={styles.global}>
      <LinearGradient colors={[MiniJeuColor.VioletGradientColor1, MiniJeuColor.VioletGradientColor2]} style={styles.backgroundGradient}>
        {isScrollable ? <ScrollView showsVerticalScrollIndicator={false}>{content()}</ScrollView> : content()}
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
    paddingHorizontal : 10,
  },

  Row:{
    flexDirection:'column', 
    alignItems:'center',
    justifyContent:'center',
    paddingBottom:5,
    marginHorizontal:20,
  },

  text1:{
    marginTop:10,
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

  lign:{
    justifyContent:'space-between',
    alignItems:'flex-end',
    flexDirection:'row',
    marginBottom: 24,
  },

  lign1:{
    justifyContent:'flex-start',
    flexDirection:'row'
  },

  lign2:{
    justifyContent:'center',
    alignItems:'flex-end',
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
    height:55,
    width:55,
    marginTop:10
  },

  separator: {
    height : 1,
    width : "100%",
    backgroundColor : "#EDF0FA",
    marginTop : 5,
  },
});

export default ScoreBoardPodium;
