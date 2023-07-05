import React from 'react'
import { View, Image, StyleSheet, ImageBackground, Text, TouchableOpacity, FlatList } from "react-native";
import { main } from '../../constants/Colors';
import ParticipantCard from '../Reusable/ParticipantCard';



type Props = {
  selectedPlayers: any[];
  selectedPlayer: any | null;
  onPress: (int) => void
};


const VoteCard = ({selectedPlayers, selectedPlayer, onPress}: Props) => {

  const data = selectedPlayers.map((c) => ({
    ...c // on inclut toutes les propriétés de chaque élément de selectedPlayers
  }));

  
  const renderItem = ({ item }: { item: any }) => {
    const isSelected = selectedPlayer?.player.id === item.player.id;
    return (
        <TouchableOpacity style={{marginTop:20}} onPress={() => {onPress(item)}}>
            <ParticipantCard nom={item.player.name} url={item.player.photo} height={95} width={80} selected={isSelected} />
        </TouchableOpacity>
    );
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
