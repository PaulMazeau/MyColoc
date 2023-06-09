import React, { useCallback, useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import ParticipantCard from './ParticipantCard';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import Cross from '../../assets/icons/cross.svg'
import { ColocContext } from '../../UserContext';

interface InfoTacheBSProps {
  onClose: () => void;
  tache: any;
}
const recurrenceOptions = [
  { label: 'Aucune', value: '0' },
  { label: '1 jour', value: '1' },
  { label: '2 jours', value: '2' },
  { label: '3 jours', value: '3' },
  { label: '1 semaine', value: '7' },
  { label: '2 semaines', value: '14' },
  { label: '1 mois', value: '28' },
];
const renderDate = (date) => {
  if(!date){return ""}
  else{
    const days = ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.']
    const months = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aout', 'Sept', 'Oct', 'Nov', 'Dec']
    const dayIndex = date.toDate().getDay()
    return(days[dayIndex] + " " + date.toDate().getDate().toString() + " " + months[date.toDate().getMonth()])
  }}
const InfoBottomSheet = React.forwardRef<BottomSheetModalMethods, InfoTacheBSProps>((props, ref) => {
    const backdropComponent = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );
  const [coloc, setColoc] = useContext(ColocContext);
  const nextOne = coloc.find(u => u.uuid === props.tache.nextOne)
  const freq = recurrenceOptions.find(rec => rec.value === props.tache.recur)
  const CustomBackgroundComponent = () => <View />;
  const renderParticipant = () => {
    return coloc.map((c) => {
      return(
     
      <ParticipantCard nom={c.nom} url={c.avatarUrl} key={c.uuid} />
      )
  });}
  return (
    <BottomSheetModal
      ref={ref}
      index={1}
      snapPoints={['25%', '55%']}
      backgroundComponent={CustomBackgroundComponent}
      handleComponent={null}
      backdropComponent={backdropComponent}
    >
      <View style={styles.bottomSheet}>
        
        <View style={styles.header}>
            <Text style={styles.bottomSheetTitle}>{props.tache.desc}</Text>
            <TouchableOpacity style={styles.cross} onPress={props.onClose}>
            <Cross />
            </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.freqtitle}>
            Fréquence: <Text style={styles.text}>Tous les {freq.label}</Text>
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Prochain concerné : </Text>
          <View style={styles.card}>                
            <Image source={nextOne.avatarUrl ? {uri : nextOne.avatarUrl, cache:'force-cache'} :require('../../assets/images/icon.png')} style={styles.avatar}/> 
            <View>
              <Text style={styles.text}> {nextOne.nom} </Text>
              <Text style={styles.text}> {renderDate(props.tache.date)} </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Rotation:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>
              {renderParticipant()}
            </ScrollView>
        </View>
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  bottomSheet: {
    flex: 1, 
    backgroundColor: 'white', 
    margin: 16, 
    borderRadius: 35, 
    marginBottom: 16,
    padding: 16,
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 12
  },
  section: {
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
    overflow: 'hidden',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    margin: 1,
    marginLeft: 8
  },
  freqtitle: {
    fontSize: 19,
    fontWeight: '600',
  },
  title: {
    fontSize: 19,
    fontWeight: '600',
    marginBottom: 8,
  },
  cross: {
    height: 24,  
    width: 24,
    position: 'absolute',   
    right: 1 
}
});

export default InfoBottomSheet;
