import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from './entities'
import Physics from './physics'


const Foot = () => {
    const [running, setRunning] = useState(false)
    
    useEffect(() =>{
        setRunning(true)
    }, [])

    return (
        <View style={styles.global}>
            <GameEngine 
            running={running}
            systems={[Physics]}
            style={styles.gameEngine}
            entities={entities()}
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
