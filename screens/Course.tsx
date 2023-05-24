import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import CourseCard from '../components/Course/CourseCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { CourseStackParams } from '../App';
import { main } from '../constants/Colors';
import Header from '../components/Reusable/Header';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ScreenTitle from '../components/Reusable/ScreenTitle';


// Définition du type des propriétés pour la page CourseScreen
type Props = NativeStackScreenProps<CourseStackParams, 'Course'>;

const CourseScreen = ({navigation}: Props) => {
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  const handlePresentPress = () => {
    bottomSheetModalRef.current?.present();
  };
  

  
  return (
    <View style={styles.container}>
      <Header/>
      <ScreenTitle title="Course"/>
      

      <Button title="Présenter BottomSheet" onPress={handlePresentPress} />
      <BottomSheetModal ref={bottomSheetModalRef} index={1} snapPoints={['25%', '50%']}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text>Votre contenu ici</Text>
        </View>
      </BottomSheetModal>
      <CourseCard name="Course de vendredi" onPress={ name => {navigation.navigate('ListeDeCourse', {name})}}></CourseCard>
      <CourseCard name="Course de dimanche" onPress={ name => {navigation.navigate('ListeDeCourse', {name})}}></CourseCard>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: main.BgColor,
  },
});

export default CourseScreen