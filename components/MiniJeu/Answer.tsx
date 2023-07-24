import React from "react";
import { View, Image, StyleSheet, ImageBackground, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { main } from '../../constants/Colors';
import ClassementCardScrollable from '../../components/MiniJeu/ClassementCard'

const Podium =require('../../assets/images/Podium.png');
const Brick =require('../../assets/images/Brick.png');

//Tableau de scores de la partie AuPlusProche en cours 
const scores = [
    { position: 1, userImage: require('../../assets/images/profilIcon2.png'), name:"Marie", score:10 },
    { position: 2, userImage: require('../../assets/images/profilIcon2.png'), name:"Marie", score:10 },
    { position: 3, userImage: require('../../assets/images/profilIcon2.png'), name:"Marie", score:10 },
    { position: 4, userImage: require('../../assets/images/profilIcon2.png'), name:"Marie", score:10 },
    { position: 5, userImage: require('../../assets/images/profilIcon2.png'), name:"Marie", score:10 },
    { position: 6, userImage: require('../../assets/images/profilIcon2.png'), name:"Marie", score:10 },
    { position: 7, userImage: require('../../assets/images/profilIcon2.png'), name:"Marie", score:10 },
    { position: 8, userImage: require('../../assets/images/profilIcon2.png'), name:"Marie", score:10 },
];

const Answer  = ({reponse, timeLeft, goodAnswer, lastQuestion}) => {
  
    return (
        <SafeAreaView style={styles.global} >
      <View style={{width:'100%', flex:1, alignItems:'center'}}>
            <View style={styles.podium}>
                <ImageBackground 
                source={Podium} 
                resizeMode="stretch"
                style={styles.podiumImage}
                >   
                    <Text style={styles.text1}>La bonne</Text>
                    <Text style={styles.text2}>réponse est</Text>
                    <Text style={styles.text3}>{reponse}</Text>
                    {goodAnswer ?  <Text style={styles.text5}>Tu as vu juste !</Text> : <Text style={styles.text5}>Tu as pas vu juste !</Text>}
                </ImageBackground>
            </View>
            <View style={styles.brick}>
                <ImageBackground 
                source={Brick} 
                resizeMode="stretch"
                style={styles.brickImage}
                >
                    {lastQuestion ? <Text style={styles.text4}>Les résultats s'afficheront dans {timeLeft}secondes</Text> :<><Text style={styles.text4}>Prochaine question dans</Text>
                    <Text style={styles.text5}>{timeLeft}s</Text></>}
                </ImageBackground>
            </View>
      </View>
      </SafeAreaView>
    )
  
}

const styles = StyleSheet.create({
    global: {
        flex:1,
        width:'100%',
        alignItems:'center',

    },

    classement:{
        height:'40%',
        paddingBottom:20,
        paddingTop:30,
    },

    podium:{
        marginTop:20,
        width:"80%",
        height:"20%"
    },

    podiumImage:{
        height:'100%',
        width:'100%',
        justifyContent:'space-between',
        alignItems:'center',
    },

    brick:{
        width:"80%",
        height:"15%",
        marginTop:10
    },

    brickImage:{
        height:'100%',
        width:'100%',
        justifyContent:'space-between',
        alignItems:'center',
    },

    inputContainer:{
        width:'90%',
        height:'20%',
        backgroundColor:main.BgColor,
        borderRadius:10,
        marginTop:15
    },

    textInput:{
        backgroundColor:'rgba(237, 240, 250, 0.85)',
        borderRadius:10,
        padding:10,
        alignItems:'flex-start',
        flex:1,
        marginLeft:8,
        fontSize :17
    },

    text1: {
        color: main.LightWhite,
        fontWeight: '600',
        fontSize: 20,
        marginTop:5
    },

    text2: {
        color: main.LightWhite,
        fontWeight: '600',
        fontSize: 27,
    },

    text3: {
        color: main.LightWhite,
        fontWeight: '600',
        fontSize: 40,
        marginBottom:10
    },

    text4: {
        color: main.LightWhite,
        fontWeight: '600',
        fontSize: 20,
        marginTop:20
    },

    text5: {
        color: main.LightWhite,
        fontWeight: '600',
        fontSize: 40,
        marginBottom:10
    },

    imageBackground: {
        flex: 1,             
        width: '100%',       
        justifyContent: 'center',
        alignItems: 'center',
    },

    Logo:{
        margin:10
    },

    Image:{
        width:350,
        height:300,
    },

    Button:{
        width:'90%',
        marginTop:20
    },

    Lign:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        paddingLeft:20,
        paddingRight:20,
        marginTop:20
    }
});

export default Answer