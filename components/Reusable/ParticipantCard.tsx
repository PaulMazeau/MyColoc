import React, { useState } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


//props est name du frelon + url de sa pfp
//props.nom et props.url
//width et height optionel
const ParticipantCard = ({ width = 64, height = 80, ...props }) => {
  const [selected, setSelected] = useState(null);
  
  const customStyle = {
    width,
    height,
  };

  const avatarStyle ={
    width: (width==64)? 40:55,
    height: (height==80)? 40:55,
    borderRadius: 50,
  }

  return (
    <View>
      <TouchableOpacity onPress={() => {props.onPress; setSelected(!selected);}}>
        <View style={[props.selected ? styles.participant_valid : styles.participant_invalid, customStyle]}>
            <Image style={avatarStyle} source={props.url ? {uri : props.url, cache:'force-cache' } : require('../../assets/images/icon.png')}/>
            <Text style={styles.nom} numberOfLines={1}>{props.nom ? props.nom : 'Nom par défaut'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  nom: {
    fontWeight: '600',
    fontSize: 13,
    marginTop: 7,
  },


  participant_invalid : {
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    justifyContent: 'center',
    marginRight: 8,
    padding: 5
  },
  participant_valid : {
    backgroundColor: 'rgba(237,240,250, .5)',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#172ACE',
    justifyContent: 'center',
    marginRight: 8,
    padding: 5
  },
  
});

export default ParticipantCard;