import React from "react";
import { View, StyleSheet, Dimensions, Image, Text } from 'react-native';
import { MiniJeuColor } from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import ScoreLigne from './ScoreLigne';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MiniJeuStackParams } from '../../components/Navigation/MiniJeuStack';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from "react-native-gesture-handler";

const windowWidth = Dimensions.get('window').width;

type navigationProp = NativeStackNavigationProp<MiniJeuStackParams, 'Classement'>;

export type ScoreType = {
  position: number;
  name: string;
  score:number;
};

type ScoreBoardProps = {
  bestNational: ScoreType[];
  name?: string;
  scoreColoc: ScoreType;
  imageCorner?: any;
};

const ScoreBoardScrollable = ({ bestNational, name, scoreColoc, imageCorner}: ScoreBoardProps) => {
    const renderScoreLines = (bestNational: ScoreType[]) => {
        return bestNational.map((score, index) => (
            <React.Fragment key={index}>
                <ScoreLigne position={score.position} userImage={require('./../../assets/images/house.png')} name={score.name} score={score.score}/>
                {index !== bestNational.length - 1 && <View style={styles.separator}/>}   
            </React.Fragment>
        ));
    };

    const content = (
      <View style={{alignItems:'center'}}>
        <View style={styles.lign}>
            <Text style={styles.text1}>{name}</Text>
            <Image source={imageCorner} style={styles.Image}/>
        </View>
        {renderScoreLines(bestNational)}
      </View>
    );

    return(
        <View style={styles.global}>
            <LinearGradient colors={[MiniJeuColor.VioletGradientColor1, MiniJeuColor.VioletGradientColor2]} style={styles.backgroundGradient}>
              <ScrollView showsVerticalScrollIndicator={false}>{content}</ScrollView>
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
        marginTop:20,
        color : "white",
        fontWeight: '600',
        fontSize: 20,
        flex:1
    },

    lign:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        width:'100%',
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

    containerWhite:{
        backgroundColor:'white',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        paddingBottom:5,
        marginBottom:10,
        width:'100%',
        paddingHorizontal:10
    },

    whiteDot:{
        height:5,
        backgroundColor:'#EDF0FA',
        width:5,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10
    }
    

})

export default ScoreBoardScrollable;
