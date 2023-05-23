import React from 'react';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import des écrans
import AccueilScreen from './screens/Accueil';
import CourseScreen from './screens/Course';
import TacheScreen from './screens/Tache';
import DepenseScreen from './screens/Depense';
import ListeDeCourseScreen from './screens/ListeDeCourse';
import LoginScreen from './screens/LogIn';
import SignUpScreen from './screens/SignUp';

// Import des icônes
import AccueilIcon from './assets/icons/AccueilIcon';
import TacheIcon from './assets/icons/TacheIcon';
import CourseIcon from './assets/icons/CourseIcon';
import DepenseIcon from './assets/icons/DepenseIcon';

// Import du style de la barre de navigation
import { NavBarStyle } from './constants/NavBar';

// Définition des types de paramètres pour chaque pile de navigation
export type RootStackParams = {
  AuthStack: undefined;
  Accueil: undefined; 
  CourseStack: NavigatorScreenParams<CourseStackParams>; 
  Tache: undefined; 
  Depense: undefined;
  ListeDeCourse: {
    name: string;
  };
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

// Création des piles de navigation
const MainNavigation = createBottomTabNavigator<RootStackParams>();
const CourseStack = createNativeStackNavigator<CourseStackParams>(); 
const AuthStack = createNativeStackNavigator<AuthStackParams>();

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
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  )
}

// Fonction principale de l'application
export default function App() {
  const isLoggedIn = false; 

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
          <MainNavigation.Screen name="Accueil" component={AccueilScreen} options={{tabBarIcon: ({color}) => <AccueilIcon color={color}/>}} />
          <MainNavigation.Screen name="CourseStack" component={ListeDeCourseScreenStack} options={{tabBarIcon: ({color}) => <CourseIcon color={color} />}} />
          <MainNavigation.Screen name="Tache" component={TacheScreen} options={{tabBarIcon: ({color}) => <TacheIcon color={color} />}}/>
          <MainNavigation.Screen name="Depense" component={DepenseScreen} options={{tabBarIcon: ({color}) => <DepenseIcon color={color} />}}/>
        </MainNavigation.Navigator>
      );
    }
    return <AuthScreenStack />;
  }

  return (
    <NavigationContainer>
      {renderContent()}
    </NavigationContainer>
  );
}
