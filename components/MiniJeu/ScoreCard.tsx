import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { main } from '../../constants/Colors';

interface ScoreProps {
    score: number;
    userImage: any;
}

const ScoreCard: React.FC<ScoreProps> = ({ score, userImage }) => {
    

    return (
        <View style={styles.container}>
            <Image source={{ uri: userImage }} style={styles.Image}/>
            <View style={styles.bestScore}>
                    <Text style={styles.text2}>Meilleur score</Text>
                    <Text style={styles.text1}>{score}</Text>
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        backgroundColor:main.LightWhite,
        padding: 5,
        paddingHorizontal:15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    bestScore:{
        justifyContent:'center',
        alignItems:'flex-start',
        marginLeft:5,
    },
   
    
    text2:{
        textAlign:'center',
        fontSize:12,
        fontWeight:'400',
    },

    text1: {
        textAlign:'center',
        fontSize:18,
        fontWeight:'500',
    },

    Image: {
        height: '100%',
        width: '40%',
        borderRadius:10
      },
});

export default ScoreCard;
