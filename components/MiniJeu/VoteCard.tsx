import React, { useContext, useEffect } from 'react'
import { View, Image, StyleSheet, ImageBackground, Text, TouchableOpacity, FlatList } from "react-native";
import { main } from '../../constants/Colors';
import ParticipantCard from '../Reusable/ParticipantCard';




type Props = {
  data:any;
  selectedPlayer: any | null;
  onPress: (int) => void
};


const VoteCard = ({ data, selectedPlayer, onPress}: Props) => {

  
  const renderItem = ({ item }: { item: any }) => {
    const isSelected = selectedPlayer?.player.id === item.player.id;
  
    if(item.alive){
      return (
        <TouchableOpacity style={{marginTop:20}} onPress={() => {onPress(item)}}>
            <ParticipantCard nom={item.player.name} url={item.player.photo} height={95} width={80} selected={isSelected} />
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={ styles.participant_valid}>
            <Image style={styles.AvatarStyle} source={{uri : item.player.photo, cache:'force-cache' }}/>
            <Image source={require('./../../assets/images/Cross.png')} style={{position:'absolute', top:15}}/>
            <Text style={styles.nom} numberOfLines={1}>{item.player.name}</Text>
        </View>
      );
    }
  };
  
  
  

    return (
      <View style={styles.global}>
        <View style={styles.flatlist}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item: PlayerInfo) => item.player.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View style={styles.lign}>
                  <Text style={styles.text}>Qui sort ?</Text>
              </View>
            }
            numColumns={3}
            columnWrapperStyle={{justifyContent:'space-around'}}
          />
        </View>
      </View>
    );
}


const styles = StyleSheet.create({
    global: {
        flex:1,
        borderRadius:10,
    },

    container:{
        flex:1
    },

    lign:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:15,
        paddingBottom:-5,
    },

    text:{
        color: main.TextColor,
        fontWeight: '600',
        fontSize: 20,
    },

    flatlist:{
      borderRadius: 10,
      paddingHorizontal:10,
      backgroundColor:'white',
      paddingBottom:25,
    },

    player: {
      alignItems: 'center',
      margin: 6
    },

    ImageContainer: {
      height: 90,
      width: 90,
      borderRadius: 4
    },

    Image: {
      height: '100%',
      width: '100%',
      borderRadius: 5,
    },

    participant_valid : {
      marginTop:20,
      backgroundColor: 'rgba(214,46,46, .5)',
      borderRadius: 10,
      alignItems: 'center',
      borderWidth: 0,
      borderColor: '#172ACE',
      justifyContent: 'center',
      marginRight: 8,
      padding: 5,
      width:80,
      height:95
    },

    AvatarStyle : {
      opacity:0.4,
      width: 55,
      height: 55,
      borderRadius: 50,
    },

    nom: {
      fontWeight: '600',
      fontSize: 13,
      marginTop: 7,
    },
});

export default VoteCard
