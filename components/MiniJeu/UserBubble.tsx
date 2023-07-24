import React from "react";
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { MiniJeuColor } from "../../constants/Colors";

interface UserProps {
  name?: string;
  userImage?: ImageSourcePropType;
  size?: number;
}

const UserBubble: React.FC<UserProps> = ({ name, userImage, size }) => {
  const imageContainerStyle = {
    height: size,
    width: size,
  };

  return (
    <View style={styles.global}>
      <View style={[styles.ImageContainer, imageContainerStyle]}>
        <Image source={userImage} style={styles.Image}/>
      </View>
      <Text style={{color: 'white', marginTop: 8}}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  global: {
    flexDirection:'column', 
    alignItems:'center',
    justifyContent:'center',
    paddingBottom:5,
    marginHorizontal:20,
  },

  firstColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  text1: {
    color: "white",
    fontWeight: '600',
    fontSize: 16,
  },

  ImageContainer: {
    overflow: 'hidden',
    borderRadius:50
  },

  Image: {
    height: '100%',
    width: '100%',
  },
})

export default UserBubble;
