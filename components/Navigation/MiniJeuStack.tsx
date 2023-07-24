import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { FB_DB } from '../../firebaseconfig'
import Answer from '../../screens/MiniJeu/AuPlusProche/Answer'
import AuPlusProcheSalonWait from '../../screens/MiniJeu/AuPlusProche/AuPlusProcheSalonWait'
import AuPlusProcheWait from '../../screens/MiniJeu/AuPlusProche/AuPlusProcheWait'
import Guess from '../../screens/MiniJeu/AuPlusProche/Guess'
import Basket from '../../screens/MiniJeu/BasketBall/Basket'
import ClassementBasketBall from '../../screens/MiniJeu/BasketBall/ClassementBasketBall'
import Classement from '../../screens/MiniJeu/Classement'
import ClassementFootBall from '../../screens/MiniJeu/FootBall/ClassementFootBall'
import Foot from '../../screens/MiniJeu/FootBall/Foot'
import ClassementGolf from '../../screens/MiniJeu/Golf/ClassementGolf'
import Golf from '../../screens/MiniJeu/Golf/Golf'
import { GameStateProvider } from '../../screens/MiniJeu/Incognito/GameStateContext'
import IncognitoSetUp from '../../screens/MiniJeu/Incognito/IncognitoSetUp'
import Mot from '../../screens/MiniJeu/Incognito/Mot'
import PassPhone from '../../screens/MiniJeu/Incognito/PassPhone'
import RevealRole from '../../screens/MiniJeu/Incognito/RevealRole'
import Vote from '../../screens/MiniJeu/Incognito/Vote'
import MiniJeu from '../../screens/MiniJeu/MiniJeu'
import { AuPlusProcheContext, UserContext } from '../../UserContext'

export type MiniJeuStackParams = {
    BoutonMiniJeu: undefined,
    MiniJeu: undefined;
    AuPlusProcheWait: undefined;
    AuPlusProcheSalonWait : undefined;
    Vote: undefined;
    RevealRole:{
      selectedPlayer:any};
    Guess: undefined;
    Answer: undefined;
    IncognitoSetUp: { fromRevealRole?: boolean };
    PassPhone: {
      gameState:any[]};
    Foot: undefined;
    ClassementFootBall: undefined;
    Basket: undefined;
    ClassementBasketBall: undefined;
    Golf: undefined;
    ClassementGolf: undefined;
    Classement: undefined;
    Mot: {
      updatedGameState:any[]
      playerInfo:any};  
  };

export default function MiniJeuStackComponent() {
    const MiniJeuStack = createNativeStackNavigator<MiniJeuStackParams>();
    const [user, setUser] = useContext(UserContext)
    const [data, setData] = useState(null)
    const [snap, setSnap] = useState(null)
    useEffect(()=>{
      const subscriber = onSnapshot(doc(FB_DB, 'Colocs/'+user.colocID+'/Salon', 'salon'), (docSnap) => {if(docSnap.exists()){setSnap(docSnap) }else{setSnap(null);setData(null)}})
      return () => {subscriber()}
    }, [])
    useEffect(()=>{
      if(snap){
        if(snap.exists()){
            setData(snap.data())}
      }
    }, [snap])
    return (
      <AuPlusProcheContext.Provider value ={[data, setData]}>
      <GameStateProvider>
      <MiniJeuStack.Navigator initialRouteName="MiniJeu" screenOptions={{ headerShown: false }}>
        <MiniJeuStack.Screen name="MiniJeu" component={MiniJeu} />
        <MiniJeuStack.Screen name="Classement" component={Classement} />
        <MiniJeuStack.Screen name="AuPlusProcheWait" component={AuPlusProcheWait} />
        <MiniJeuStack.Screen name="Guess" component={Guess} />
        <MiniJeuStack.Screen name="Answer" component={Answer} />
        <MiniJeuStack.Screen name="IncognitoSetUp" component={IncognitoSetUp} />
        <MiniJeuStack.Screen name="PassPhone" component={PassPhone} />
        <MiniJeuStack.Screen name="Vote" component={Vote} />
        <MiniJeuStack.Screen name="Mot" component={Mot} />
        <MiniJeuStack.Screen name="RevealRole" component={RevealRole} />
        <MiniJeuStack.Screen name="Foot" component={Foot} />
        <MiniJeuStack.Screen name="ClassementFootBall" component={ClassementFootBall} />
        <MiniJeuStack.Screen name="Basket" component={Basket} />
        <MiniJeuStack.Screen name="ClassementBasketBall" component={ClassementBasketBall} />
        <MiniJeuStack.Screen name="Golf" component={Golf} />
        <MiniJeuStack.Screen name="ClassementGolf" component={ClassementGolf} />
        <MiniJeuStack.Screen name="AuPlusProcheSalonWait" component={AuPlusProcheSalonWait} />
      </MiniJeuStack.Navigator>
      </GameStateProvider>
      </AuPlusProcheContext.Provider>
    );
}
