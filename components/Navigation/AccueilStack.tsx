import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { View, Text } from 'react-native'
import AccueilScreen from '../../screens/Accueil';

export type AccueilStackParams = {
    Accueil: undefined;
    MiniJeu: undefined;
    BoutonMiniJeu: undefined;
  };

export default function AccueilStackComponent() {

const AccueilStack = createNativeStackNavigator<AccueilStackParams>();

    return (
        <AccueilStack.Navigator screenOptions={{headerShown: false}}>
        <AccueilStack.Screen 
          name="Accueil" 
          component={AccueilScreen} 
        />
      </AccueilStack.Navigator>
    )
}
