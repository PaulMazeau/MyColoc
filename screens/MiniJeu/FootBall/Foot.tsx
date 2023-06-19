import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from './entities'
import Physics from './physics'
import BackButton from "../../../components/Reusable/BackButton";






const Foot = () => {
    const [running, setRunning] = useState(false)
    const [gameEngine, setGameEngine] = useState(null)
    const [currentScore, setCurrentScore] = useState(0)
    const [currentBestScore, setCurrentBestScore] = useState(0)
    const [bestScore, setBestScore] = useState(0)
   
    useEffect(() =>{
        setRunning(false)
    }, [])


    return (
        <View style={styles.global}>


            <View style={styles.topLign}>
                <BackButton/>
                <View style={styles.bestScore}>
                    <Text style={styles.text2}>Best</Text>
                    <Text style={styles.text2}>80</Text>
                </View>
            </View>
            <Text style={styles.text}>{!running ? 'Current Best' : ''}</Text>
            <Text style={[styles.Points, {color: !running? '#3489eb' : '#bababa'}]}>{!running ? currentBestScore : currentScore}</Text>
           
            <GameEngine
            ref={(ref)=>{setGameEngine(ref)}}
            running={running}
            systems={[Physics]}
            style={styles.gameEngine}
            entities={entities()}
            onEvent={(e) => {
                switch (e.type) {
                    case 'game-over' :
                        setRunning(false);
                        gameEngine.swap(entities());
                        if(currentScore>currentBestScore){
                            setCurrentBestScore(currentScore)
                        }
                    break;
                    case 'new-point' :
                        setCurrentScore(currentScore+1)
                    break;
                }
            }}
            >


            </GameEngine>


            {!running ?
               
                <TouchableOpacity style={styles.menu}
                    onPress={() => {
                        setCurrentScore(0)
                        setRunning(true)
                    }}>
                   
                </TouchableOpacity>
                :
                <View/>
               
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


    topLign:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        paddingHorizontal:20,
        marginTop:40
    },


    Points:{
        textAlign:'center',
        fontSize:100,
        color:'#3489eb',
        fontWeight:'300'
    },


    bestScore:{
        justifyContent:'center',
        alignItems:'flex-end'
    },
   
    text:{
        textAlign:'center',
        fontSize:30,
        marginTop:200,
        fontWeight:'300',
        color:'#bababa'
    },
    text2:{
        textAlign:'center',
        fontSize:16,
        fontWeight:'500',
    },


    menu:{
        flex:1,
        alignItems:'center',
        marginTop:50,


    }
});


export default Foot;