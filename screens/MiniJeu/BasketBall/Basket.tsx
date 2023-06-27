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

    const [menu, setMenu] = useState(true)
    const gameEngineRef = useRef(null);
    const [currentScore, setCurrentScore] = useState(0)
    const [currentBestScore, setCurrentBestScore] = useState(0)
    const [bestScore, setBestScore] = useState(0)
    const [scale] = useState(new Animated.Value(0.1));
    const [hoopPosition, setHoopPosition] = useState({x: 0, y: 0});

    useEffect(() => {
        scale.setValue(0.1);
        Animated.spring(scale, {
          toValue: 1,
          friction: 10,
          useNativeDriver: true,
        }).start();
    }, [currentScore, scale]);

    
    
    const panResponder = useRef(
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onPanResponderGrant: () => {
            force = {x: 0, y: 0};
            setMenu(false);
          },
          onPanResponderMove: (_, gesture) => {
            force = {x: gesture.dx, y: gesture.dy};
          },
          onPanResponderRelease: () => {
            if(gameEngineRef.current) {
              gameEngineRef.current.dispatch({ type: 'start', payload: force });
            }
          },
          
        })
      ).current;
      
      


    return (
        <View style={styles.global} >

            <View style={styles.topLign}>
                {menu?<BackButton/> : <View/>}
                <View style={styles.bestScore}>
                    <Text style={styles.text2}>Best</Text>
                    <Text style={styles.text2}>{bestScore}</Text>
                </View>
            </View>


            <View {...panResponder.panHandlers}>
            <Animated.Text style={[ styles.text, {transform: [{ scale: scale }],},]}> {menu ? 'Current Best' : ''} </Animated.Text>
            <Animated.Text style={[ styles.Points, {transform: [{ scale: scale }], color: menu? '#3489eb':'#bababa'},]}> {menu ? currentBestScore : currentScore} </Animated.Text>

           
            <GameEngine
            ref={gameEngineRef}
            timer={new Timer()}
            systems={[Physics]}
            style={styles.gameEngine}
            entities={entities(force)}
            onEvent={(e) => {
                switch (e.type) {
                    case 'game-over' :
                        setMenu(true);
                        gameEngineRef.current.swap(entities(force));
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
