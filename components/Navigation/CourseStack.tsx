import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react'
import { View, Text } from 'react-native'
import CourseScreen from '../../screens/Course';
import { CourseContext } from '../../UserContext';
import ListeDeCourse from '../../screens/ListeDeCourse';

export type CourseStackParams = {
    Course: undefined;
    ListeDeCourse: {
      index: any;
    };
  };

export default function CourseStackComponent() {
    const [courses, setCourses] = useState([]);
    const CourseStack = createNativeStackNavigator<CourseStackParams>(); 
    return (
        <CourseContext.Provider value={[courses, setCourses]}>
        <CourseStack.Navigator initialRouteName="Course" screenOptions={{ headerShown: false }}>
          <CourseStack.Screen name="Course" component={CourseScreen} />
          <CourseStack.Screen name="ListeDeCourse" component={ListeDeCourse} />
        </CourseStack.Navigator>
        </CourseContext.Provider>
    )
}
