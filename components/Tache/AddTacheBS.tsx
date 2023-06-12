import React, { useCallback, useContext, useRef, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions, Alert, Platform  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import Plus from '../../assets/icons/Plus.svg';
import AddButton from '../../assets/icons/AddButton.svg';
import ParticipantCard from '../Reusable/ParticipantCard';
import { ColocContext, UserContext } from '../../UserContext';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Haptics from 'expo-haptics';
import { addDoc, collection, doc } from 'firebase/firestore';
import { FB_DB } from '../../firebaseconfig';
import { main } from '../../constants/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const windowDimensions = Dimensions.get('window');

const recurrenceOptions = [
  { label: 'Aucune', value: '0' },
  { label: '1 jour', value: '1' },
  { label: '2 jours', value: '2' },
  { label: '3 jours', value: '3' },
  { label: '1 semaine', value: '7' },
  { label: '2 semaines', value: '14' },
  { label: '1 mois', value: '28' },
];

function getDateString(date) {
  
      var
          
          monthName = ["Janvier", "Février", "Mars", "Avril", "Mais", "Juin",
                       "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"],
          utc = date.getTime() + date.getTimezoneOffset() * 60000,
          FR_time = utc + (3600000 * +1),
          FR_date = new Date(FR_time);

      return FR_date.getDate() + " " + monthName[FR_date.getMonth()] +
             " " + FR_date.getFullYear();
  }


const AddTacheBS = () => {
  const bottomSheetRef = useRef(null);
  const[concerned, setConcerned] = useState([]);
  const [coloc] = useContext(ColocContext);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateString, setDateString] = useState("");
  const [date, setDate] = useState(null);
  const [title, setTitle] = useState(null);
  const [recur, setRecur] = useState('');
  const [user, setUser] = useContext(UserContext);
  const putInOrPutOut = (id) => {
    if(concerned.includes(id)){
      setConcerned(concerned.filter(elt => !(elt==id)))
    }else {
    setConcerned([...concerned, id])
  }}
  const handleConfirmDate = (date) => {
    setDateString(getDateString(date));
    setDate(date);
    toggleDatePicker();
  };

  const handleAddTask = async () =>  {
    if(recur==""){return Alert.alert("Il manque la fréquence","Sélectionne une fréquence pour ta tâche !")}
    if(!date){return Alert.alert("Quand doit être effectuée la tâche ?","Ajoute une date à cette tâche")}
    if(!title){return Alert.alert("Comment s'intitule cette tâche","Rentre un titre pour cette tâche !")}
    if(concerned.length == 0){return Alert.alert("Qui est concerné par cette tâche ?","Selectionne les personnes concernées par cette tâche")}
    await addDoc(collection(FB_DB, 'Colocs/'+user.colocID+'/Taches'), {desc : title, colocID: user.colocID, date : date, concerned: concerned, recur: recur, nextOne: concerned[0]}).then(()=>{
      alert('Tache ajoutée')
    }).catch((error)=>{alert(error.message)})
    bottomSheetRef.current?.close();
    setTitle(null);
    setConcerned([]);
    setDate(null);
    setRecur("");
    setDateString('');
  }

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

  const renderParticipant = () => {
    return coloc.map((c) => {
      return(
      <TouchableOpacity key ={c.uuid} onPress = {() => {putInOrPutOut(c.uuid)}}>
      <ParticipantCard nom={c.nom} url={c.avatarUrl} key={c.uuid} />
      </TouchableOpacity>)
  });}

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
                value={recur}
                placeholder="Choisir une récurrence"
                onChange={(item) => {
                  setRecur(item.value);
                }}
              />
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

            <TouchableOpacity style={styles.add} onPress={handleAddTask}>
              <Plus />
              <Text style={styles.buttonText}>Ajouter la tâche ménagère</Text>
            </TouchableOpacity>
        
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
    right: windowDimensions.width * 0.03,
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#BCBCBC'
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  contentContainer: {
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
