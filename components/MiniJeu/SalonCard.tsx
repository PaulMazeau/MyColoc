import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { MiniJeuColor } from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';


const windowWidth = Dimensions.get('window').width;

const SalonCard = () => {


    return(
        <View style={styles.global}>
            <LinearGradient colors={[MiniJeuColor.RedGradientColor1, MiniJeuColor.RedGradientColor2]} style={styles.backgroundGradient}>
                <View style = {styles.firstRow}>
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

                <View style = {styles.secondRow}>
                    <View style={styles.ImageContainer}>
                        <Image source={require('../../assets/images/icon.png')} />
                    </View>
                    <View style={styles.ImageContainer}>
                        <Image source={require('../../assets/images/icon.png')} />
                    </View>
                </View>
                
            </LinearGradient>
        </View>

    );
};

const styles = StyleSheet.create({

    global:{
        flex:0.3,
    },

    backgroundGradient:{
        borderRadius: 10,
        width : windowWidth*0.9,
        padding : 10,
    },

    container:{
        backgroundColor:'white',
        borderRadius : 10,
        padding : 10,
        marginLeft : 5
        
    },

    firstRow:{
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center',
        paddingBottom:5,
    },

    secondRow:{
        flexDirection:'row', 
        alignItems:'center'
    },

    text1:{
        color : "white",
        fontWeight: '600',
        fontSize: 16,
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
      },

})

export default SalonCard;