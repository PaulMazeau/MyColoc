import React, {useState, useMemo} from 'react';
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
import MiniJeu from './screens/MiniJeu';

// Import des icônes
import AccueilIcon from './assets/icons/AccueilIcon';
import TacheIcon from './assets/icons/TacheIcon';
import CourseIcon from './assets/icons/CourseIcon';
import DepenseIcon from './assets/icons/DepenseIcon';

// Import du style de la barre de navigation
import { NavBarStyle } from './constants/NavBar';
import BoutonMiniJeu from './components/Accueil/BoutonMiniJeux';

//Import du contexte
import { useGlobalContext, GlobalContext, user} from "./UserContext";
import { User } from 'firebase/auth';

// Définition des types de paramètres pour chaque pile de navigation
export type RootStackParams = {
  AuthStack: undefined;
  Accueil: undefined; 
  AccueilStack: undefined;
  CourseStack: NavigatorScreenParams<CourseStackParams>; 
  Tache: undefined; 
  Depense: undefined;
  ListeDeCourse: {
    name: string;
  };
  MiniJeu: undefined;
};

export type CourseStackParams = {
  Course: undefined;
  ListeDeCourse: {
    name: string;
  };
};

export type AuthStackParams = {
  Login: undefined;
  SignUp: undefined;
};

export type AccueilStackParams = {
  Accueil: undefined;
  MiniJeu: undefined;
  BoutonMiniJeu: undefined;
};

// Création des piles de navigation
const MainNavigation = createBottomTabNavigator<RootStackParams>();
const CourseStack = createNativeStackNavigator<CourseStackParams>(); 
const AuthStack = createNativeStackNavigator<AuthStackParams>();
const AccueilStack = createNativeStackNavigator<AccueilStackParams>();

// Pile de navigation pour l'écran Accueil  
const AccueilScreenStack = () => {
  return (
    <AccueilStack.Navigator screenOptions={{headerShown: false}}>
      <AccueilStack.Screen name="Accueil" component={AccueilScreen} />
      <AccueilStack.Screen name="MiniJeu" component={MiniJeu} />
      <AccueilStack.Screen name="BoutonMiniJeu" component={BoutonMiniJeu} />
    </AccueilStack.Navigator>
  );
}


// Pile de navigation pour l'écran ListeDeCourseScreen
const ListeDeCourseScreenStack = () => {
  return (
    <CourseStack.Navigator initialRouteName="Course" screenOptions={{ headerShown: false }}>
      <CourseStack.Screen name="Course" component={CourseScreen} />
      <CourseStack.Screen name="ListeDeCourse" component={ListeDeCourseScreen} />
    </CourseStack.Navigator>
  );
}

// Pile de navigation pour l'écran AuthScreen
const AuthScreenStack = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
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
  const isLoggedIn = true; 
  const [user, setUser] = useState<user>(null)

  // Rendu du contenu en fonction de si l'utilisateur est connecté ou non
  const renderContent = () => {
    if (isLoggedIn) {
      return (
        <MainNavigation.Navigator
          initialRouteName="Accueil"
          screenOptions={{ 
            headerShown: false,
            tabBarStyle: NavBarStyle,
            tabBarActiveTintColor: "#172ACE",
            tabBarInactiveTintColor: "grey",
            tabBarLabel: () => null,
          }}
        >
          <MainNavigation.Screen name="AccueilStack" component={AccueilScreenStack} options={{tabBarIcon: ({color}) => <AccueilIcon color={color}/>}} />
          <MainNavigation.Screen name="CourseStack" component={ListeDeCourseScreenStack} options={{tabBarIcon: ({color}) => <CourseIcon color={color} />}} />
          <MainNavigation.Screen name="Tache" component={TacheScreen} options={{tabBarIcon: ({color}) => <TacheIcon color={color} />}}/>
          <MainNavigation.Screen name="Depense" component={DepenseScreen} options={{tabBarIcon: ({color}) => <DepenseIcon color={color} />}}/>
        </MainNavigation.Navigator>
      );
    }
    return <AuthScreenStack />;
  }

  return (
    <GlobalContext.Provider value={{user, setUser}}>
      <BottomSheetModalProvider>
        <NavigationContainer>
          {renderContent()}
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GlobalContext.Provider>
  );
}
