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



// Définition des types de paramètres pour chaque pile de navigation
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

// Création des piles de navigation
const RootStack = createNativeStackNavigator<RootStackParams>();
export const MainNavigation = createBottomTabNavigator<RootStackParams>();

const RootNavigator = () => {
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
      <RootStack.Screen name="Main" component={MainNavigationScreenStack} />
      <RootStack.Screen name="MiniJeuStack" component={MiniJeuStackComponent}/>
      <RootStack.Screen name="SettingsStack" component={SettingsStackComponent}/>
    </RootStack.Navigator>
    </ColocContext.Provider>
  );
}

const MainNavigationScreenStack = () => {
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const { height, width } = Dimensions.get('window');
  let padding = 30;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardStatus(true)
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardStatus(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  if(width <= 375) {
    padding = 0;
  } else if(width > 390 && width < 414) {
    padding = 30;
  } else if(width >= 414) {
    padding = 30;
  }

  return(
    <MainNavigation.Navigator
      initialRouteName="Accueil"
      screenOptions={{ 
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: (Platform.OS === 'android' && keyboardStatus) ? 0 : 30,
          left: 20,
          right: 20,
          borderRadius: 15,
          height: 51,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              padding: padding,
            },
            android: {
              elevation: 3,
              shadowColor: '#808080',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
            },
          }),
        },
        tabBarActiveTintColor: "#172ACE",
        tabBarInactiveTintColor: "grey",
        tabBarLabel: () => null,
        tabBarHideOnKeyboard: true
      }}
    >
      <MainNavigation.Screen name="AccueilStack" component={AccueilStackComponent} options={{tabBarIcon: ({color}) => <AccueilIcon color={color}/>}} />
      <MainNavigation.Screen name="CourseStack" component={CourseStackComponent} options={{tabBarIcon: ({color}) => <CourseIcon color={color} />}} />
      <MainNavigation.Screen name="Tache" component={TacheScreen} options={{tabBarIcon: ({color}) => <TacheIcon color={color} />}}/>
      <MainNavigation.Screen name="DepenseStack" component={DepenseStackComponent} options={{tabBarIcon: ({color}) => <DepenseIcon color={color} />}}/>
    </MainNavigation.Navigator>
  )
}

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
        return <RootNavigator />;
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
