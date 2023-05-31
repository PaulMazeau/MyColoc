import React, { useState, useCallback, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { ScrollView as GestureHandlerScrollView } from 'react-native-gesture-handler';
import Plus from '../../assets/icons/Plus.svg';
import AddButton from '../../assets/icons/AddButton.svg';
import ParticipantCard from '../Reusable/ParticipantCard';
import * as Haptics from 'expo-haptics';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AddListeCourseBS = () => {
  // State pour le titre de la liste
  const [title, setTitle] = useState(null);

  // Référence à la bottom sheet modal
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // Fonction pour fermer la bottom sheet modal
  const addListeDeCourse = () => {
    bottomSheetRef.current?.close();
  };

  // Fonction pour ouvrir la bottom sheet modal
  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  // Rendu du backdrop de la bottom sheet modal
  const renderBackdrop = useCallback(
    (props) => {
      return (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior={'close'}
        />
      );
    },
    []
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() =>{ Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); openBottomSheet() }} style={styles.addButton}>
        <AddButton />
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={['65%']}
        index={0}
        backdropComponent={renderBackdrop}
      >
        <View style={styles.contentContainer}>
          <BottomSheetScrollView>
            <Text style={styles.title}>Nouvelle Liste de Course</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>Nom</Text>
              <TextInput
                style={styles.input}
                onChangeText={setTitle}
                value={title}
                placeholder="Entrer le nom de la liste de course"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>Catégorie</Text>
              <View style={styles.participant}>
                <GestureHandlerScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.participantContainer}
                  keyboardShouldPersistTaps="handled"
                >
                  <ParticipantCard />
                  <ParticipantCard />
                  <ParticipantCard />
                  <ParticipantCard />
                  <ParticipantCard />
                </GestureHandlerScrollView>
              </View>
            </View>

            <TouchableOpacity style={styles.add} onPress={() =>{ Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); addListeDeCourse() }}>
              <Plus />
              <Text style={styles.buttonText}>Ajouter la liste de course</Text>
            </TouchableOpacity>
          </BottomSheetScrollView>
        </View>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    bottom: windowHeight * 0.12, // 5% de la hauteur de l'écran
    right: windowWidth * 0.05, // 5% de la largeur de l'écran
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    width: '96%',
    marginHorizontal: '2%',
    borderRadius: 35,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  subTitle: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  inputContainer: {
    marginTop: 15,
  },
  input: {
    height: 44,
    marginTop: 13,
    marginLeft: 13,
    marginRight: 13,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    padding: 10,
    borderRadius: 14,
  },
  participant: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 13,
    marginRight: 13,
  },
  participantContainer: {
    flexGrow: 1,
  },
  add: {
    backgroundColor: '#172ACE',
    height: 56,
    borderRadius: 13,
    marginTop: 20,
    marginLeft: 13,
    marginRight: 13,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    marginLeft: 15,
  },
});

export default AddListeCourseBS;
