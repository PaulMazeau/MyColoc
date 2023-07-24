import React, {useState, useEffect, useContext} from 'react';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Dimensions, Keyboard, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Import des écrans & component
import TacheScreen from './screens/Tache';
import AccueilStackComponent from './components/Navigation/AccueilStack';
import CourseStackComponent, { CourseStackParams } from './components/Navigation/CourseStack';
import DepenseStackComponent from './components/Navigation/DepenseStack';
import SettingsStackComponent, { SettingsStackParams } from './components/Navigation/SettingsStack';
import AuthStackComponent from './components/Navigation/AuthStack';
import NoColocStackComponent from './components/Navigation/NoColocStack';
import MiniJeuStackComponent from './components/Navigation/MiniJeuStack';

// Import des icônes
import AccueilIcon from './assets/icons/AccueilIcon';
import TacheIcon from './assets/icons/TacheIcon';
import CourseIcon from './assets/icons/CourseIcon';
import DepenseIcon from './assets/icons/DepenseIcon';

//Import du contexte
import { UserContext, ColocContext} from "./UserContext";
import { onAuthStateChanged } from 'firebase/auth';
import { FB_AUTH, FB_DB } from './firebaseconfig';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import RootStackComponent, { RootStackParams } from './components/Navigation/RootStack';


// Fonction principale de l'application
export default function App() {

  const [userInfo, setUserInfo] = useState(null)
  const [uid, setUid] = useState(null)
  const [snapshot, setSnapshot] = useState(null);
    useEffect(()=>{
      const subscriber = onAuthStateChanged(FB_AUTH, (user) => user ? setUid(user.uid) : setUid(null))
      return subscriber
    }, [])

    useEffect(() => { //each time the uid updates, listen to the correct doc
      if(uid){
            const subscriber2 = onSnapshot(doc(FB_DB, 'Users', FB_AUTH.currentUser.uid), (QuerySnapshot) => {
              setSnapshot(QuerySnapshot)
            })
            return () => {subscriber2()}
          }else{
            setSnapshot(null)
          }
      }
    , [uid])

    useEffect(() =>{ //each time the doc updates, update the context
      if(snapshot){
        setUserInfo(snapshot.data())
      }else{
        setUserInfo(null)
      }
    }, [snapshot])

    //each time the user doc updates, update the context
    
  // Rendu du contenu en fonction de si l'utilisateur est connecté ou non
  const renderContent = () => {
    if (userInfo) { //Si l'user est connecté
      if (!(userInfo.colocID == "0")) { //Si l'user est  dans une colocation
        return <RootStackComponent />;
      }else {
        return <NoColocStackComponent/>;
      }
    }// l'user n'est pas connecté
    return <AuthStackComponent />;
  }
  

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <UserContext.Provider value={[userInfo, setUserInfo]}>
      <BottomSheetModalProvider>
        <NavigationContainer>
          {renderContent()}
        </NavigationContainer>
      </BottomSheetModalProvider>
    </UserContext.Provider>
    </GestureHandlerRootView>
  );
}
