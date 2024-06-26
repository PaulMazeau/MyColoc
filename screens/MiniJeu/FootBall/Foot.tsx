import React, { useEffect, useState, useRef, useContext } from "react";
import { View, Text, StyleSheet,TouchableOpacity, PanResponder } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from './entities'
import Physics from './physics'
import BackButton from "../../../components/Reusable/BackButton";
import { Animated } from 'react-native';
import Light from "./Components/Light";
import Timer from "./perf-timer"
import { ColocContext, UserContext } from "../../../UserContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FB_DB } from "../../../firebaseconfig";
import ScoreCard from "../../../components/MiniJeu/ScoreCard";
import {Shadows} from './../../../constants/Shadow'
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MiniJeuStackParams } from '../../../App';

type navigationProp = NativeStackNavigationProp<MiniJeuStackParams, 'ClassementFootBall'>;

const Foot = () => {
    const [user, setUser] = useContext(UserContext);
    const [running, setRunning] = useState(false)
    const [gameEngine, setGameEngine] = useState(null)
    const [currentScore, setCurrentScore] = useState(0)
    const [currentBestScore, setCurrentBestScore] = useState(0)
    const [bestScore, setBestScore] = useState(user.footBestScore ? user.footBestScore : 0)
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
    const getGolfPointsColoc = () => {
        var res = 0
        for(var i=0; i<coloc.length; i++){
            const golf = coloc[i].golfBestScore ? coloc[i].golfBestScore : 0
            res = res + golf
        }
        return res
    }

    const handleSetBestScore = async (score) => {
        const newPoints = score - bestScore;
        setBestScore(score)
        await updateDoc(doc(FB_DB, 'Users', user.uuid), {golfBestScore : score})
        const basketPointsColoc = getBasketPointsColoc()
        const footPointsColoc = getFootPointsColoc()
        const golfPointsColoc = getGolfPointsColoc()
        const res = await getDoc(doc(FB_DB, 'Classements', 'total'))
        const oldScores = res.data().results
        const index = oldScores.findIndex((elt) => elt.colocID == user.colocID)
        if(index ==-1){
            oldScores.push({colocID: user.colocID, basket: basketPointsColoc ,foot: footPointsColoc+newPoints,golf: golfPointsColoc+newPoints ,nom: user.nomColoc})
        }else{
            oldScores[index] = {colocID: user.colocID, basket: basketPointsColoc ,foot: footPointsColoc+newPoints,golf: golfPointsColoc+newPoints, nom: user.nomColoc}
        }
        await updateDoc(doc(FB_DB, 'Classements', 'total'), {results: oldScores})

    } 
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

      const navigation = useNavigation<navigationProp>();

    return (
        <View style={styles.global}>

            <View style={styles.topLign}>
                {!running?<BackButton/> : <View/>}
                <TouchableOpacity style={[styles.bestScore, Shadows.shadow]} onPress={() => navigation.navigate('ClassementFootBall')}>
                <ScoreCard score={bestScore} userImage={user.avatarUrl}/>
                </TouchableOpacity>
            </View>

            <View style={{flex:1}}{...panResponder.panHandlers}>
            {currentScore >= 10 && <Light speed={Math.min(2,(currentScore/40))} rightOrLeft={false}/>}
            {currentScore >= 20 && <Light speed={Math.min(2,(currentScore/40))} rightOrLeft={true}/>}

            <Animated.Text style={[ styles.text, {transform: [{ scale: scale }],},]}> {!running ? 'Score' : ''} </Animated.Text>
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
                                handleSetBestScore(currentScore)
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
        width:'38%',
        borderRadius:10
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