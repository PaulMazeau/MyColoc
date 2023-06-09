import React, { useContext, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { Shadows } from '../../constants/Shadow';
import { ColocContext } from '../../UserContext';
import { Colors, Drawer } from 'react-native-ui-lib';
import InfoDepenseBS from './InfoDepenseBS';
import * as Haptics from 'expo-haptics';
//props.transac est la transac a render
const TransactionCard = (props) => {
  const [coloc, setColoc] = useContext(ColocContext);
  const giver = coloc.find(u => u.uuid === props.transac.giverID)
  //Gestion de la BottomSheet pour l'affiche des informations d'une tâche
const bottomSheetModalRef = useRef(null);

const handlePresentPress = () => {
  bottomSheetModalRef.current?.present();
};

const handleDismissPress = () => {
  bottomSheetModalRef.current?.dismiss();
};

const handleDelete = async () => {
  //await deleteDoc(doc(db, "Colocs/"+clcID+"/Courses", courseID)); -> ancien code
  console.log('delete')
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
}

  //Permet d'animer les ombres en fadeIn
  const opacity = useRef(new Animated.Value(0)).current;  
  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  React.useEffect(() => {
    fadeIn();
  }, []);

  const renderContent = () => {
      return (
        <View style={styles.textContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.title}>{props.transac.desc}</Text>
            <View style={styles.payeeContainer}>
              <Text style={styles.subtitle}>Payé par {giver ? giver.nom : 'Un ancien membre'}</Text>
            </View>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{props.transac.amount.toFixed(2) + '€'}</Text>
          </View>
          <InfoDepenseBS ref={bottomSheetModalRef} onClose={() => handleDismissPress()}/>
        </View>
      );
  };

  return (
    
    <View>
      <Animated.View style={[styles.body, { opacity }]}>
      <Drawer
        rightItems={[{text: 'Supprimer', background: Colors.red30, onPress: () => handleDelete()}]}      
        style={styles.drawer}
        >
      <View style={styles.global}>
    <TouchableOpacity style={{flex: 1}} onPress={handlePresentPress}>
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={giver ? {uri: giver.avatarUrl, cache:'force-cache'} : require('../../assets/images/icon.png')} style={styles.image} />
      </View>
      {renderContent()}
    </View>
    </TouchableOpacity>
    </View>
    </Drawer>
    </Animated.View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  body: {
    ...Shadows.shadow,
    backgroundColor: 'white',
    width: '90%',
    marginHorizontal: '5%',
    borderRadius: 10,
    marginBottom: 12
},
global: {
  backgroundColor: 'white',
  borderRadius: 10,
},
container: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 15,
  height: 60,
  borderRadius: 10,
},
  imageContainer: {
    height: 40,
    width: 40,
    overflow: 'hidden',
    borderRadius: 7,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 10,
  },
  rightContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 10,
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 19,
  },
  subtitle: {
    fontSize: 14,
  },
  payeeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  drawer: {
    borderRadius: 10
  },
});

export default TransactionCard;
