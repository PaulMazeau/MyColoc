import React, { useEffect, useState, useRef, useContext } from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from './entities'
import Physics from './physics'
import BackButton from "../../../components/Reusable/BackButton";
import { Animated } from 'react-native';
import Timer from "./perf-timer";
import { PanResponder } from 'react-native';
import { ColocContext, UserContext } from "../../../UserContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FB_DB } from "../../../firebaseconfig";
import ScoreCard from './../../../components/MiniJeu/ScoreCard'
import {Shadows} from './../../../constants/Shadow'
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MiniJeuStackParams } from '../../../App';

let force = {x:0,y:0}
let canShoot = true;

type navigationProp = NativeStackNavigationProp<MiniJeuStackParams, 'ClassementBasketBall'>;

const Basket = () => {
    const [user, setUser] = useContext(UserContext)
    const [menu, setMenu] = useState(true)
    const gameEngineRef = useRef(null);
    const [currentScore, setCurrentScore] = useState(0)
    const [currentBestScore, setCurrentBestScore] = useState(0)
    const [bestScore, setBestScore] = useState(user.basketBestScore ? user.basketBestScore : 0)
    const [scale] = useState(new Animated.Value(0.1));
    const [coloc, setColoc] = useContext(ColocContext)

    const getBasketPointsColoc = () => {
        var res = 0
        for(var i=0; i<coloc.length; i++){
            const basket = coloc[i].basketBestScore ? coloc[i].basketBestScore : 0
            res = res + basket
        }
        return res
    }
    const getFootPointsColoc = () => {
        var res = 0
        for(var i=0; i<coloc.length; i++){
            const foot = coloc[i].footBestScore ? coloc[i].footBestScore : 0
            res = res + foot
        }
        return res
    }
    const handleSetBestScore = async (score) => { 
        const newPoints = score - bestScore;
        setBestScore(score)
        await updateDoc(doc(FB_DB, 'Users', user.uuid), {basketBestScore: score})
        const basketPointsColoc = getBasketPointsColoc()
        const footPointsColoc = getFootPointsColoc()
        const res = await getDoc(doc(FB_DB, 'Classements', 'total'))
        const oldScores = res.data().results
        const index = oldScores.findIndex((elt) => elt.colocID == user.colocID)
        if(index ==-1){
            oldScores.push({colocID: user.colocID, basket: basketPointsColoc + newPoints,foot: footPointsColoc ,nom: user.nomColoc})
        }else{
            oldScores[index] = {colocID: user.colocID, basket: basketPointsColoc + newPoints,foot: footPointsColoc, nom: user.nomColoc}
        }
        await updateDoc(doc(FB_DB, 'Classements', 'total'), {results: oldScores})
    } 

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
          onStartShouldSetPanResponder: () => canShoot,
          onPanResponderGrant: () => {
            force = {x: 0, y: 0};
            setMenu(false);
          },
          onPanResponderMove: (_, gesture) => {
            force = {x: gesture.dx, y: gesture.dy};
          },
          onPanResponderRelease: () => {
            if(gameEngineRef.current) {
                canShoot = false
                gameEngineRef.current.dispatch({ type: 'start', payload: force });
            }
          },
        })
      ).current;
      
      
      const navigation = useNavigation<navigationProp>();

    return (
        <View style={styles.global} >

            <View style={styles.topLign}>
                {menu?<BackButton/> : <View/>}
                <TouchableOpacity style={[styles.bestScore, Shadows.shadow]} onPress={() => navigation.navigate('ClassementBasketBall')}>
                <ScoreCard score={bestScore} userImage={user.avatarUrl}/>
                </TouchableOpacity>
            </View>


            <View {...panResponder.panHandlers} style={{flex:1}}>
            <Animated.Text style={[ styles.text, {transform: [{ scale: scale }],},]}> {menu ? 'Score' : ''} </Animated.Text>
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
                                handleSetBestScore(currentScore)
                            }
                        }
                        setCurrentScore(0)
                    break;
                    case 'new-point' :
                        setCurrentScore(currentScore+1)
                    break;
                    case 'new-shoot':
                        canShoot=true;
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
        alignItems:'center',
        width:'100%',
        height:'7%',
        paddingHorizontal:20,
        marginTop:50,
        zIndex:2
    },


    Points:{
        textAlign:'center',
        fontSize:100,
        color:'#3489eb',
        fontWeight:'300',
        lineHeight:110
    },


    bestScore:{
        width:'38%',
        borderRadius:10
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
