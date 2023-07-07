import React, { useState, useEffect, useContext } from 'react'
import { View, Image, StyleSheet, ImageBackground, Text, TouchableOpacity, FlatList } from "react-native";
import { main } from '../../constants/Colors';
import Button from '../Reusable/ButtonColor';
import ParticipantCard from '../Reusable/ParticipantCard';
import { ColocContext, UserContext } from '../../UserContext';
import AddButton from '../../assets/icons/AddButtonGrey.svg';
import { useFocusEffect } from '@react-navigation/native';
import AddPlayerBS from './AddPlayerBS';


// Définition du type de données
interface Player {
    id: string;
    name: string;
    photo: any;
}

type Props = {
  selectedPlayers: Player[];
  setSelectedPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  onPress: () => void
};


const PlayersCard = ({selectedPlayers, setSelectedPlayers, onPress}: Props) => {
    const [coloc, setColoc] = useContext(ColocContext);
    const [extraPlayer, setExtraPlayer] = useState([]);

    const extraData = extraPlayer.map((e, index) => ({ 
        id: e.id,
        name: e.nom,
        photo: e.avatarUrl,
    }));

    const data = coloc.map((c, index) => ({
        id: index.toString(),
        name: c.nom,
        photo: c.avatarUrl,
    }));

    //Permet de reveler le bouton addPlayer
    data.push({
      id: "buttonAdd",
    });

    const players = [...extraData, ...data];


    const handlePress = (player) => {
      if (player.id === "buttonAdd") return;
      if(0 < Number(player.id) && Number(player.id) < 1){
        setExtraPlayer(extraPlayer.filter(p => p.id !== player.id));
        setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
      }
      if (selectedPlayers.find(p => p.id === player.id)) {
          setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
      } else {
          setSelectedPlayers([...selectedPlayers, player]);
      }
      };

     const addPlayer = (player) => {
      console.log(player.name)
      console.log(player.photo)
      const newPlayer = {
        id: Math.random().toString(),
        nom: player.name,
        avatarUrl: player.photo,
        name:player.name,
        photo:player.photo
      };
      setExtraPlayer([...extraPlayer, newPlayer]);
      setSelectedPlayers([...selectedPlayers, newPlayer]);
    };
  
    const renderItem = ({ item }: { item: Player }) => {
      if (item.id === "buttonAdd") {
          return (
            // <TouchableOpacity onPress={addPlayer}>
            //   <AddButton style={{marginTop:30}}/>
            // </TouchableOpacity>
            <AddPlayerBS addPlayer={addPlayer}/>
          );
      }
      return (
          <TouchableOpacity style={{marginTop:20}} onPress={() => handlePress(item)}>
              <ParticipantCard nom={item.name} url={item.photo} height={95} width={80} selected={selectedPlayers.find(p => p.id === item.id)}/>
          </TouchableOpacity>
      );
    };
  
    useFocusEffect(
      React.useCallback(() => {
      }, [])
    );
  

    return (
      <View style={styles.global}>
        <View style={styles.flatlist}>
          <FlatList
            data={players}
            renderItem={renderItem}
            keyExtractor={(item: Player) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View style={styles.lign}>
                  <Text style={styles.text}>Qui joue ?</Text>
                  <Button text='Commencer' colorBackGround='#62C435' colorText='white' onPress={() => {onPress()}} height={40}/>
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
