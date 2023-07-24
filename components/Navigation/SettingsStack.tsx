import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { View, Text } from 'react-native'
import AvatarSettings from '../../screens/AvatarSettings';
import ColocationSettingsScreen from '../../screens/ColocationSettings';

export type SettingsStackParams = {
    ColocationSettings: undefined,
    AvatarSettings: undefined,
  };


export default function SettingsStackComponent() {
    const SettingsStack = createNativeStackNavigator<SettingsStackParams>();
    return (
            <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
              <SettingsStack.Screen name="ColocationSettings" component={ColocationSettingsScreen} />
              <SettingsStack.Screen name="AvatarSettings" component={AvatarSettings} />
            </SettingsStack.Navigator>
    )
}
