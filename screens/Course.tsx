import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import CourseCard from '../components/Course/CourseCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { CourseStackParams, RootStackParams } from '../App';
import { main } from '../constants/Colors';
import Header from '../components/Reusable/Header';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';


// Définition du type des propriétés pour la page CourseScreen
type Props = NativeStackScreenProps<CourseStackParams, 'Course'>;

const CourseScreen = ({navigation}: Props) => {
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  const handlePresentPress = () => {
    bottomSheetModalRef.current?.present();
  };
  
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const handleTabPress = (index : any) => {
    setSelectedTabIndex(index);
    // Effectuez ici les actions correspondantes à la sélection de l'onglet
    console.log(`Onglet ${index + 1} sélectionné`);
  };
  
  return (
    <View style={styles.container}>
      <Header/>
      <SegmentedControlTab
        values={['Onglet 1', 'Onglet 2']}
        selectedIndex={selectedTabIndex}
        onTabPress={handleTabPress}
      />
      {selectedTabIndex === 0 ? (
        <Text>Contenu de l'onglet 1</Text>
      ) : (
        <Text>Contenu de l'onglet 2</Text>
      )}

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