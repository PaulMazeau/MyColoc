import React, { useContext, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Horloge from '../../assets/icons/Horloge.svg';
import { Shadows } from '../../constants/Shadow';
import InfoBottomSheet from './InfoBottomSheet';
import Valider from '../../assets/icons/Valider'
import { Colors, Drawer } from 'react-native-ui-lib';
import * as Haptics from 'expo-haptics';
import { collection, deleteDoc, doc, getDocs, limit, query, updateDoc, where } from 'firebase/firestore';
import { FB_DB } from '../../firebaseconfig';
import { ColocContext, UserContext } from '../../UserContext';
import ParticipantCard from '../Reusable/ParticipantCard';

// props.tache = tache
const TacheCard = (props) => {
  const [loading, setLoading] = useState(false)
  const[user, setUser] = useContext(UserContext)
  const [coloc, setColoc] = useContext(ColocContext)
  const next = coloc.find(u => u.uuid === props.tache.nextOne)
  if(!next){
    return
  }
  //Gestion de la BottomSheet pour l'affiche des informations d'une tâche
  const bottomSheetModalRef = useRef(null);

  const handlePresentPress = () => {
    bottomSheetModalRef.current?.present();
  };

  const handleDismissPress = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  var [ isPress, setIsPress ] = useState(<Valider width={25} height={15} color='white'/>);

 
  function handlePress() { 
    setIsPress(<TouchableOpacity onPress={() => {Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success), handleDone(); setIsPress(<Valider width={25} height={15} color='white'/>)}} style={styles.ButtonConfirm}><Text style={styles.confirmer}> Confirmer </Text></TouchableOpacity>);
  }

  const renderDate = (date) => {
    if(!date){return ""}
    else{
      const days = ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.']
      const months = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aout', 'Sept', 'Oct', 'Nov', 'Dec']
      const dayIndex = date.toDate().getDay()
      return(days[dayIndex] + " " + date.toDate().getDate().toString() + " " + months[date.toDate().getMonth()])

    }
  }

  const handleDelete = async () => {
    setLoading(true)
    const q = query(collection(FB_DB, 'Colocs/'+user.colocID+'/Taches'), where('date', '==', props.tache.date), limit(1))
    const data = await getDocs(q)
    const id = data.docs[0].id
    deleteDoc(doc(FB_DB, 'Colocs/'+user.colocID+'/Taches', id))
      .then(() => {
        setLoading(false);
        if(props.onDelete){
          props.onDelete();
        }
      })
      .catch((err) => {
        alert(err.message); 
        setLoading(false)
      });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  }
  const handleDone = async () => {
    const q = query(collection(FB_DB, 'Colocs/'+user.colocID+'/Taches'), where('date', '==', props.tache.date), limit(1))
    const data = await getDocs(q)
    const id = data.docs[0].id
    if(props.tache.recur == '0'){await deleteDoc(doc(FB_DB, "Colocs/" + user.colocID + "/Taches/" + id))}
    else{
     const justDid = props.tache.concerned[0]
     const newConcerned = props.tache.concerned
     newConcerned.splice(0, 1);
     newConcerned.push(justDid)
     const doneDate = props.tache.date.toDate();
     const recur = props.tache.recur
     doneDate.setDate(doneDate.getDate() + Number(recur))
     await updateDoc(doc(FB_DB, "Colocs/" + user.colocID + "/Taches/" + id), {concerned: newConcerned, date: doneDate, nextOne: newConcerned[0]})
  }}

  const renderContent =() => {
    
      if(props.tache.nextOne == user.uuid){
      return(
        <View style={styles.body}>
        <Drawer
        rightItems={loading ? [{text: 'Loading', background: Colors.red30}]:[{text: 'Supprimer', background: Colors.red30, onPress: () => handleDelete()}]}      
        style={styles.drawer}
        >
        <View style={[styles.global, Shadows.shadow]}>
      <TouchableOpacity onPress={handlePresentPress}>
        <View style={styles.container}>
          <View style={styles.top}>
            <Text style={styles.titre}>{props.tache ? props.tache.desc : 'loading...'}</Text>

            <View style={styles.dateContainer}>
              <Horloge width={17} height={17} />
              <Text style={styles.date}>{props.tache ? renderDate(props.tache.date) : 'nodate'}</Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => {Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium), handlePress()}} style={styles.Button}>
                {isPress}
              </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <InfoBottomSheet ref={bottomSheetModalRef} tache ={props.tache} onClose={() => handleDismissPress()} onDelete={handleDelete}/>
    </View>
    </Drawer>
    </View>
      )}
    return (
      <View style={styles.body}>
        <Drawer
        rightItems={loading ? [{text: 'Loading', background: Colors.red30}]:[{text: 'Supprimer', background: Colors.red30, onPress: () => handleDelete()}]}      
        style={styles.drawer}
        >
        <View style={[styles.global, Shadows.shadow]}>
      <TouchableOpacity onPress={handlePresentPress}>
        <View style={styles.container}>
          <View style={styles.top}>
            <Text style={styles.titre}>{props.tache ? props.tache.desc : 'loading...'}</Text>

            <View style={styles.dateContainer}>
              <Horloge width={17} height={17} />
              <Text style={styles.date}>{props.tache ? renderDate(props.tache.date) : 'nodate'}</Text>
            </View>
          </View>

          <Image style={styles.avatar1} source={next ? {uri : next.avatarUrl, cache:'force-cache' } : require('../../assets/images/icon.png')}/>
        </View>
      </TouchableOpacity>
      <InfoBottomSheet ref={bottomSheetModalRef} tache ={props.tache} onClose={() => handleDismissPress()} onDelete={handleDelete}/>
    </View>
    </Drawer>
    </View>
    )
    
  }
  
  return (
    <View>
    {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 12,
    ...Shadows.shadow
  },

  global: {
    backgroundColor: 'white',
    borderRadius: 10,
  },

  container: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
  },

  top: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  titre: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 5,
  },

  dateContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  date: {
    fontSize: 14,
    marginLeft: 5,
  },

  avatar1: {
    width: 45,
    height: 45,
    borderRadius: 50,
    overflow: 'hidden',
    marginLeft: -17,
    zIndex: 1,
  },

  participants: {
    flexDirection: 'row',
  },

  bottomSheet: {
    flex: 1, 
    backgroundColor: 'orange', 
    margin: 16, 
    borderRadius: 35, 
    marginBottom: 16 
 },
 bottomSheetText: {
   fontSize: 20,
   fontWeight: 'bold',
   color: 'white',
   textAlign: 'center',
   marginTop: 12
 },
 confirmer: {
  color: 'white',
  fontSize: 13,
  textAlign: 'center',
  padding: 5
},

ButtonConfirm: {
  backgroundColor: 'blue',
  width: 90,
  height: 34,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10,
  marginRight: 35
},

Button: {
  backgroundColor: 'blue',
  width: 52,
  height: 34,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10,
},
drawer: {
  borderRadius: 10
},
});

export default TacheCard;

