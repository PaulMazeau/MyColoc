import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet,TouchableOpacity, Image } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from './entities'
import Physics from './physics'
import BackButton from "../../../components/Reusable/BackButton";
import { Dimensions as RNDimensions } from 'react-native';



const Foot = () => {
    const [running, setRunning] = useState(false)
    const { height, width } = RNDimensions.get('window');
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
                {running ? <View/> : <BackButton/>}
                <View style={styles.bestScore}>
                    <Text style={styles.text2}>Best</Text>
                    <Text style={styles.text2}>{bestScore}</Text>
                </View>
            </View>

            {!running ?
                <View style={styles.menu}>
                    <Text style={styles.text}>Current Best</Text>
                    <Text style={[styles.Points]}>{currentBestScore}</Text>
                    <TouchableOpacity style={styles.menu}
                    onPress={() => {
                        setCurrentScore(0)
                        setRunning(true)
                    }}>
                    <Image
                        style={{
                            width: 60 * 2,
                            height: 60 * 2,
                            borderRadius: 60,
                            marginTop:200
                        }}
                        source={require('./../../../assets/images/FootBall.png')} 
                        />
                    </TouchableOpacity> 
                </View>
                
                : 
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
                        global.updateScore(0);
                        if(currentScore>currentBestScore){
                            setCurrentBestScore(currentScore)
                            if(currentScore>bestScore){
                                setBestScore(currentScore)
                            }
                        }
                    break;
                    case 'new-point' :
                        const newScore = currentScore+1;
                        setCurrentScore(newScore);
                        if (typeof global.updateScore === 'function') {
                            global.updateScore(newScore);
                        }
                    break;
                }
            }}
            />
  
            }
        </View>
    );
};

const styles = StyleSheet.create({
    global: {
        flex:1,
    },

    gameEngine:{
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0
    },

    topLign:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        alignItems:'center',
        paddingRight:20,
        paddingLeft:20,
        marginTop:50
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
        marginTop:100,
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
