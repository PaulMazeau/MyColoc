import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Horloge from '../../assets/icons/Horloge.svg';
import { Shadows } from '../../constants/Shadow';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import InfoBottomSheet from '../Reusable/InfoBottomSheet';
import Valider from '../../assets/icons/Valider.svg'

const TacheCard = () => {

  //Gestion de la BottomSheet pour l'affiche des informations d'une tâche
  const bottomSheetModalRef = useRef(null);

  const handlePresentPress = () => {
    bottomSheetModalRef.current?.present();
  };

  var [ isPress, setIsPress ] = useState(<Valider/>);

  function handleDone() { 
    console.log('Done')
  }

  function handlePress() { 
    setIsPress(<TouchableOpacity onPress={() => {handleDone(); setIsPress(<Valider/>)}} style={styles.ButtonConfirm}><Text style={styles.confirmer}> Confirmer </Text></TouchableOpacity>);
  }


  const renderContent =() => {
    const test = false
    if(test){
      return(
        <View style={[styles.global, Shadows.shadow]}>
      <TouchableOpacity onPress={handlePresentPress}>
        <View style={styles.container}>
          <View style={styles.top}>
            <Text style={styles.titre}>Course</Text>

            <View style={styles.dateContainer}>
              <Horloge width={17} height={17} />
              <Text style={styles.date}>Ven. 23</Text>
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
            <Text style={styles.titre}>Ménage</Text>

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

