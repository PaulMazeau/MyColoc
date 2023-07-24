import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions, Keyboard, Platform } from 'react-native'
import AccueilIcon from '../../assets/icons/AccueilIcon';
import CourseIcon from '../../assets/icons/CourseIcon';
import DepenseIcon from '../../assets/icons/DepenseIcon';
import TacheIcon from '../../assets/icons/TacheIcon';
import TacheScreen from '../../screens/Tache';
import AccueilStackComponent from './AccueilStack';
import CourseStackComponent from './CourseStack';
import DepenseStackComponent from './DepenseStack';
import { RootStackParams } from './RootStack';

export default function MainStackComponent() {
    const MainNavigation = createBottomTabNavigator<RootStackParams>();
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
    return (
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
        <MainNavigation.Screen name="AccueilStack" component={AccueilStackComponent} options={{tabBarIcon: ({color}) => <AccueilIcon color={color}/>}} />
        <MainNavigation.Screen name="CourseStack" component={CourseStackComponent} options={{tabBarIcon: ({color}) => <CourseIcon color={color} />}} />
        <MainNavigation.Screen name="Tache" component={TacheScreen} options={{tabBarIcon: ({color}) => <TacheIcon color={color} />}}/>
        <MainNavigation.Screen name="DepenseStack" component={DepenseStackComponent} options={{tabBarIcon: ({color}) => <DepenseIcon color={color} />}}/>
      </MainNavigation.Navigator>
    )
}
