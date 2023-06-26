import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from './entities'
import Physics from './physics'
import BackButton from "../../../components/Reusable/BackButton";
import { Animated } from 'react-native';
import Timer from "./perf-timer";
import { PanResponder } from 'react-native';

let force = {x:0,y:0}

const Basket = () => {

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

    useEffect(() => {
        if (running && gameEngine) {
            gameEngine.swap(entities(force));
        }
    }, [running, gameEngine]);
    
    
    const panResponder = useRef(
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onPanResponderGrant: () => {
            // This is where you could do something when the touch input starts
            console.log('start')
          },
          onPanResponderMove: (_, gesture) => {
            // Here, you can get the swipe direction and calculate the force to apply to the ball
            force = {x: gesture.dx, y: gesture.dy};
    
            // Now, you can use the force to influence the ball in your physics system
            // You could do this by dispatching an event to the GameEngine
            
            console.log(force)
          },
          onPanResponderRelease: () => {
            // This is where you could do something when the touch input ends
            setRunning(true);
            //gameEngine.dispatch({ type: 'swipe', force });

            console.log('release');
          },
        })
      ).current;
      
      


    return (
        <View style={styles.global} {...panResponder.panHandlers}>

            <View style={styles.topLign}>
                {!running?<BackButton/> : <View/>}
                <View style={styles.bestScore}>
                    <Text style={styles.text2}>Best</Text>
                    <Text style={styles.text2}>{bestScore}</Text>
                </View>
            </View>
            <Animated.Text style={[ styles.text, {transform: [{ scale: scale }],},]}> {!running ? 'Current Best' : ''} </Animated.Text>
            <Animated.Text style={[ styles.Points, {transform: [{ scale: scale }], color: !running? '#3489eb':'#bababa'},]}> {!running ? currentBestScore : currentScore} </Animated.Text>

           
            <GameEngine
            ref={(ref)=>{setGameEngine(ref)}}
            running={running}
            timer={new Timer()}
            systems={[Physics]}
            style={styles.gameEngine}
            entities={entities(force)}
            onEvent={(e) => {
                switch (e.type) {
                    case 'game-over' :
                        setRunning(false);
                        gameEngine.swap(entities(force));
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



            {/* {!running ?
                <TouchableOpacity style={styles.menu}
                    onPress={() => {
                        setRunning(true)
                    }}>
                   
                </TouchableOpacity>
                :
                <View/> 
            } */}
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
        fontWeight:'300',
        lineHeight:110
    },


    bestScore:{
        justifyContent:'center',
        alignItems:'flex-end'
    },
   
    text:{
        textAlign:'center',
        fontSize:30,
        marginTop:320,
        fontWeight:'300',
        color:'#bababa',
    },
    text2:{
        textAlign:'center',
        fontSize:16,
        fontWeight:'500',
    },


    menu:{
        flex:1,
        alignItems:'center',
        margin:130,
        marginTop:40,
        marginBottom:150


    }
});

export default Basket;
