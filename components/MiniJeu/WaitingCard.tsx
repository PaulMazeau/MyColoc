import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { main } from '../../constants/Colors';


const windowWidth = Dimensions.get('window').width;

const WaitingCard = () => {
    const imageSources = [
        require('../../assets/images/icon.png'),
        require('../../assets/images/icon.png'),
        require('../../assets/images/icon.png'),
        // add more images here
    ];

    const renderImages = (sources) => {
        return sources.map((source, index) => (
            <View key={index} style={styles.ImageContainer}>
                <Image source={source} />
            </View>
        ));
    };

    return(
        <View style={styles.global}>
            <View style={styles.container}>
                <View style = {styles.firstLign}>
                    <Text style={styles.text1}>En attente des joueurs</Text>

                    <View style={styles.container2}>
                        <Text style={styles.text2}>4/8</Text>
                    </View>

                </View>

                <View style = {styles.secondLign}>
                    {renderImages(imageSources)}
                </View>
                
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    global:{
        flex:0.37,
    },

    container:{
        borderRadius: 10,
        width : windowWidth*0.9,
        padding : 10,
        backgroundColor:'white'
    },


    container2:{
        backgroundColor:'#9E92F7',
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
        marginLeft:5
    },

    text1:{
        color : main.TextColor,
        fontWeight: '600',
        fontSize: 20,
    },

    text2:{
        color : main.TextColor,
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

})

export default WaitingCard;