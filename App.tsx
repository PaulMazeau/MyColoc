import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Import des écrans & component
import AuthStackComponent from './components/Navigation/AuthStack';
import NoColocStackComponent from './components/Navigation/NoColocStack';

// Import des icônes

//Import du contexte
import { UserContext} from "./UserContext";
import { onAuthStateChanged } from 'firebase/auth';
import { FB_AUTH, FB_DB } from './firebaseconfig';
import { doc, onSnapshot } from 'firebase/firestore';
import RootStackComponent from './components/Navigation/RootStack';


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
