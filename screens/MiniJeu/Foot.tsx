import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GameEngine } from "react-native-game-engine";
import Entities from './Entities'


const Foot = () => {

    return (
        <View style={styles.global}>
            <GameEngine 
            style={styles.gameEngine}
            entities={Entities()}
            >

            </GameEngine>

        </View>
    );
};

const styles = StyleSheet.create({
    global: {
        flex:1
    },

    gameEngine:{
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
    }
});

export default Foot;
