import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import CourseCard from '../components/Course/CourseCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { CourseStackParams } from '../App';
import { main } from '../constants/Colors';
import Header from '../components/Reusable/Header';
import ScreenTitle from '../components/Reusable/ScreenTitle';
import AddListeCourseBS from '../components/Course/AddCourseBS';


// Définition du type des propriétés pour la page CourseScreen
type Props = NativeStackScreenProps<CourseStackParams, 'Course'>;

const CourseScreen = ({navigation}: Props) => {

  return (
    <View style={styles.container}>
      <Header/>
      <StatusBar style="auto" />
      <ScreenTitle title="Course"/>
      <CourseCard name="Course de vendredi" onPress={ name => {navigation.navigate('ListeDeCourse', {name})}}></CourseCard>
      <CourseCard name="Course de dimanche" onPress={ name => {navigation.navigate('ListeDeCourse', {name})}}></CourseCard>
      <AddListeCourseBS />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: main.BgColor,
  },
  bottomSheet: {
     flex: 1, 
     backgroundColor: 'orange', 
     margin: 16, 
     borderRadius: 35, 
     marginBottom: 16 
  },
  bottomSheetText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 12
  }

});

export default CourseScreen