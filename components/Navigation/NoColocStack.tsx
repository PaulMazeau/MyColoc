import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { View, Text } from 'react-native'
import NoColoc from '../../screens/NoColoc';

export type NoColocStackParams = {
    NoColoc: undefined,
  };

export default function NoColocStackComponent() {

    const NoColocStack = createNativeStackNavigator<NoColocStackParams>();

    return (
    <NoColocStack.Navigator screenOptions={{ headerShown: false }}>
        <NoColocStack.Screen name="NoColoc" component={NoColoc}/>
      </NoColocStack.Navigator>
    )
}
