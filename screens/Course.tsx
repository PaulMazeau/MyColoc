import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import CourseCard from '../components/Course/CourseCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';
import { CourseStackParams } from '../App';
import { main } from '../constants/Colors';
import Header from '../components/Reusable/Header';
import ScreenTitle from '../components/Reusable/ScreenTitle';
import AddListeCourseBS from '../components/Course/AddCourseBS';
import { UserContext } from '../UserContext';
import { onSnapshot, query, collection } from 'firebase/firestore';
import { FB_DB } from '../firebaseconfig';
import { CourseContext } from '../UserContext';

// Définition du type des propriétés pour la page CourseScreen
type Props = NativeStackScreenProps<CourseStackParams, 'Course'>;

const CourseScreen = ({navigation}: Props) => {
  const [user, setUser] = useContext(UserContext)
  const [snapshot, setSnapshot] = useState(null)
  const [courses, setCourses] = useContext(CourseContext);
  useEffect(()=>{ //setup the listener on mount, unsubscribe on dismount
    const q = query(collection(FB_DB, "Colocs/"+user.colocID+ "/Courses"))
    const subscriber = onSnapshot(q, (QuerySnapshot) => {setSnapshot(QuerySnapshot)})
    return () => {subscriber()}
  }, [])
  useEffect(()=>{
    if(snapshot){
      const courseSetter = []
      snapshot.forEach((doc)=>{
        courseSetter.push(doc)
      })
      setCourses(courseSetter)
    }
  }, [snapshot])
  const renderContent = () => {
    if(courses.length == 0){
      return(<Text>Pas de courses</Text>)
    }else{
      var i = 0;
      return(
      courses.map((c, index) => {
        return(
          <CourseCard key={c.id} name={c.data().Nom} index={index} onPress={ (index) => {navigation.navigate('ListeDeCourse', {index})}}></CourseCard>
        )
      }))
    }
  }
  return (
    
    <View style={styles.container}>
      <Header/>
      <StatusBar style="auto" />
      <ScreenTitle title="Course"/>
      <ScrollView style={styles.ScrollView}>
      {renderContent()}
      </ScrollView>
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
  },
  ScrollView:{
    marginBottom: 90,
  }

});

export default CourseScreen