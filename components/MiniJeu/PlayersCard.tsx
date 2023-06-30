import React from 'react'
import { View, Image, StyleSheet, ImageBackground, Text, TouchableOpacity, FlatList } from "react-native";
import { main } from '../../constants/Colors';
import Button from '../Reusable/ButtonColor';
import ParticipantCard from '../Reusable/ParticipantCard';

// Définition du type de données
interface Player {
    id: string;
    name: string;
    photo: any;
}

//Render d'un joueur dans la flatlist
const Item = ({ name, photo }) => (
  <ParticipantCard name={name}/>
);

const PlayersCard = () => {
    // ici je prends des données fictives, remplacez-les par vos vraies données
    const players = [
        { id: '1', name: 'Joueur 1', photo: 'https://example.com/photo1.png' },
        { id: '2', name: 'Joueur 2', photo: 'https://example.com/photo2.png' },
        { id: '1', name: 'Joueur 1', photo: 'https://example.com/photo1.png' },
        { id: '2', name: 'Joueur 2', photo: 'https://example.com/photo2.png' },
        { id: '1', name: 'Joueur 1', photo: 'https://example.com/photo1.png' },
        { id: '2', name: 'Joueur 2', photo: 'https://example.com/photo2.png' },
        { id: '1', name: 'Joueur 1', photo: 'https://example.com/photo1.png' },
        { id: '2', name: 'Joueur 2', photo: 'https://example.com/photo2.png' },
        { id: '2', name: 'Joueur 2', photo: 'https://example.com/photo2.png' },
        { id: '1', name: 'Joueur 1', photo: 'https://example.com/photo1.png' },
        { id: '2', name: 'Joueur 2', photo: 'https://example.com/photo2.png' },
        { id: '1', name: 'Joueur 1', photo: 'https://example.com/photo1.png' },
        { id: '2', name: 'Joueur 2', photo: 'https://example.com/photo2.png' },
        { id: '1', name: 'Joueur 1', photo: 'https://example.com/photo1.png' },
        { id: '2', name: 'Joueur 2', photo: 'https://example.com/photo2.png' },
        // ...
    ];

    const renderItem = ({ item }: { item: Player }) => (
        <Item name={item.name} photo={item.photo} />
    );

    return (
      <View style={styles.global}>
            <View style={styles.flatlist}>
            <FlatList
                data={players}
                renderItem={renderItem}
                keyExtractor={(item: Player, index) => item.id + item.name + index}
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
