import React from 'react'
import { View, Image, StyleSheet, ImageBackground, Text, TouchableOpacity } from "react-native";
import { main } from '../../constants/Colors';
import Button from '../Reusable/ButtonColor';


const PlayersCard = () => {


    return (
      <View style={styles.global}>
        <View style={styles.lign}>
            <Text style={styles.text}>Qui joue ?</Text>
            <Button text='Commencer' colorBackGround='#62C435' colorText='white' onPress={() => {}} height={40}/>
        </View>
        


      </View>
    );

}

const styles = StyleSheet.create({
    global: {
        flex:1,
        backgroundColor:'white',
        borderRadius:10,
        padding:10
    },

    lign:{
        flexDirection:'row',
        justifyContent:'space-between'
    },

    text:{
        color: main.TextColor,
        fontWeight: '600',
        fontSize: 20,
    }
});

export default PlayersCard
