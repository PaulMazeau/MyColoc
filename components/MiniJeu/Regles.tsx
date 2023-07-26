import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { main } from '../../constants/Colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Regles = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Règles du jeu :</Text>
            <Text style={styles.text}>Tous les joueurs obtiennent un mot identique, sauf un ! Démasquez l'Incognito en donnant chacun votre tour un indice sur votre mot, puis votez. L'Incognito gagne s'il survit et qu'il ne reste que 2 joueurs.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        width : windowWidth*0.9,
        height: windowHeight*0.2,
        padding: 10,
        alignItems: 'flex-start',
        flexDirection: 'column',
        backgroundColor:'#5368F9'
    },

    text: {
        textAlign:'justify',
        color: main.LightWhite,
        fontWeight: '600',
        fontSize: 15,
        width:'100%',
    },

    title: {
        color: main.LightWhite,
        fontWeight: '600',
        fontSize: 20,
        marginBottom: 12,
    },

    line:{
        flexDirection:'row',
        width:"70%"
    },
});

export default Regles;
