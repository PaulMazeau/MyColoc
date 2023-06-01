import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { MiniJeuColor } from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import ScoreLigne from './ScoreLigne';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MiniJeuStackParams } from '../../App';
import { useNavigation } from '@react-navigation/native';


const windowWidth = Dimensions.get('window').width;

type navigationProp = NativeStackNavigationProp<MiniJeuStackParams, 'Classement'>;

const ScoreBoard = () => {
    //Tableau de scores des user
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

    //Générer une ligne de score suivi d'un separateur
    const renderScoreLines = (scores) => {
        return scores.map((score, index) => (
            <React.Fragment key={index}>
                <ScoreLigne position={score.position} userImage={score.userImage}/>
                {/* Permet de ne pas afficher de separator sur le dernier score */}
                {index !== scores.length - 1 && <View style={styles.separator}/>}   
            </React.Fragment>
        ));
    };

    const navigation = useNavigation<navigationProp>();

    return(
        <View style={styles.global}>
            <LinearGradient colors={[MiniJeuColor.VioletGradientColor1, MiniJeuColor.VioletGradientColor2]} style={styles.backgroundGradient}>
            <TouchableOpacity onPress={() => {navigation.navigate('Classement')}}>
                {renderScoreLines(scores)}
            </TouchableOpacity>
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
        color : MiniJeuColor.RedGradientColor1,
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
