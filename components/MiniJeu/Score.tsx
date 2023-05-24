import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Trophy from '../../assets/icons/Trophy.svg';
import { main } from '../../constants/Colors';

interface ScoreProps {
    score: number;
    color: string;
}

const Score: React.FC<ScoreProps> = ({ score, color }) => {
    const dynamicStyles = StyleSheet.create({
        container: {
            backgroundColor: color,
            borderRadius: 10,
            width: '30%',
            padding: 2,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
    });

    return (
        <View style={[styles.container, dynamicStyles.container]}>
            <Trophy />
            <Text style={styles.text}>{score}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        width: '30%',
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    text: {
        color: main.TextColor,
        fontWeight: '600',
        fontSize: 15,
    },
});

export default Score;
