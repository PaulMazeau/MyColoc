import React, { useState, useCallback, useRef, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions, ScrollView, Image, Alert} from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { ScrollView as GestureHandlerScrollView } from 'react-native-gesture-handler';
import Plus from '../../assets/icons/Plus.svg';
import AddButton from '../../assets/icons/AddButtonGrey.svg';
import ParticipantCard from '../Reusable/ParticipantCard';
import * as Haptics from 'expo-haptics';
import { UserContext } from '../../UserContext';
import { addDoc, collection } from 'firebase/firestore';
import { FB_DB, FB_STORE } from '../../firebaseconfig';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getDownloadURL, list, ref } from 'firebase/storage';

const categorieList = [
    {emojiUrl: "https://firebasestorage.googleapis.com/v0/b/hestiadev-813bc.appspot.com/o/AvatarsCompress%2FAvatar1-min.jpg?alt=media&token=3b3b84f7-5925-4ad8-a95a-06f18aaad14e"},
    {emojiUrl: "https://firebasestorage.googleapis.com/v0/b/hestiadev-813bc.appspot.com/o/AvatarsCompress%2FAvatar10-min.jpg?alt=media&token=9cd8e88e-a04c-40a5-9b01-469cf4d2d90c"},
    {emojiUrl: "https://firebasestorage.googleapis.com/v0/b/hestiadev-813bc.appspot.com/o/AvatarsCompress%2FAvatar11-min.jpg?alt=media&token=fa7d9eab-9cc9-47f0-8243-739d52c3f5f9"},
    {emojiUrl: "https://firebasestorage.googleapis.com/v0/b/hestiadev-813bc.appspot.com/o/AvatarsCompress%2FAvatar12-min.jpg?alt=media&token=7372e4db-ae30-483c-b3f2-efc449a6c445"},
    {emojiUrl: "https://firebasestorage.googleapis.com/v0/b/hestiadev-813bc.appspot.com/o/AvatarsCompress%2FAvatar13-min.jpg?alt=media&token=566d560e-44e8-473e-b2ab-90612a66b0d1"},
    {emojiUrl: "https://firebasestorage.googleapis.com/v0/b/hestiadev-813bc.appspot.com/o/AvatarsCompress%2FAvatar14-min.jpg?alt=media&token=3dcf35a7-7f14-4f88-af95-648242ec6883"},
    {emojiUrl: "https://firebasestorage.googleapis.com/v0/b/hestiadev-813bc.appspot.com/o/AvatarsCompress%2FAvatar15-min.jpg?alt=media&token=e15b6597-30c2-4c2c-a2be-991154b8b436"},
    {emojiUrl: "https://firebasestorage.googleapis.com/v0/b/hestiadev-813bc.appspot.com/o/AvatarsCompress%2FAvatar16-min.jpg?alt=media&token=508bb67f-19fa-4e68-b1f1-8eafdf8bf20f"},
    {emojiUrl: "https://firebasestorage.googleapis.com/v0/b/hestiadev-813bc.appspot.com/o/AvatarsCompress%2FAvatar17-min.jpg?alt=media&token=983f6340-bc73-4f04-9edb-7a0e2731a4c0"},
    {emojiUrl: "https://firebasestorage.googleapis.com/v0/b/hestiadev-813bc.appspot.com/o/AvatarsCompress%2FAvatar18-min.jpg?alt=media&token=b658869a-4050-45a5-8e06-3e5f5164c251"},
    {emojiUrl: "https://firebasestorage.googleapis.com/v0/b/hestiadev-813bc.appspot.com/o/AvatarsCompress%2FAvatar19-min.jpg?alt=media&token=2a5a1c8b-2823-45b1-8836-4e7a4db51f81"},
    {emojiUrl: "https://firebasestorage.googleapis.com/v0/b/hestiadev-813bc.appspot.com/o/AvatarsCompress%2FAvatar2-min.jpg?alt=media&token=aa513ea4-b64e-45da-8ea1-e9a624650c75"},
    {emojiUrl: "https://firebasestorage.googleapis.com/v0/b/hestiadev-813bc.appspot.com/o/AvatarsCompress%2FAvatar20-min.jpg?alt=media&token=ace7a5af-8b7b-4a1a-9fd3-7e9a5778729a"},
    {emojiUrl: "https://firebasestorage.googleapis.com/v0/b/hestiadev-813bc.appspot.com/o/AvatarsCompress%2FAvatar3-min.jpg?alt=media&token=8c8a3a39-c2a2-4f29-bdf1-839e4a8a78bd"},
    {emojiUrl: "https://firebasestorage.googleapis.com/v0/b/hestiadev-813bc.appspot.com/o/AvatarsCompress%2FAvatar4-min.jpg?alt=media&token=381c1f98-4b52-4d3e-a7b1-29e1f0eabd24"},
    {emojiUrl: "https://firebasestorage.googleapis.com/v0/b/hestiadev-813bc.appspot.com/o/AvatarsCompress%2FAvatar5-min.jpg?alt=media&token=8b0c46d7-7fbb-4062-970d-3b8b3a688e80"},
    {emojiUrl: "https://firebasestorage.googleapis.com/v0/b/hestiadev-813bc.appspot.com/o/AvatarsCompress%2FAvatar6-min.jpg?alt=media&token=b3e07ee9-5146-4cae-a315-34b614760925"},
    {emojiUrl: "https://firebasestorage.googleapis.com/v0/b/hestiadev-813bc.appspot.com/o/AvatarsCompress%2FAvatar7-min.jpg?alt=media&token=9e9844af-ef14-46f4-978c-bc618555c602"},
    {emojiUrl: "https://firebasestorage.googleapis.com/v0/b/hestiadev-813bc.appspot.com/o/AvatarsCompress%2FAvatar8-min.jpg?alt=media&token=ff7c1bb7-b774-484c-baad-410998864cd9"},
    {emojiUrl: "https://firebasestorage.googleapis.com/v0/b/hestiadev-813bc.appspot.com/o/AvatarsCompress%2FAvatar9-min.jpg?alt=media&token=d32d71aa-4c8d-44aa-9004-69f1545e1c7d"},
  ]
  
const AddPlayerBS = ({ addPlayer }) => {
  // State pour le nom et l'avatar du player
  const [title, setTitle] = useState(null);
  const [avatar, setAvatar] = useState(null);

  // Référence à la bottom sheet modal
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // Fonction pour ouvrir la bottom sheet modal
  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const handleAddPlayer = async () => {
    if(title.length == 0){Alert.alert('','Entrez un nom')}
    else{
      addPlayer({ name: title, photo: avatar }); // utilisez la fonction addPlayer pour ajouter un nouveau joueur
      setTitle(null);
      setAvatar(null);
      closeBottomSheet();
    } 
  }


  

  const renderCat = () => {
    return(
      categorieList.map((c) => {
        return(
          <TouchableOpacity onPress={() => {setAvatar(c.emojiUrl)}} key={c.emojiUrl}>
            <Image source={{uri: c.emojiUrl, cache:'force-cache'}} style={(avatar===c.emojiUrl)?styles.ImageSelected:styles.ImageDeselected}/>
          </TouchableOpacity>
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
        <Text style={styles.addButtonText}>Ajouter un joueur externe</Text>
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={['55%']}
        index={0}
        backdropComponent={renderBackdrop}
      >
        <View style={styles.contentContainer}>
            <Text style={styles.title}>Ajouter un joueur</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>Nom</Text>
              <TextInput
                style={styles.input}
                onChangeText={setTitle}
                value={title}
                placeholder="Entrer le nom du joueur"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>Avatar</Text>
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

            <TouchableOpacity style={styles.add} onPress={() =>{ Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); handleAddPlayer() }}>
              <Plus />
              <Text style={styles.buttonText}>Ajouter le joueur</Text>
            </TouchableOpacity>
        </View>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:20,
    marginBottom:20,
    justifyContent:'center',
    alignItems:'center',
  },
  addButton: {
    width: '100%',
    height:50,
    backgroundColor: '#172ACE',
    borderRadius: 8,
    justifyContent:'center',
    alignItems:'center'
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
  ImageDeselected:{
    height:70,
    width:70,
    borderRadius:10,
    marginHorizontal:5
  },
  ImageSelected:{
    height:70,
    width:70,
    borderRadius:10,
    marginHorizontal:5,
    borderColor:'blue',
    borderWidth:1
  },
  addButtonText: {
    color: 'white',
    fontSize: 16
  }
});

export default AddPlayerBS;
