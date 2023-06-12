import React, { useCallback, useContext, useRef, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import Plus from '../../assets/icons/Plus.svg';
import AddButton from '../../assets/icons/AddButton.svg';
import ParticipantCard from '../Reusable/ParticipantCard';
import * as Haptics from 'expo-haptics';
import { ColocContext, UserContext } from '../../UserContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { FB_DB } from '../../firebaseconfig';
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AddDepenseBS = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useContext(UserContext);
  const [payeur, setPayeur] = useState(null);
  const [receivers, setReceivers] = useState([]);
  const bottomSheetRef = useRef(null);
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [coloc] = useContext(ColocContext);
  const items = coloc.map((c) => ({ label: c.nom, value: c.uuid }));

  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const renderBackdrop = useCallback(
    (props) => {
      return (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      );
    },
    []
  );

  const renderParticipant = () => {
    return (
      coloc.map((c) => (
        <TouchableOpacity key={c.uuid} onPress={() => selectUser(c.uuid)}>
          <ParticipantCard nom={c.nom} url={c.avatarUrl} key={c.uuid} />
        </TouchableOpacity>
      ))
    );
  };

  const selectUser = (id) => {
    if (receivers.includes(id)) {
      setReceivers(receivers.filter((elt) => elt !== id));
    } else {
      setReceivers([...receivers, id]);
    }
  };

  const isNumber = (str) => {
    if (!str) {
      return false;
    }
    if (str.trim() === '') {
      return false;
    }

    return !isNaN(str);
  };

  const handleAddDepense = async () => {
    if (!isNumber(value)) {
      return Alert.alert(
        'Il manque le montant de la dépense',
        'Entre un nombre valide'
      );
    }
    if (receivers.length === 0) {
      return Alert.alert(
        'Cette dépense concerne qui?',
        'Entre les personnes concernées par cette dépense'
      );
    }
    if (!payeur) {
      return Alert.alert(
        'Qui a payé ?',
        'Entre la personne qui a payé'
      );
    }
    if (!title) {
      return Alert.alert(
        "Comment s'intitule cette dépense?",
        'Ajoute un titre à cette dépense'
      );
    }
    if (title === 'rbrsmnt') {
      Alert.alert('','Change de titre');
      return;
    }

    const allParticipant = [...receivers];
    if (!allParticipant.includes(payeur)) {
      allParticipant.push(payeur);
    }

    await addDoc(collection(FB_DB, `Colocs/${user.colocID}/Transactions`), {
      timestamp: serverTimestamp(),
      amount: Number(value),
      giverID: payeur,
      receiversID: receivers,
      desc: title,
      concerned: allParticipant,
    }).catch((error) => { alert(error.message) });

    closeBottomSheet();
    setPayeur(null);
    setReceivers([]);
    setValue('');
    setTitle('');
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          openBottomSheet();
        }}
        style={styles.addButton}
      >
        <AddButton />
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={['90%']}
        index={0}
        backdropComponent={renderBackdrop}
        enableHandlePanningGesture={true}
      >
        <KeyboardAwareScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.Title}>Nouvelle dépense</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.subTitle}>Titre</Text>
            <TextInput
              style={styles.input}
              onChangeText={setTitle}
              value={title}
              placeholder="Entrer le titre"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.subTitle}>Montant</Text>
            <TextInput
              style={styles.input}
              onChangeText={setValue}
              value={value}
              placeholder="Entrer le montant"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.subTitle}>Payé par</Text>
            <Dropdown
              style={styles.input}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={items}
              maxHeight={300}
              labelField="label"
              valueField="value"
              value={payeur}
              placeholder="Qui à payé ?"
              onChange={(item) => {
                setPayeur(item.value);
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.subTitle}>Payé pour</Text>
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

          <TouchableOpacity
            style={styles.AddButton}
            onPress={() => {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              handleAddDepense();
            }}
          >
            <Plus />
            <Text style={styles.buttonText}>Ajouter la dépense</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: windowHeight * 0.12,
    right: windowWidth * 0.03,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    padding: 10,
    borderRadius: 14,
  },
  Title: {
    textAlign: 'center',
    fontSize: 19,
    fontWeight: '600',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputContainer: {
    marginBottom: 20,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  participant: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  AddButton: {
    backgroundColor: '#172ACE',
    height: 56,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    marginLeft: 15,
  },
  contentContainer: {
    flex: 1,
    width: '94%',
    marginHorizontal: '3%',
  },
  participantContainer: {
    flexGrow: 1,
  },
});

export default AddDepenseBS;
