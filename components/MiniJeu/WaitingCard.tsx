import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { main } from '../../constants/Colors';


const windowWidth = Dimensions.get('window').width;

const WaitingCard = ({ userIsOwner, onPress }) => {


    

    //Liste des images des user
    const imageSources = [
        require('../../assets/images/profilIcon.png'),
        require('../../assets/images/profilIcon.png'),
        require('../../assets/images/profilIcon.png'),
        require('../../assets/images/profilIcon.png'),

        
    ];

    //Permet d'affichage des images cote a cote peut importe le nombre
    const renderImages = (sources) => {
        return sources.map((source, index) => (
            <View key={index} style={styles.ImageContainer}>
                <Image source={source} style={styles.Image}/>
            </View>
        ));
    };

    return(
        <View style={styles.global}>
            {!userIsOwner?
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <View style = {styles.firstLign}>
                    <Text style={styles.text1}>Salon de Julie</Text>
                </View>

                <View style = {styles.secondLign}>
                    {renderImages(imageSources)}
                </View>
            </TouchableOpacity>
            :
            <View style={styles.container}>
                <View style = {styles.firstLign}>
                    <Text style={styles.text1}>Salon de Julie</Text>
                        <TouchableOpacity onPress={onPress}>
                        <View style={styles.container2}>
                            <Text style={styles.text2}>Commencer</Text>
                        </View>
                        </TouchableOpacity>
                </View>

                <View style = {styles.secondLign}>
                    {renderImages(imageSources)}
                </View>
                
            </View>
            }
            
        </View>
    );
};

const styles = StyleSheet.create({

    global:{
    },

    container:{
        borderRadius: 10,
        width : windowWidth*0.9,
        padding : 10,
        backgroundColor:main.LightWhite
    },


    container2:{
        backgroundColor:'#62C435',
        borderRadius : 10,
        padding : 8,
        marginLeft : 5
        
    },

    firstLign:{
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center',
        paddingBottom:5,
        marginLeft:5
    },

    secondLign:{
        flexDirection:'row', 
        alignItems:'center',
        marginLeft:5,
        flexWrap: 'wrap',
        marginTop:5
    },

    text1:{
        color : main.TextColor,
        fontWeight: '600',
        fontSize: 20,
    },

    text2:{
        color : main.LightWhite,
        fontWeight: '600',
        fontSize: 16,
    },

    ImageContainer: {
        height: 50,
        width: 50,
        overflow: 'hidden',
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 10,
    },

    Image:{
        height:'100%', 
        width:'100%'
    }

})

export default WaitingCard;
