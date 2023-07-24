import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { View, Text } from 'react-native'
import AvatarSettings from '../../screens/AvatarSettings'
import FirstPage from '../../screens/FirstPage'
import LoginScreen from '../../screens/LogIn'
import SignUpScreen from '../../screens/SignUp'

export type AuthStackParams = {
    Login: undefined;
    SignUp: undefined;
    NoColoc: undefined;
    FirstPage: undefined;
    AvatarSettings: undefined;
  };

export default function AuthStackComponent() {

    const AuthStack = createNativeStackNavigator<AuthStackParams>();

    return (
    <AuthStack.Navigator initialRouteName="FirstPage" screenOptions={{headerShown: false}}>
        <AuthStack.Screen name="FirstPage" component={FirstPage} />
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="SignUp" component={SignUpScreen} />
        <AuthStack.Screen name="AvatarSettings" component={AvatarSettings} />
      </AuthStack.Navigator>
    )
}
