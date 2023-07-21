import React, {useState, useMemo, useEffect, useContext} from 'react';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

// Import des écrans
import AccueilScreen from './screens/Accueil';
import CourseScreen from './screens/Course';
import TacheScreen from './screens/Tache';
import DepenseScreen from './screens/Depense';
import ListeDeCourseScreen from './screens/ListeDeCourse';
import LoginScreen from './screens/LogIn';
import SignUpScreen from './screens/SignUp';
import MiniJeu from './screens/MiniJeu/MiniJeu';

// Import des icônes
import AccueilIcon from './assets/icons/AccueilIcon';
import TacheIcon from './assets/icons/TacheIcon';
import CourseIcon from './assets/icons/CourseIcon';
import DepenseIcon from './assets/icons/DepenseIcon';

// Import du style de la barre de navigation
import { NavBarStyle } from './constants/NavBar';
import BoutonMiniJeu from './components/Accueil/BoutonMiniJeux';

//Import du contexte
import { UserContext, CourseContext, DepenseContext, ColocContext, AuPlusProcheContext} from "./UserContext";
import { User, onAuthStateChanged } from 'firebase/auth';
import { FB_AUTH, FB_DB } from './firebaseconfig';
import { QuerySnapshot, collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import NoColoc from './screens/NoColoc';
import AuPlusProcheWait from './screens/MiniJeu/AuPlusProche/AuPlusProcheWait';
import AuPlusProcheSalonWait from './screens/MiniJeu/AuPlusProche/AuPlusProcheSalonWait';
import Basket from './screens/MiniJeu/BasketBall/Basket';
import Golf from './screens/MiniJeu/Golf/Golf';
import ClassementGolf from './screens/MiniJeu/Golf/ClassementGolf';
import ClassementBasketBall from './screens/MiniJeu/BasketBall/ClassementBasketBall';
import ClassementFootBall from './screens/MiniJeu/FootBall/ClassementFootBall';
import Foot from './screens/MiniJeu/FootBall/Foot';
import Guess from './screens/MiniJeu/AuPlusProche/Guess';
import IncognitoSetUp from './screens/MiniJeu/Incognito/IncognitoSetUp';
import Mot from './screens/MiniJeu/Incognito/Mot';
import RevealRole from './screens/MiniJeu/Incognito/RevealRole';
import PassPhone from './screens/MiniJeu/Incognito/PassPhone';
import Vote from './screens/MiniJeu/Incognito/Vote';
import { GameStateProvider } from "./screens/MiniJeu/Incognito/GameStateContext";
import Answer from './screens/MiniJeu/AuPlusProche/Answer';
import Classement from './screens/MiniJeu/Classement';
import ColocationSettingsScreen from './screens/ColocationSettings';
import AvatarSettings from './screens/AvatarSettings';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FirstPage from './screens/FirstPage';
import GetNotificationPermission from './GetNotificationPermission'
import { Dimensions, Keyboard, Platform } from 'react-native';

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


export type CourseStackParams = {
  Course: undefined;
  ListeDeCourse: {
    index: any;
  };
};

export type AuthStackParams = {
  Login: undefined;
  SignUp: undefined;
  NoColoc: undefined;
  FirstPage: undefined;
  AvatarSettings: undefined;
};

export type AccueilStackParams = {
  Accueil: undefined;
  MiniJeu: undefined;
  BoutonMiniJeu: undefined;
};

export type NoColocStackParams = {
  NoColoc: undefined,
};

export type DepenseStackParams = {
  Depense: undefined,
};

export type SettingsStackParams = {
  ColocationSettings: undefined,
  AvatarSettings: undefined,
};



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

// Création des piles de navigation
const RootStack = createNativeStackNavigator<RootStackParams>();
export const MainNavigation = createBottomTabNavigator<RootStackParams>();
const CourseStack = createNativeStackNavigator<CourseStackParams>(); 
const AuthStack = createNativeStackNavigator<AuthStackParams>();
const AccueilStack = createNativeStackNavigator<AccueilStackParams>();
const NoColocStack = createNativeStackNavigator<NoColocStackParams>();
const MiniJeuStack = createNativeStackNavigator<MiniJeuStackParams>();
const SettingsStack = createNativeStackNavigator<SettingsStackParams>();
const DepenseStack = createNativeStackNavigator<DepenseStackParams>();

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
      <RootStack.Screen name="MiniJeuStack" component={MiniJeuScreenStack}/>
      <RootStack.Screen name="SettingsStack" component={SettingsNavigator}/>
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
      <MainNavigation.Screen name="AccueilStack" component={AccueilScreenStack} options={{tabBarIcon: ({color}) => <AccueilIcon color={color}/>}} />
      <MainNavigation.Screen name="CourseStack" component={ListeDeCourseScreenStack} options={{tabBarIcon: ({color}) => <CourseIcon color={color} />}} />
      <MainNavigation.Screen name="Tache" component={TacheScreen} options={{tabBarIcon: ({color}) => <TacheIcon color={color} />}}/>
      <MainNavigation.Screen name="DepenseStack" component={DepenseScreenStack} options={{tabBarIcon: ({color}) => <DepenseIcon color={color} />}}/>
    </MainNavigation.Navigator>
  )
}


// Pile de navigation pour l'écran des settings 
const SettingsNavigator = () => {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name="ColocationSettings" component={ColocationSettingsScreen} />
      <SettingsStack.Screen name="AvatarSettings" component={AvatarSettings} />
    </SettingsStack.Navigator>
  );
}

// Pile de navigation pour l'écran ou tu as pas de coloc  
const NoColocScreenStack = () => {
  return (
    <NoColocStack.Navigator screenOptions={{ headerShown: false }}>
      <NoColocStack.Screen name="NoColoc" component={NoColoc}/>
    </NoColocStack.Navigator>
  );
}

// Pile de navigation pour l'écran Accueil  
const AccueilScreenStack = () => {
  return (
    <AccueilStack.Navigator screenOptions={{headerShown: false}}>
      <AccueilStack.Screen 
        name="Accueil" 
        component={AccueilScreen} 
      />
    </AccueilStack.Navigator>
  );
}

// Pile de navigation pour l'écran Depense  
const DepenseScreenStack = () => {
  const [transac, setTransac] = useState([])
  return (
    <DepenseContext.Provider value={[transac, setTransac]}>
    <DepenseStack.Navigator screenOptions={{headerShown: false}}>
      <DepenseStack.Screen name="Depense" component={DepenseScreen} />
    </DepenseStack.Navigator>
    </DepenseContext.Provider>
  );
}


// Pile de navigation pour l'écran MiniJeu
const MiniJeuScreenStack = () => {
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
};

// Pile de navigation pour l'écran ListeDeCourseScreen
const ListeDeCourseScreenStack = () => {
  const [courses, setCourses] = useState([]);

  return (
    <CourseContext.Provider value={[courses, setCourses]}>
    <CourseStack.Navigator initialRouteName="Course" screenOptions={{ headerShown: false }}>
      <CourseStack.Screen name="Course" component={CourseScreen} />
      <CourseStack.Screen name="ListeDeCourse" component={ListeDeCourseScreen} />
    </CourseStack.Navigator>
    </CourseContext.Provider>
  );
}

// Pile de navigation pour l'écran AuthScreen
const AuthScreenStack = () => {
  return (
    <AuthStack.Navigator initialRouteName="FirstPage" screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="FirstPage" component={FirstPage} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen name="AvatarSettings" component={AvatarSettings} />
    </AuthStack.Navigator>
  )
}

// Fonction principale de l'application
export default function App() {

  //Gestion à la racine des BottomSheet indispensable
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  const handlePresentPress = () => {
    bottomSheetModalRef.current?.present();
  };

  //Verification de si l'utilisateur est connecté ou non
  const isLoggedIn = false; 
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
        return <NoColocScreenStack />;
      }
    }// l'user n'est pas connecté
    return <AuthScreenStack />;
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
