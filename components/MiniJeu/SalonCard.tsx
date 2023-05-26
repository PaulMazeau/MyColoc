import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { MiniJeuColor } from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';


const windowWidth = Dimensions.get('window').width;

const SalonCard = () => {

    //Liste des images des user
    const imageSources = [
        require('../../assets/images/profilIcon.png'),
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
        <View>
            <LinearGradient colors={[MiniJeuColor.RedGradientColor1, MiniJeuColor.RedGradientColor2]} style={styles.backgroundGradient}>
                <View style = {styles.firstLign}>
                    <Text style={styles.text1}>Salon de Julie</Text>

                    <View style = {{flexDirection:'row', justifyContent:'space-between'}}>
                        
                        <View style={styles.container}>
                            <Text style={styles.text2}>Au plus proche</Text>
                        </View>
                        <View style={styles.container}>
                            <Text style={styles.text2}>4/8</Text>
                        </View>

                    </View>
                </View>

                <View style = {styles.secondLign}>
                    {renderImages(imageSources)}
                </View>
                
            </LinearGradient>
        </View>

    );
};

const styles = StyleSheet.create({

    backgroundGradient:{
        borderRadius: 10,
        width : windowWidth*0.9,
        padding : 10,
    },

    container:{
        backgroundColor:'white',
        borderRadius : 10,
        padding : 8,
        marginLeft : 5
        
    },

    firstLign:{
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center',
        paddingBottom:15,
    },

    secondLign:{
        flexDirection:'row', 
        alignItems:'center',
        flexWrap: 'wrap',
        marginTop:5,
        marginLeft:5
    },

    text1:{
        color : "white",
        fontWeight: '600',
        fontSize: 20,
    },

    text2:{
        color : MiniJeuColor.RedGradientColor1,
        fontWeight: '600',
        fontSize: 16,
    },

    ImageContainer: {
        height: 40,
        width: 40,
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

export default SalonCard;