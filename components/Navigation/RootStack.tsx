import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { FB_DB } from '../../firebaseconfig';
import { ColocContext, UserContext } from '../../UserContext';
import { CourseStackParams } from './CourseStack';
import MainStackComponent from './MainStack';
import MiniJeuStackComponent from './MiniJeuStack';
import SettingsStackComponent, { SettingsStackParams } from './SettingsStack';

export type RootStackParams = {
    AuthStack: undefined;
    Accueil: undefined; 
    AccueilStack: undefined;
    CourseStack: NavigatorScreenParams<CourseStackParams>; 
    Tache: undefined; 
    Depense: undefined;
    DepenseStack: undefined;
    ListeDeCourse: {
      index: string;
    };
    MiniJeu: undefined;
    MiniJeuStack: undefined;
    BoutonMiniJeu: undefined,
    Main: undefined;
    AuPlusProcheWait: undefined;
    Guess: undefined;
    Answer: undefined;
    IncognitoSetUp: undefined;
    PassPhone: undefined;
    Foot: undefined;
    ClassementFootBall: undefined;
    Basket: undefined;
    ClassementBasketBall: undefined;
    Golf: undefined;
    ClassementGolf: undefined;
    Classement: undefined;
    ColocationSettings: undefined,
    FirstPage: undefined;
    SettingsStack: { screen: keyof SettingsStackParams },
  };
  

export default function RootStackComponent() {

    const RootStack = createNativeStackNavigator<RootStackParams>();
    const [coloc, setColoc] = useState([]);
    const [user, setUser] = useContext(UserContext);
    const [snap, setSnap] = useState(null);
    useEffect(()=>{
        const q = query(collection(FB_DB, 'Users'), where('uuid', 'in', user.membersID))
        const subscriber3 = onSnapshot(q, (QuerySnapshot) => {setSnap(QuerySnapshot)})
        return () => {subscriber3()}
    }, [])
    useEffect(()=>{
        if(snap){
        const colocSetter = []
        snap.forEach((doc) =>{
            colocSetter.push(doc.data())
        })
        setColoc(colocSetter)
        }else{
        setColoc([])
        }
    }, [snap])

    return (
    <ColocContext.Provider value={[coloc, setColoc]}>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Main" component={MainStackComponent} />
        <RootStack.Screen name="MiniJeuStack" component={MiniJeuStackComponent}/>
        <RootStack.Screen name="SettingsStack" component={SettingsStackComponent}/>
        </RootStack.Navigator>
    </ColocContext.Provider>
    )
}
