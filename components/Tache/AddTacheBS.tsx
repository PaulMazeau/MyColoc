import React, { useCallback, useContext, useRef, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import Plus from '../../assets/icons/Plus.svg';
import AddButton from '../../assets/icons/AddButton.svg';
import ParticipantCard from '../Reusable/ParticipantCard';
import * as Haptics from 'expo-haptics';
import { ColocContext } from '../../UserContext';
import DropDownPicker from 'react-native-dropdown-picker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AddTacheBS = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [coloc, setColoc] = useContext(ColocContext);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(null);
  const [open, setOpen] = useState(false);
  const [payeur, setPayeur] = useState(null);
  const [recurrence, setReccurence] = useState([
    { label: 'Aucune', value: '1' },
    { label: '1 jour', value: '2' },
    { label: '2 jours', value: '3' },
    { label: '3 jours', value: '4' },
    { label: '1 semaine', value: '5' },
    { label: '2 semaines', value: '6' },
    { label: '1 mois', value: '7' },
    { label: '2 mois', value: '8' },
  ]);
  const [rappel, setRappel] = useState([
    { label: 'Aucun', value: '1' },
    { label: '1 heures', value: '2' },
    { label: '2 heures', value: '3' },
    { label: '1 jour', value: '4' },
    { label: '1 semaine', value: '5' },
  ]);
  const [notification, setNotification] = useState([
    { label: 'Oui', value: '2' },
    { label: 'Non', value: '1' },
  ]);

  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const addTask = () => {
    closeBottomSheet();
  };

  const renderBackdrop = useCallback((props) => (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  ), []);

  const renderParticipant = () => {
    return coloc.map((c) => (
      <ParticipantCard nom ={c.nom} url={c.avatarUrl} key = {c.uuid} />
    ));
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() =>{ Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); openBottomSheet() }} style={styles.addButton}>
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
              <View style={styles.inputDate}></View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>Récurrence</Text>
              <View>
              <DropDownPicker
                      open={open}
                      value={payeur}
                      items={recurrence}
                      setOpen={setOpen}
                      setValue={setPayeur}
                      setItems={setReccurence}
                      style={styles.dropDownPicker}
                    />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.groupe}>
                <View>
                  <Text style={styles.subTitle}>Notification</Text>
                  <View>
                  <DropDownPicker
                      open={open}
                      value={payeur}
                      items={notification}
                      setOpen={setOpen}
                      setValue={setPayeur}
                      setItems={setNotification}
                      style={styles.halfDropDownPicker}
                    />
                  </View>
                </View>
                <View>
                  <Text style={styles.subTitle}>Rappel</Text>
                  <View>
                  <DropDownPicker
                      open={open}
                      value={payeur}
                      items={rappel}
                      setOpen={setOpen}
                      setValue={setPayeur}
                      setItems={setRappel}
                      style={styles.halfDropDownPicker}
                    />
                  </View>
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

            <TouchableOpacity style={styles.add} onPress={() =>{ Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); addTask() }}>
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
    bottom: windowHeight * 0.12, // 5% de la hauteur de l'écran
    right: windowWidth * 0.05, // 5% de la largeur de l'écran
  },
  dropDownPicker:{
    height: 44,
    borderRadius: 14,
    padding: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor: 'white',
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
  groupe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfDropDownPicker: {
    height: 44,
    borderRadius: 14,
    padding: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    width: 145,
    backgroundColor: 'white',
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
