import React, { useState, useEffect, useContext } from 'react'
import { View, Image, StyleSheet, ImageBackground, Text, TouchableOpacity, FlatList } from "react-native";
import { main } from '../../constants/Colors';
import Button from '../Reusable/ButtonColor';
import ParticipantCard from '../Reusable/ParticipantCard';
import { ColocContext, UserContext } from '../../UserContext';

// Définition du type de données
interface Player {
    id: string;
    name: string;
    photo: any;
}

type Props = {
  selectedPlayers: Player[];
  setSelectedPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
};


const PlayersCard = ({selectedPlayers, setSelectedPlayers}: Props) => {
    const [coloc, setColoc] = useContext(ColocContext);

    // Convert coloc data to the correct format
    const data = coloc.map((c, index) => ({
        id: index.toString(),
        name: c.nom,
        photo: c.avatarUrl,
    }));

    const handlePress = (player) => {

      if (selectedPlayers.find(p => p.id === player.id)) {
          setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
      } else {
          setSelectedPlayers([...selectedPlayers, player]);
      }
    };
  
  const renderItem = ({ item }: { item: Player }) => (
      <TouchableOpacity style={{marginTop:20}} onPress={() => handlePress(item)}>
          <ParticipantCard nom={item.name} url={item.photo} height={95} width={80} selected={selectedPlayers.find(p => p.id === item.id)}/>
      </TouchableOpacity>
  );
  

    return (
      <View style={styles.global}>
        <View style={styles.flatlist}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item: Player) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View style={styles.lign}>
                  <Text style={styles.text}>Qui joue ?</Text>
                  <Button text='Commencer' colorBackGround='#62C435' colorText='white' onPress={() => {}} height={40}/>
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
        marginBottom:20
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
      paddingBottom:15
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
});

export default PlayersCard
