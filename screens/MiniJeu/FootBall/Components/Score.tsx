import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';

const Score = () => {
    const [score, setScore] = useState(0);
  
    useEffect(() => {
      global.updateScore = setScore; // Fournir une fonction d'actualisation globale
    }, []);

    
    return (
        
        <Text style={styles.scoreText}>{score}</Text>
    );
};

const styles = StyleSheet.create({
    scoreText: {
        position: 'absolute',
        top: 230,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
        textAlign:'center',
        fontSize:100,
        color:'#babababa',
        fontWeight:'300'
    },
});

export default Score;
