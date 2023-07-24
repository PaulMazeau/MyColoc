import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native'
import { DepenseContext } from '../../UserContext';
import DepenseScreen from '../../screens/Depense';

export type DepenseStackParams = {
    Depense: undefined,
  };

export default function DepenseStackComponent() {
    const [transac, setTransac] = useState([])
    const DepenseStack = createNativeStackNavigator<DepenseStackParams>();
    return (
        <DepenseContext.Provider value={[transac, setTransac]}>
        <DepenseStack.Navigator screenOptions={{headerShown: false}}>
          <DepenseStack.Screen name="Depense" component={DepenseScreen} />
        </DepenseStack.Navigator>
        </DepenseContext.Provider>
    )
}
