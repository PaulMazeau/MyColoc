import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Horloge from '../../assets/icons/Horloge.svg';
import { Shadows } from '../../constants/Shadow';
import InfoBottomSheet from '../Reusable/InfoBottomSheet';
import Valider from '../../assets/icons/Valider'

// props.tache = tache
const TacheCard = (props) => {

  //Gestion de la BottomSheet pour l'affiche des informations d'une tâche
  const bottomSheetModalRef = useRef(null);

  const handlePresentPress = () => {
    bottomSheetModalRef.current?.present();
  };

  var [ isPress, setIsPress ] = useState(<Valider width={25} height={15} color='white'/>);

  function handleDone() { 
    console.log('Done')
  }

  function handlePress() { 
    setIsPress(<TouchableOpacity onPress={() => {handleDone(); setIsPress(<Valider width={25} height={15} color='white'/>)}} style={styles.ButtonConfirm}><Text style={styles.confirmer}> Confirmer </Text></TouchableOpacity>);
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

  const renderContent =() => {
    const test = true
    if(test){
      return(
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

          <TouchableOpacity onPress={() => {handlePress()}} style={styles.Button}>
                {isPress}
              </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <InfoBottomSheet ref={bottomSheetModalRef} />
    </View>
      )
    }
    return (
      <View style={[styles.global, Shadows.shadow]}>
      <TouchableOpacity onPress={handlePresentPress}>
        <View style={styles.container}>
          <View style={styles.top}>
            <Text style={styles.titre}>{props.desc}</Text>

            <View style={styles.dateContainer}>
              <Horloge width={17} height={17} />
              <Text style={styles.date}>Ven. 23</Text>
            </View>
          </View>

          <View style={styles.participants}>
            <Image style={styles.avatar1} source={require('../../assets/images/icon.png')} />
          </View>
        </View>
      </TouchableOpacity>
      <InfoBottomSheet ref={bottomSheetModalRef} />
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
  global: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 12,
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

});

export default TacheCard;

