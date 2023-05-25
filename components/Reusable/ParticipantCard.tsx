import React from "react";
import { Text, StyleSheet,TouchableOpacity,Image, View } from "react-native";

interface ButtonProps {
    text: string;
    colorBackGround: string;
    colorText: string;
    onPress: () => void;
  }

const ParticipantCard = ({ text, colorBackGround, colorText, onPress }: ButtonProps) => {
    const styles = StyleSheet.create({
        global: {
            backgroundColor: colorBackGround,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            height:"100%",
            marginRight:5,
            marginLeft:5,
            width:'20%'
        },
        text: {
            fontWeight: '600',
            fontSize: 20,
            color: colorText
        }
    });

    return (
        <TouchableOpacity onPress={onPress} style={styles.global}>
            <View style={styles2.ImageContainer}>
                <Image source={require('../../assets/images/profilIcon.png')} />
            </View>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles2 = StyleSheet.create({

    ImageContainer: {
        height: 40,
        width:40,
        overflow: 'hidden',
        borderRadius: 20,
        alignItems:'center',
      },

})

export default ParticipantCard;
