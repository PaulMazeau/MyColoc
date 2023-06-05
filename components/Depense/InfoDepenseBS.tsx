import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import ParticipantCard from '../Reusable/ParticipantCard';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import Cross from '../../assets/icons/cross.svg'


const InfoDepenseBS = React.forwardRef<BottomSheetModalMethods, {}>((props, ref) => {
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

  const CustomBackgroundComponent = () => <View />;

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
            <Text style={styles.bottomSheetTitle}>Pizza</Text>
            <TouchableOpacity style={styles.cross} onPress={() => console.log('prout')}>
            <Cross />
            </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.freqtitle}>
            Payé le: <Text style={styles.text}>12 janvier</Text>
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.freqtitle}>
            Montant: <Text style={styles.text}>255€</Text>
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.freqtitle}>
            Payé par: <Text style={styles.text}>Aya</Text>
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Payé pour:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>
              <ParticipantCard />
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

export default InfoDepenseBS;
