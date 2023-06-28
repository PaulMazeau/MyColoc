import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet,TouchableOpacity, PanResponder } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from './entities'
import Physics from './physics'
import BackButton from "../../../components/Reusable/BackButton";
import { Animated } from 'react-native';
import Light from "./Components/Light";
import Timer from "./perf-timer"





const Foot = () => {
    const [running, setRunning] = useState(false)
    const [gameEngine, setGameEngine] = useState(null)
    const [currentScore, setCurrentScore] = useState(0)
    const [currentBestScore, setCurrentBestScore] = useState(0)
    const [bestScore, setBestScore] = useState(0)
    const [scale] = useState(new Animated.Value(0.1));

   
    useEffect(() =>{
        setRunning(false)
    }, [])

    useEffect(() => {
        scale.setValue(0.1);
        Animated.spring(scale, {
          toValue: 1,
          friction: 10,
          useNativeDriver: true,
        }).start();

    }, [currentScore, scale, running]);
      
    const panResponder = useRef(
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onPanResponderGrant: () => {
            
          },
          onPanResponderMove: (_, gesture) => {
            
          },
          onPanResponderRelease: () => {
            setRunning(true);
          },
        })
      ).current;


    return (
        <View style={styles.global}>

            <View style={styles.topLign}>
                {!running?<BackButton/> : <View/>}
                <View style={styles.bestScore}>
                    <Text style={styles.text2}>Best</Text>
                    <Text style={styles.text2}>{bestScore}</Text>
                </View>
            </View>

            <View style={{flex:1}}{...panResponder.panHandlers}>
            {currentScore >= 10 && <Light speed={Math.min(2,(currentScore/40))} rightOrLeft={false}/>}
            {currentScore >= 20 && <Light speed={Math.min(2,(currentScore/40))} rightOrLeft={true}/>}

            <Animated.Text style={[ styles.text, {transform: [{ scale: scale }],},]}> {!running ? 'Current Best' : ''} </Animated.Text>
            <Animated.Text style={[ styles.Points, {transform: [{ scale: scale }], color: !running? '#3489eb':'#bababa'},]}> {!running ? currentBestScore : currentScore} </Animated.Text>

           
            <GameEngine
            ref={(ref)=>{setGameEngine(ref)}}
            running={running}
            timer={new Timer()}
            systems={[Physics]}
            style={styles.gameEngine}
            entities={entities()}
            onEvent={(e) => {
                switch (e.type) {
                    case 'game-over' :
                        setRunning(false);
                        gameEngine.swap(entities());
                        if(currentScore>currentBestScore){
                            setCurrentBestScore(currentScore);
                            if(currentScore>bestScore){
                                setBestScore(currentScore)
                            }
                        }
                        setCurrentScore(0)
                    break;
                    case 'new-point' :
                        setCurrentScore(currentScore+1)
                    break;
                }
            }}
            />




            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    global: {
        flex:1
    },

    game:{
        backgroundColor:'green'
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
        marginTop:50,
        position:'absolute',
        zIndex:2
    },


    Points:{
        textAlign:'center',
        fontSize:100,
        color:'#3489eb',
        fontWeight:'300'
    },


    bestScore:{
        justifyContent:'center',
        alignItems:'flex-end',
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
        width:'50%',
        height:'50%',
        backgroundColor:'blue'

    }
});


export default Foot;