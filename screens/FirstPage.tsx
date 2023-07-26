import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BlueGradient from '../components/Reusable/BlueGradient'
import Button from '../components/Reusable/ButtonColor'
import CustomButton from '../components/Reusable/Button'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackParams } from '../components/Navigation/AuthStack'
import * as Haptics from 'expo-haptics';
import { StatusBar } from 'expo-status-bar'

type Props = NativeStackScreenProps<AuthStackParams, 'FirstPage'>;
const Logo = require('../assets/images/Icon_Blanc.png');

const FirstPage = ({navigation}: Props) => {
  return (
    <View>
      <StatusBar style="light"/>
      <BlueGradient height={0.6}/>
        <View style={styles.appartementContainer}>
          <Image source={Logo} style={styles.AppartementImage}/>
          <Text style={styles.title}>Bievenue sur MyColoc</Text>
          <Text style={styles.subTitle}>Fini les frictions entre colocataires!</Text>
        </View>

          <CustomButton 
          title="Tu n'as pas encore de colocation" 
          onPress={() => {Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}}
          gradientColors={['#7700FF', '#4F3CFF']}
          gradientDirection={{ start: { x: 1, y: 1 }, end: { x: 0.8, y: 0 } }}
          url="https://www.coloc.fr"
        />
          <CustomButton 
            title={'S\'inscrire'}  
            onPress={() => {Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);navigation.navigate('SignUp')}}
            gradientColors={['#7700FF', '#4F3CFF']}
            gradientDirection={{ start: { x: 1, y: 1 }, end: { x: 0.8, y: 0 } }}
          />
          <CustomButton 
            title={'Se connecter'} 
            backgroundColor='#172ACE00' 
            borderColor={'#172ACE'} 
            borderWidth={2} 
            color='#172ACE'
            onPress={() => {Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);navigation.navigate('Login')}}
          />
    </View>
  )
}

const styles = StyleSheet.create({
  appartementContainer: {
    position: "absolute",
    top: "25%",
    width: "100%",
    zIndex: 1,
    alignItems: 'center',
  },
  AppartementImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 28,
},
subTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
},

})


export default FirstPage