import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Trophy from '../../assets/icons/Trophy.svg';
import { MiniJeuColor } from '../../constants/Colors';

const Score = ({ score }) => {
    return (
        <View style={styles.container}>
            <Trophy />
            <Text style={styles.text}>{score}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '30%',
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    text: {
        color: MiniJeuColor.TextColor1,
        fontWeight: '600',
        fontSize: 15,
    },
});

export default Score;
