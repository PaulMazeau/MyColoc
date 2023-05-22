import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CourseScreen from './screens/Course';
import TacheScreen from './screens/Tache';
import DepenseScreen from './screens/Depense';
import AccueilScreen from './screens/Accueil';
import ListeDeCourseScreen from './screens/ListeDeCourse';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { NavBarStyle } from './constants/NavBar';
import AccueilIcon from './assets/icons/AccueilIcon';
import TacheIcon from './assets/icons/TacheIcon';
import CourseIcon from './assets/icons/CourseIcon';
import DepenseIcon from './assets/icons/DepenseIcon';
import { View } from 'react-native';

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
        <MainNavigation.Screen name="Accueil" component={AccueilScreen} options={{tabBarIcon: (({color}) => <AccueilIcon color={color}/>)}} />
        <MainNavigation.Screen name="CourseStack" component={ListeDeCourseScreenStack} options={{tabBarIcon: (({color}) => <CourseIcon color={color} />)}} />
        <MainNavigation.Screen name="Tache" component={TacheScreen} options={{tabBarIcon: (({color,}) => <TacheIcon color={color} />)}}/>
        <MainNavigation.Screen name="Depense" component={DepenseScreen} options={{tabBarIcon: (({color}) => <DepenseIcon color={color} />)}}/>
      </MainNavigation.Navigator>
    </NavigationContainer>
  );
}
