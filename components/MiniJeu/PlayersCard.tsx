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



const PlayersCard = () => {
    const [coloc, setColoc] = useContext(ColocContext);

    // Convert coloc data to the correct format
    const data = coloc.map((c, index) => ({
        id: index.toString(),
        name: c.nom,
        photo: c.avatarUrl,
    }));

    const renderItem = ({ item }: { item: Player }) => (
        <View style={{marginBottom:35}}>
            <ParticipantCard nom={item.name} url={item.photo}/>
        </View>
    );

    return (
      <View style={styles.global}>
        <View style={styles.flatlist}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item: Player) => item.id}
            ListHeaderComponent={
              <View style={styles.lign}>
                  <Text style={styles.text}>Qui joue ?</Text>
                  <Button text='Commencer' colorBackGround='#62C435' colorText='white' onPress={() => {}} height={40}/>
              </View>
            }
            numColumns={4}
            columnWrapperStyle={{justifyContent:'space-around'}}
          />
        </View>
      </View>
    );
}


const styles = StyleSheet.create({
    global: {
        flex:1,
        backgroundColor:'white',
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
        padding:15
    },

    text:{
        color: main.TextColor,
        fontWeight: '600',
        fontSize: 20,
    },

    flatlist:{
      borderRadius: 10,
      paddingHorizontal:10
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