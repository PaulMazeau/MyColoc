import React, { useState, useCallback, useRef, useContext } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions, ScrollView, Platform} from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { ScrollView as GestureHandlerScrollView } from 'react-native-gesture-handler';
import Plus from '../../assets/icons/Plus.svg';
import AddButton from '../../assets/icons/AddButton.svg';
import ParticipantCard from '../Reusable/ParticipantCard';
import * as Haptics from 'expo-haptics';
import { UserContext } from '../../UserContext';
import { addDoc, collection } from 'firebase/firestore';
import { FB_DB } from '../../firebaseconfig';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const categorieList = [
  {emojiUrl: "https://firebasestorage.googleapis.com/v0/b/hestiadev-813bc.appspot.com/o/Emojis%2F0-min.png?alt=media&token=b341911a-d6cf-4166-9829-e2aaca8f4752", nom: "Repas"},
  {emojiUrl: "https://firebasestorage.googleapis.com/v0/b/hestiadev-813bc.appspot.com/o/Emojis%2F1-min.png?alt=media&token=a1778ed6-6c44-46b0-8593-33c22d2bdba3", nom: "Soirée"},
  {emojiUrl: "https://firebasestorage.googleapis.com/v0/b/hestiadev-813bc.appspot.com/o/Emojis%2F2-min.png?alt=media&token=a0bc831d-4454-4c0a-9778-8249fb018a3a", nom: "Végé"},
  {emojiUrl: "https://firebasestorage.googleapis.com/v0/b/hestiadev-813bc.appspot.com/o/Emojis%2F3-min.png?alt=media&token=e04e2c6b-2c8f-4c63-a70b-b3c1e3aa91dc", nom: "Ménage"},
  {emojiUrl: "https://firebasestorage.googleapis.com/v0/b/hestiadev-813bc.appspot.com/o/Emojis%2F4-min.png?alt=media&token=b444f9cb-f3a5-4b2e-8c46-175a1b05c561", nom: "Divers"},
]
const AddListeCourseBS = () => {
  // State pour le titre de la liste
  const [title, setTitle] = useState(null);
  const [emoji, setEmoji] = useState(null);
  const [user, setUser] = useContext(UserContext)
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

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };
  
  const handleAddCourse = async () => {
    if(title.length == 0){alert('titre vide')}
    else{
      await addDoc(collection(FB_DB, 'Colocs/'+user.colocID+'/Courses'), {Nom: title, Image:{uri :emoji}, divers: []}).then(() =>{
        alert('course bien créee')
        closeBottomSheet()
      }).catch((error)=>{alert('error.message')})
    }
    
  }

  const renderCat = () => {
    return(
      categorieList.map((c, index) => {
        return(
            <ParticipantCard url={c.emojiUrl} key = {c.emojiUrl} nom={c.nom} onPress={() => {setEmoji(c.emojiUrl)}}/>
        )
      })
    )
  }
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
                 {renderCat()}
                </GestureHandlerScrollView>
              </View>
            </View>

            <TouchableOpacity style={styles.add} onPress={() =>{ Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); handleAddCourse() }}>
              <Plus />
              <Text style={styles.buttonText}>Ajouter la liste de course</Text>
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
    bottom: windowHeight * 0.12, // 5% de la hauteur de l'écran
    right: windowWidth * 0.03, // 5% de la largeur de l'écran
  },
  contentContainer: {
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
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    padding: 10,
    borderRadius: 14,
  },
  participant: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    marginTop:10
  },
  participantContainer: {
    flexGrow: 1,
  },
  add: {
    backgroundColor: '#172ACE',
    height: 56,
    borderRadius: 13,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
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
