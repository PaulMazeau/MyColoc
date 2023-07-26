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
        paddingBottom:15,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor:'red'
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
    },

    line:{
        flexDirection:'row',
        width:"70%"
    },

    image:{
        height:80, 
        width:100, 
        overflow:'hidden',
        top:-16,
        left:230,
        position:'absolute'
    }
});

export default Regles;
