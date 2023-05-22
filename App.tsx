import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import GameCard from './components/GameCard';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CourseScreen from './screens/Course';
import TacheScreen from './screens/Tache';
import DepenseScreen from './screens/Depense';
import AccueilScreen from './screens/Accueil';
import ListeDeCourseScreen from './screens/ListeDeCourse';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//pile racine de l'application
export type RootStackParams = {
  Accueil: undefined; 
  CourseStack: NavigatorScreenParams<CourseStackParams>; // Pile de navigation associée à la gestion des courses
  Tache: undefined; 
  Depense: undefined;
  ListeDeCourse: {
    name: string;
  };
};

// Crée une navigation par onglets en utilisant les paramètres de la pile racine
const MainNavigation = createBottomTabNavigator<RootStackParams>(); 

// Définition des types de paramètres pour la pile de navigation CourseStack
export type CourseStackParams = {
  Course: undefined;
  ListeDeCourse: {
    name: string;
  };
};


// Crée une pile de navigation native en utilisant les paramètres de la pile CourseStack
const CourseStack = createNativeStackNavigator<CourseStackParams>(); 

// Stack de navigation pour l'écran ListeDeCourseScreen
const ListeDeCourseScreenStack = () => {
  return (
    <CourseStack.Navigator initialRouteName="Course" screenOptions={{ headerShown: false }}>
      <CourseStack.Screen name="Course" component={CourseScreen} /> 
      <CourseStack.Screen name="ListeDeCourse" component={ListeDeCourseScreen} /> 
    </CourseStack.Navigator>
  );
}

 
export default function App() {
  return (
    <NavigationContainer>
      <MainNavigation.Navigator initialRouteName="Accueil" screenOptions={{ headerShown: false }}>
        <MainNavigation.Screen name="Accueil" component={AccueilScreen} />
        <MainNavigation.Screen name="CourseStack" component={ListeDeCourseScreenStack} />
        <MainNavigation.Screen name="Tache" component={TacheScreen} />
        <MainNavigation.Screen name="Depense" component={DepenseScreen} /> 
      </MainNavigation.Navigator>
    </NavigationContainer>
  );
}
