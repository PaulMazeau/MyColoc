import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { main } from '../../constants/Colors';

interface ScoreProps {
    text: string;
}

const windowWidth = Dimensions.get('window').width;

const Regles: React.FC<ScoreProps> = ({ text }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Règles du jeu :</Text>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        width : windowWidth*0.9,
        padding: 10,
        paddingBottom:15,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor:'#62C435'
    },

    text: {
        color: main.LightWhite,
        fontWeight: '600',
        fontSize: 15,
    },

    title: {
        color: main.LightWhite,
        fontWeight: '600',
        fontSize: 20,
    },
});

export default Regles;
