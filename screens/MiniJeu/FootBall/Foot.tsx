// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, Dimensions } from 'react-native';
// import { GameEngine } from 'react-native-game-engine';
// import Matter from 'matter-js';
// import Physics from './physics';
// import Box from './Components/Box';
// import { createFootBall } from './Components/FootBall';
// import Touch from './Components/Touch';

// const Foot = () => {

//     const { height, width } = Dimensions.get('window');
//     const [gameLayout, setGameLayout] = useState(null);

//     let engine = Matter.Engine.create({ enableSleeping: false });
//     let world = engine.world;
//     let boxSize = Math.trunc(Math.max(width, height) * 0.075);

//     let initialBox = Matter.Bodies.rectangle(width / 2, height / 2, boxSize, boxSize);
//     let floor = Matter.Bodies.rectangle(width / 2, height - boxSize / 2, width, boxSize, { isStatic: true });
//     let box = Matter.Composite.create();

//     let footBall = createFootBall(world, 'yellow', { x: width / 2, y: height / 2 }, 50);

//     Matter.World.add(world, [initialBox, floor]);

//     let entities = {
//         physics: { engine: engine, world: world },
//         floor: { body: floor, color: 'green', renderer: Box },
//         footBall: footBall
//     };

//     return (
//         <View style={styles.global}>
//           <View 
//             onLayout={(event) => {
//               const { x, y, width, height } = event.nativeEvent.layout;
//               setGameLayout({ x, y, width, height });
//             }}
//             style={styles.gameContainer}
//           >
//             <GameEngine
//               systems={[Physics]} // Ajoute le système Touch
//               entities={entities}
//             >
//             </GameEngine>
//           </View>
//         </View>
//       );
// };

// const styles = StyleSheet.create({
//     global: {
//         flex: 1,
//     },
//     gameContainer: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         bottom: 0,
//         right: 0,
//     },
// });

// export default Foot;



import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
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
      
      


    return (
        <View style={styles.global}>

            
            {currentScore >= 10 && <Light speed={currentScore/2} leftOrRight={true}/>}
            {currentScore >= 15 && <Light speed={currentScore/2} leftOrRight={false}/>}
            {currentScore >= 20 && <Light speed={currentScore/2} leftOrRight={true}/>}
            {currentScore >= 30 && <Light speed={currentScore/2} leftOrRight={false}/>}

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



            {!running ?
                <TouchableOpacity style={styles.menu}
                    onPress={() => {
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
        margin:130,


    }
});


export default Foot;