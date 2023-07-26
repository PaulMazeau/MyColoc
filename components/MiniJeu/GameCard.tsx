import React from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import Button from "../Reusable/ButtonColor";
import Score from './Score';
import { LinearGradient }  from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MiniJeuStackParams } from "../Navigation/MiniJeuStack";

const windowWidth = Dimensions.get('window').width;


interface GameCardProps {
  gameTitle: string;
  backgroundImageSource: any;
  colorGradient1: string;
  colorGradient2: string;
  scoreUser:number;
  screen:string;
}

const GameCard: React.FC<GameCardProps> = ({ gameTitle, backgroundImageSource, colorGradient1, colorGradient2, scoreUser, screen }) => {
  const navigation = useNavigation<NativeStackNavigationProp<MiniJeuStackParams>>();
  return (
    <View>
      <LinearGradient colors={[colorGradient1, colorGradient2]} style={styles.linearGradient}>
        <View style={styles.container}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.text}>{gameTitle}</Text>
            {scoreUser==null?
             <View/>
            :
              <Score score={scoreUser} color={"white"}/>
            }
          </View>
          
          <ImageBackground source={backgroundImageSource} resizeMode="contain">
            <View style={styles.imageBackgrond}>
              <View style={styles.button}>
                  <Button text={'Jouer'} colorBackGround={"white"} colorText={colorGradient1} onPress={() => navigation.navigate(screen)}/>
              </View>
            </View>
          </ImageBackground>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
    
  linearGradient: {
    borderRadius: 10,
    width: "80%",
    height:"100%",
    marginHorizontal:'10%',
    overflow:'hidden'
  },
  container: {
    width: '100%',
    height: '100%',
    padding: 15
  },
  text: {
    color: "white",
    fontWeight: '600',
    fontSize: 22,
  },
  imageBackgrond: {
    height: '100%',
    justifyContent: 'flex-end',
  },
  button:{
    height:"17%",
    justifyContent:'flex-end',
    marginBottom:30
  }
});

export default GameCard;
