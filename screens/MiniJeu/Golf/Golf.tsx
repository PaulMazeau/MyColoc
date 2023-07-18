    import React, { useEffect, useState, useRef, useContext } from "react";
    import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
    import { GameEngine } from "react-native-game-engine";
    import entities from './entities'
    import Physics from './physics'
    import BackButton from "../../../components/Reusable/BackButton";
    import { Animated } from 'react-native';
    import Timer from "./perf-timer";
    import { PanResponder } from 'react-native';
    import { UserContext } from "../../../UserContext";
    import { doc, updateDoc } from "firebase/firestore";
    import { FB_DB } from "../../../firebaseconfig";
    import ScoreCard from '../../../components/MiniJeu/ScoreCard'
    import {Shadows} from '../../../constants/Shadow'
    import { useNavigation } from "@react-navigation/native";
    import { NativeStackNavigationProp } from '@react-navigation/native-stack';
    import { MiniJeuStackParams } from '../../../App';
    import Svg, { Line } from 'react-native-svg';
    import { Dimensions } from 'react-native';

    
    let canShoot = true;

    type navigationProp = NativeStackNavigationProp<MiniJeuStackParams, 'ClassementGolf'>;

    const { height, width } = Dimensions.get('window'); 
    const screenDiagonal = Math.hypot(width , height);


    const Arrow = ({ force, visible }) => {
        if (!visible) {
            return null;
        }

        const forceInv = {x:-force.x/5, y:-force.y/5}
    
        // L'origine de la flèche est le point de départ de la balle
        const origin = { x: width * 0.5, y: height * 0.7 };
    
        // La longueur de la flèche est proportionnelle à la magnitude du vecteur de force
        const length = Math.sqrt(forceInv.x * forceInv.x + forceInv.y * forceInv.y);
    
        // L'angle de la flèche est déterminé par le vecteur de force
        const angle = Math.atan2(forceInv.y, forceInv.x);
    
        // Calcule les coordonnées de fin de la flèche
        const end = {
            x: origin.x + length * Math.cos(angle),
            y: origin.y + length * Math.sin(angle),
        };
    
        return (
            <Svg style={{ position: 'absolute', width: screenDiagonal, height: screenDiagonal }}>
                <Line
                    x1={origin.x}
                    y1={origin.y}
                    x2={end.x}
                    y2={end.y}
                    stroke="red"
                    strokeWidth="1"
                />
            </Svg>
        );
    };
    

    const Golf = () => {
        const [user, setUser] = useContext(UserContext)
        const [menu, setMenu] = useState(true)
        const gameEngineRef = useRef(null);
        const [currentScore, setCurrentScore] = useState(0)
        const [currentBestScore, setCurrentBestScore] = useState(0)
        const [bestScore, setBestScore] = useState(user.golfBestScore ? user.golfBestScore : 0)
        const [scale] = useState(new Animated.Value(0.1));
        const [arrowVisible, setArrowVisible] = useState(false);
        const [force, setForce] = useState({ x: 0, y: 0 });

        const handleSetBestScore = async (score) => {
            setBestScore(score)
            await updateDoc(doc(FB_DB, 'Users', user.uuid), {golfBestScore : score})
        } 

        useEffect(() => {
            scale.setValue(0.1);
            Animated.spring(scale, {
            toValue: 1,
            friction: 10,
            useNativeDriver: true,
            }).start();
        }, [currentScore, scale]);

        
        const maxForce = 20;
        const panResponder = useRef(
            PanResponder.create({
            onStartShouldSetPanResponder: () => canShoot,
            onPanResponderGrant: (_, gesture) => {
                setForce({ x: 0, y: 0 });
                setArrowVisible(true);
                setMenu(false);
            },
            onPanResponderMove: (_, gesture) => {
                let normalizedForce = {
                    x: gesture.dx ,
                    y: gesture.dy ,
                };
                setForce(normalizedForce);
            },
            onPanResponderRelease: (_, gesture) => {
                if(gameEngineRef.current) {
                    canShoot = false

                    let forceMagnitude = Math.sqrt(gesture.dx/10 * gesture.dx/10 + gesture.dy/10 * gesture.dy/10);
                    // Si la magnitude de la force est supérieure à maxForce, nous la limitons
                    if (forceMagnitude > maxForce) {
                    // Normalisation du vecteur de force
                    let normalizedForce = {
                        x: gesture.dx/10 / forceMagnitude,
                        y: gesture.dy/10 / forceMagnitude,
                    };

                    // Ajustement de la force à la force maximale tout en maintenant la direction
                    setForce({
                        x: normalizedForce.x * maxForce,
                        y: normalizedForce.y * maxForce,
                    }) 
                    gameEngineRef.current.dispatch({ type: 'start', payload: {x: normalizedForce.x * maxForce,y: normalizedForce.y * maxForce,} });
                    }
                    else{
                        gameEngineRef.current.dispatch({ type: 'start', payload: { x: gesture.dx/10, y: gesture.dy/10 } });
                    }
                }
                setArrowVisible(false);
            },
            })
        ).current;
        
        
        const navigation = useNavigation<navigationProp>();

        return (
            <View style={styles.global} >

                <View style={styles.topLign}>
                    {menu?<BackButton/> : <View/>}
                    <TouchableOpacity style={[styles.bestScore, Shadows.shadow]} onPress={() => navigation.navigate('ClassementGolf')}>
                    <ScoreCard score={bestScore} userImage={user.avatarUrl}/>
                    </TouchableOpacity>
                </View>


                <View {...panResponder.panHandlers} style={{flex:1}}>
                <Animated.Text style={[ styles.text, {transform: [{ scale: scale }],},]}> {menu ? 'Current Best' : ''} </Animated.Text>
                <Animated.Text style={[ styles.Points, {transform: [{ scale: scale }], color: menu? '#3489eb':'#bababa'},]}> {menu ? currentBestScore : currentScore} </Animated.Text>

                
                <Arrow force={force} visible={arrowVisible}/>

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
                            canShoot=true;
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
            marginTop:290,
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

    export default Golf;
