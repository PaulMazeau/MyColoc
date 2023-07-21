import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { main } from '../../constants/Colors';

interface ScoreProps {
    text1: string;
    text2: string;
    image: any;
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Regles: React.FC<ScoreProps> = ({ text1, text2, image }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Règles du jeu :</Text>
            <Text style={styles.text}>{text1}</Text>
            <View style={styles.line}>
                <Text style={styles.text}>{text2}</Text>
                <Image source={image} style={styles.image}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 40,
        width : windowWidth*0.9,
        height: windowHeight*0.2,
        padding: 10,
        paddingBottom:15,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor:'#62C435'
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
        width:70, 
        overflow:'hidden',
        top:-16,
        left:240,
        position:'absolute'
    }
});

export default Regles;
