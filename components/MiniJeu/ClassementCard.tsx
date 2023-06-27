import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
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
};

type ScoreBoardProps = {
  scores: ScoreType[];
  name?: string;
  isScrollable: boolean;
};

const ScoreBoardScrollable = ({ scores, name, isScrollable }: ScoreBoardProps) => {
    const renderScoreLines = (scores: ScoreType[]) => {
        return scores.map((score, index) => (
            <React.Fragment key={index}>
                <ScoreLigne position={score.position} userImage={score.userImage} name={score.name}/>
                {index !== scores.length - 1 && <View style={styles.separator}/>}   
            </React.Fragment>
        ));
    };

    const navigation = useNavigation<navigationProp>();

    const content = (
      <>
        {name && <Text style={styles.text}>{name}</Text>}
        {renderScoreLines(scores)}
      </>
    );

    return(
        <View style={styles.global}>
            <LinearGradient colors={[MiniJeuColor.VioletGradientColor1, MiniJeuColor.VioletGradientColor2]} style={styles.backgroundGradient}>
              {isScrollable ? <ScrollView showsVerticalScrollIndicator={false}>{content}</ScrollView> : content}
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

    ImageContainer: {
        height: 40,
        width: 40,
        overflow: 'hidden',
        borderRadius: 20,
        marginRight: 10,
    },

    separator: {
        height : 1,
        width : "100%",
        backgroundColor : "#EDF0FA",
        marginTop : 5,
      },

})

export default ScoreBoardScrollable;
