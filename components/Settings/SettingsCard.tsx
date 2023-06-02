import { StyleSheet, Text, TouchableOpacity, View, Image, ImageSourcePropType } from 'react-native'
import React from 'react'

interface SettingsCardProps {
  title: string;
  subtitle?: string; //prop conditonnel
  onPress: () => void;
  avatar?: ImageSourcePropType; //prop conditonnel
}

export default function SettingsCard({ title, subtitle, onPress, avatar }: SettingsCardProps) {
    return (
      <View>
        <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
          <View style={[styles.Setting, {marginTop:1}]}>
              <Text style={styles.name}>{title}</Text>
              {subtitle && (
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Text style={styles.support}>{subtitle}</Text>
                </View>
              )}
              {avatar && (
                 <View style={{flexDirection:'row', alignItems:'center'}}>
                 <Image style={styles.avatar} source={avatar} />
               </View>
              )}
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  

const styles = StyleSheet.create({
    name:{
        fontWeight: '700',
    },
    Setting: {
        backgroundColor: "white",
        paddingLeft: 15,
        paddingRight:15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        marginBottom: 10,
        marginTop: 10
    },
    support:{
        fontWeight: '400',
        fontSize:17,
        color:'black',
        marginLeft:10,
        textDecorationLine: 'underline'
    },
    avatar: {
      width: 32,
      height: 32,
      borderRadius: 25,
  },
})
