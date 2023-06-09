import React, { useCallback, useContext, useRef, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions, ScrollView, Alert} from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import Plus from '../../assets/icons/Plus.svg';
import AddButton from '../../assets/icons/AddButton.svg';
import ParticipantCard from '../Reusable/ParticipantCard';
import * as Haptics from 'expo-haptics';
import { ColocContext, UserContext } from '../../UserContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { FB_DB } from '../../firebaseconfig';
import { Dropdown } from 'react-native-element-dropdown';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AddDepenseBS = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useContext(UserContext);
  const [payeur, setPayeur] = useState(null);
  const [receivers, setReceivers] = useState([])
  // const [items, setItems] = useState([
  //   {label: 'Apple', value: 'apple'},
  //   {label: 'Banana', value: 'banana'}
  // ]);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [title, onChangeTitre] = React.useState(null);
  const [value, setValue] = useState(null);
  const [day, Day] = React.useState(null);
  const [month, Month] = React.useState(null);
  const [year, Year] = React.useState(null);
  const [coloc, setColoc] = useContext(ColocContext);
  const items = coloc.map((c)=>{ //data dans le dropdown
    var rObj = {}
    rObj['label'] = c.nom
    rObj['value'] = c.uuid
    return rObj;
  }) 

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

  const AddDepense = () => {
    closeBottomSheet();
  };

  const renderParticipant = () => {
    return(
      coloc.map((c) => {
        return(
          <TouchableOpacity key = {c.uuid} onPress={() => {selectUser(c.uuid)}}>
          <ParticipantCard nom ={c.nom} url={c.avatarUrl} key = {c.uuid}/>
          </TouchableOpacity>
        )
      })
    )
  }

  const selectUser = (id) => {
    if(receivers.includes(id)){
      setReceivers(receivers.filter(elt => !(elt==id)))
    }else{
      setReceivers([...receivers, id])
    } 
  }
  const isNumber = (str) => {
    if(!str){
      return false
    }
    if (str.trim() === '') {
      return false;
    }
  
    return !isNaN(str);
  }
  const handleAddDepense = async () => {
    if(!isNumber(value)){
      return Alert.alert(
        //Titre
        "Il manque le montant de la dépense",
        //Texte
        "Entre un nombre valide"
        )
      }
      if(receivers.length==0){
        return Alert.alert(
        "Cette dépense concerne qui?",
        "Entre les personnes concernés par cette dépense"
        )
      }
      if(payeur.length==0){
        return Alert.alert(
        "Qui a payé ?",
        "Entre la personne qui a payé"
        )
      }
      if(title.length==0){
        return Alert.alert(
        "Comment s'intitule cette dépense?",
        "Ajoute un titre à cette dépense "
        )
      }
      if(title == "rbrsmnt"){
        alert("Change de titre")
        return
      }
    const allParticipant = [...receivers]
    if(!(allParticipant.includes(payeur))){allParticipant.push(payeur)}
    await addDoc(collection(FB_DB, "Colocs/" +user.colocID+ "/Transactions"), {timestamp: serverTimestamp(), amount: Number(value), giverID: payeur, receiversID: receivers, desc: title, concerned: allParticipant}).then(()=>{alert('dep add')}).catch((error)=>{alert(error.message)})
    };

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity onPress={() =>{ Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); openBottomSheet() }} style={styles.addButton}>
        <AddButton />
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={['90%']}
        index={0}
        backdropComponent={renderBackdrop}
        enableHandlePanningGesture={true}
      >
        <View style={styles.contentContainer}>
 
 <Text style={styles.Title}>Nouvelle dépense</Text>
     <View style={styles.depenseTitle}>
         <Text style={styles.subTitle}>Titre</Text>
         <TextInput
                 style={styles.input}
                 onChangeText={onChangeTitre}
                 value={title}
                 placeholder="Entrer le titre"  
             />
       </View>
 
       <View style={styles.depenseTitle}>
         <Text style={styles.subTitle}>Montant</Text>
         <TextInput
                 style={styles.input}
                 onChangeText={setValue}
                 value={value}
                 placeholder="Entrer le montant"
                 keyboardType='numeric'
             />
       </View>
 
       <View style={styles.depenseTitle}>
         <Text style={styles.subTitle}>Payé par :</Text>
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
 
       <View style={styles.depenseTitle}>
         <Text style={styles.subTitle}>Payé pour</Text>
             <View style={styles.participant}>
                 <ScrollView  
                     horizontal={true}
                     showsHorizontalScrollIndicator={false}
                     contentContainerStyle={{flexGrow: 1}}
                     keyboardShouldPersistTaps='handled'>
                         {renderParticipant()}
                 </ScrollView>
             </View>
       </View>
 
       <TouchableOpacity style={styles.AddButton} onPress={() => { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); AddDepense(); setPayeur(null); setReceivers([]); handleAddDepense(); setValue(null); onChangeTitre(null)}} > 
       <Plus/>
       <Text style={styles.buttonText}>Ajouter la dépense</Text>
       </TouchableOpacity>
    
        </View>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        bottom: windowHeight * 0.12, // 12% de la hauteur de l'écran
        right: windowWidth * 0.03, // 5% de la largeur de l'écran
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

      inputDate: {
        height: 44,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        padding: 10,
        borderRadius: 14,
        width: 100,
      },

      date: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 13,
      marginLeft: 13,
      marginRight: 13,
      },

      Title: {
        textAlign: 'center',
        fontSize: 19,
        fontWeight: '600',
        marginBottom: 10
      },

      subTitle: {
        marginLeft: 16,
        fontSize: 16,
        fontWeight: '500'
      },

      depenseTitle: {
          marginTop: 15
      },

      dropdownRecurrence: {
        marginTop: 13,
        marginLeft: 13,
        marginRight: 13,
        height: 44,
        backgroundColor: 'white',
        borderRadius: 14,
        padding: 12,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#DDDDDD',
      },
      

      placeholderStyle: {
        fontSize: 16,
      },

      selectedTextStyle: {
        fontSize: 16,
      },
      
      groupe: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },

      dropdownRappel: {
        marginTop: 13,
        marginLeft: 13,
        marginRight: 13,
        height: 44,
        backgroundColor: 'white',
        borderRadius: 14,
        padding: 12,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        width: 145,
      },

      participant: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginLeft: 13,
          marginRight: 13,
      },

      AddButton: {
        backgroundColor: '#172ACE',
        height: 56,
        borderRadius: 13,
        marginTop: 20,
        marginLeft: 13,
        marginRight: 13,
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
        zIndex: 2,
      },

      OpenBS: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flex: 1,
      },
});

export default AddDepenseBS;
