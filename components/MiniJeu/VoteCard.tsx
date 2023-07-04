import React, { useState, useEffect, useContext } from 'react'
import { View, Image, StyleSheet, ImageBackground, Text, TouchableOpacity, FlatList } from "react-native";
import { main } from '../../constants/Colors';
import Button from '../Reusable/ButtonColor';
import ParticipantCard from '../Reusable/ParticipantCard';
import { ColocContext, UserContext } from '../../UserContext';
import AddButton from '../../assets/icons/AddButtonGrey.svg';

// Définition du type de données
interface Player {
    id: string;
    name: string;
    photo: any;
}

type Props = {
  selectedPlayers: Player[];
  setSelectedPlayers?: React.Dispatch<React.SetStateAction<Player[]>>;
  onPress: () => void
};


const VoteCard = ({selectedPlayers, setSelectedPlayers, onPress}: Props) => {
    const [coloc, setColoc] = useContext(ColocContext);

    const data = coloc.map((c, index) => ({
        id: index.toString(),
        name: c.nom,
        photo: c.avatarUrl,
    }));

    //Permet de reveler le bouton addPlayer
    // data.push({
    //   id: "buttonAdd",
    // });

    const handlePress = (player) => {
      if (player.id === "buttonAdd") return;
      if (selectedPlayers.find(p => p.id === player.id)) {
          setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
      } else {
          setSelectedPlayers([...selectedPlayers, player]);
      }
    };
  
    const renderItem = ({ item }: { item: Player }) => {
      if (item.id === "buttonAdd") {
          return (
            <TouchableOpacity>
              <AddButton style={{marginTop:30}}/>
            </TouchableOpacity>
          );
      }
      return (
          <TouchableOpacity style={{marginTop:20}} onPress={() => handlePress(item)}>
              <ParticipantCard nom={item.name} url={item.photo} height={95} width={80} selected={selectedPlayers.find(p => p.id === item.id)}/>
          </TouchableOpacity>
      );
  };
  
  

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

export default VoteCard
