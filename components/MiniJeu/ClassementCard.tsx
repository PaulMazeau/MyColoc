import React from "react";
import { View, StyleSheet, Dimensions, Image, Text } from 'react-native';
import { MiniJeuColor } from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import ScoreLigne from './ScoreLigne';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MiniJeuStackParams } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from "react-native-gesture-handler";

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
  name?: string;
  isScrollable: boolean;
  imageCorner?: any;
};

const ScoreBoardScrollable = ({ scores, name, isScrollable, imageCorner }: ScoreBoardProps) => {
    const renderScoreLines = (scores: ScoreType[]) => {
        return scores.map((score, index) => (
            <React.Fragment key={index}>
                <ScoreLigne position={score.position} userImage={score.userImage} name={score.name} score={score.score}/>
                {index !== scores.length - 1 && <View style={styles.separator}/>}   
            </React.Fragment>
        ));
    };

    const navigation = useNavigation<navigationProp>();

    const content = (
      <>
        <View style={styles.lign}>
        {name && <Text style={styles.text1}>{name}</Text>}
        <Image source={imageCorner} style={styles.Image}/>
        </View>
        
        {renderScoreLines(scores)}
      </>
    );

    return(
        <View style={styles.global}>
            <LinearGradient colors={[MiniJeuColor.VioletGradientColor1, MiniJeuColor.VioletGradientColor2]} style={styles.backgroundGradient}>
              {isScrollable ? <ScrollView showsVerticalScrollIndicator={false} >{content}</ScrollView> : content}
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

    firstRow:{
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center',
        paddingBottom:5,
    },

    secondRow:{
        flexDirection:'row', 
        alignItems:'center'
    },

    text:{
        marginTop:10,
        color : "white",
        fontWeight: '600',
        fontSize: 20,
        marginBottom:10
    },

    text1:{
        marginTop:10,
        color : "white",
        fontWeight: '600',
        fontSize: 20,
    },

    lign:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
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

})

export default ScoreBoardScrollable;
