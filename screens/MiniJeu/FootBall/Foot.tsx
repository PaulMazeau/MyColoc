import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from './entities'
import Physics from './physics'
import { color } from "react-native-reanimated";



const Foot = () => {
    const [running, setRunning] = useState(false)
    const [gameEngine, setGameEngine] = useState(null)
    const [currentPoint, setCurrentPoint] = useState(0)
    
    useEffect(() =>{
        setRunning(false)
    }, [])

    return (
        <View style={styles.global}>
            
            <GameEngine 
            ref={(ref)=>{setGameEngine(ref)}}
            running={running}
            systems={[Physics]}
            style={styles.gameEngine}
            entities={entities()}
            >

            </GameEngine>

            {!running ?
                
                <TouchableOpacity style={styles.menu}
                    onPress={() => {
                        setCurrentPoint(0)
                        setRunning(true)
                        gameEngine.swap(entities())
                    }}>
                    <Text style={styles.text}>Current Best</Text>
                    <Text style={[styles.Points]}>{currentPoint}</Text>
                </TouchableOpacity> 
                : 
                <Text style={[styles.Points, {color:"#bababa", marginTop:240}]}>{currentPoint}</Text>
            }
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
    },


    Points:{
        textAlign:'center',
        fontSize:100,
        color:'#3489eb',
        fontWeight:'300'
    },
    
    text:{
        textAlign:'center',
        fontSize:30,
        marginTop:100,
        fontWeight:'300',
        color:'#bababa'
    },

    menu:{
        flex:1,
        alignItems:'center',
        marginTop:100,

    }
});

export default Foot;
