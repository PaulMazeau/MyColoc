import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { MiniJeu } from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import ScoreLigne from './ScoreLigne';


const windowWidth = Dimensions.get('window').width;

const ScoreBoard = () => {


    return(
        <View>
            <LinearGradient colors={[MiniJeu.VioletGradientColor1, MiniJeu.VioletGradientColor2]} style={styles.global}>
                <ScoreLigne/>
                <View style={styles.separator}/>
                <ScoreLigne/>
                <View style={styles.separator}/>
                <ScoreLigne/>
            </LinearGradient>
        </View>

    );
};

const styles = StyleSheet.create({
    global:{
        borderRadius: 10,
        width : windowWidth*0.9,
        padding : 10,
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

    text1:{
        color : "white",
        fontWeight: '600',
        fontSize: 16,
    },

    text2:{
        color : MiniJeu.RedGradientColor1,
        fontWeight: '600',
        fontSize: 16,
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
        marginTop : 10,
        marginBottom : 10
      },

})

export default ScoreBoard;