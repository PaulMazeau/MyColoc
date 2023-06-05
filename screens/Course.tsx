import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
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
  
  const EmptyPage = () => {
    return (
      <View style={styles.emptyPageContainer}>
        <Image source={require('../assets/images/EmptyCourse.png')} style={styles.emptyPageImage} />
        <Text style={styles.texte}>Oops, tu n'as pas encore de liste de courses</Text>
      </View>
    );
  };

  const renderContent = () => {
    if(courses.length == 0){
      return <EmptyPage />;
    }else{
      return (
        courses.map((c, index) => {
          return (
            <CourseCard key={c.id} name={c.data().Nom} index={index} onPress={(index) => {navigation.navigate('ListeDeCourse', {index})}}></CourseCard>
          );
        })
      );
    }
  };

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
  },
  emptyPageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyPageImage: {
    width: 250,
    height: 250,
    marginBottom: 10,
  },
  texte: {
    fontSize: 14,
    color: main.TextColor,
    marginLeft: 5,
    fontWeight: '600',
    letterSpacing: -0.6,
  },
});

export default CourseScreen;
