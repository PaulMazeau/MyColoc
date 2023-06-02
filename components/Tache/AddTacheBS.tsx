import React, { useCallback, useContext, useRef, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import Plus from '../../assets/icons/Plus.svg';
import AddButton from '../../assets/icons/AddButton.svg';
import ParticipantCard from '../Reusable/ParticipantCard';
import { ColocContext } from '../../UserContext';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Haptics from 'expo-haptics';

const windowDimensions = Dimensions.get('window');

const recurrenceOptions = [
  { label: 'Aucune', value: '1' },
  { label: '1 jour', value: '2' },
  { label: '2 jours', value: '3' },
  { label: '3 jours', value: '4' },
  { label: '1 semaine', value: '5' },
  { label: '2 semaines', value: '6' },
  { label: '1 mois', value: '7' },
  { label: '2 mois', value: '8' },
];

const reminderOptions = [
  { label: 'Aucun', value: '1' },
  { label: '1 heures', value: '2' },
  { label: '2 heures', value: '3' },
  { label: '1 jour', value: '4' },
  { label: '1 semaine', value: '5' },
];

const notificationOptions = [
  { label: 'Oui', value: '2' },
  { label: 'Non', value: '1' },
];

const AddTacheBS = () => {
  const bottomSheetRef = useRef(null);
  const [coloc] = useContext(ColocContext);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateString, setDateString] = useState("");
  const [title, setTitle] = useState(null);
  
  const handleConfirmDate = () => {
    console.log('date')
  };

  const toggleDatePicker = () => {
    setDatePickerVisibility((isVisible) => !isVisible);
  };

  const openBottomSheet = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    bottomSheetRef.current?.present();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const addTask = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    closeBottomSheet();
  };

  const renderBackdrop = useCallback((props) => (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  ), []);

  const renderParticipant = useCallback(() => {
    return coloc.map((c) => (
      <ParticipantCard nom={c.nom} url={c.avatarUrl} key={c.uuid} />
    ));
  }, [coloc])

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openBottomSheet} style={styles.addButton}>
        <AddButton />
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={['90%']}
        index={0}
        backdropComponent={renderBackdrop}
        enableHandlePanningGesture={true}
        enableContentPanningGesture={true}
      >
        <View style={styles.contentContainer}>
          <ScrollView>
            <Text style={styles.title}>Nouvelle tâche ménagère</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>Nom</Text>
              <TextInput
                style={styles.input}
                onChangeText={setTitle}
                value={title}
                placeholder="Entrer le nom de la tâche"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>Date</Text>

              <TextInput
                style={styles.inputDate}
                value={dateString}
                placeholder="Choisir la date"
                onPressIn={toggleDatePicker}
                showSoftInputOnFocus={false}
                placeholderTextColor="#A9A9A9"
              />

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmDate}
                onCancel={toggleDatePicker}
                cancelTextIOS='Annuler'
                confirmTextIOS='Confirmer'
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>Récurrence</Text>
              <Dropdown
                style={styles.input}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={recurrenceOptions}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Choisir une récurrence"
                onChange={() => {
                  console.log('recu');
                }}
              />
            </View>

            <View style={styles.inputContainer}>
              <View>
                <Text style={styles.subTitle}>Rappel</Text>
                <View>
                  <Dropdown
                    style={styles.input}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    data={reminderOptions}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Rappel"
                    onChange={() => {
                      console.log('recu');
                    }}
                  />
                </View>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>Participant</Text>
              <View style={styles.participant}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.participantContainer}
                  nestedScrollEnabled={true}
                >
                  {renderParticipant()}
                </ScrollView>
              </View>
            </View>

            <TouchableOpacity style={styles.add} onPress={addTask}>
              <Plus />
              <Text style={styles.buttonText}>Ajouter la tâche ménagère</Text>
            </TouchableOpacity>
          </ScrollView>
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
    bottom: windowDimensions.height * 0.12,
    right: windowDimensions.width * 0.05,
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#BCBCBC'
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 35,
    justifyContent: 'space-between',
    width: '94%',
    marginHorizontal: '3%'
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    padding: 10,
    borderRadius: 14,
  },
  inputDate: {
    height: 44,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    padding: 10,
    borderRadius: 14,
  },
  participant: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  participantContainer: {
    flexGrow: 1,
  },
  add: {
    backgroundColor: '#172ACE',
    height: 56,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    marginLeft: 15,
  },
  });

export default AddTacheBS;
