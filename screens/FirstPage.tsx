import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BlueGradient from '../components/Reusable/BlueGradient'
import Button from '../components/Reusable/ButtonColor'
import CustomButton from '../components/Reusable/Button'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackParams } from '../App'

type Props = NativeStackScreenProps<AuthStackParams, 'FirstPage'>;

const FirstPage = ({navigation}: Props) => {
  return (
    <View>
      <BlueGradient height={0.6}/>
      <CustomButton 
        title={'S\'inscrire'}  
        onPress={() => navigation.navigate('SignUp')}
       />
      <CustomButton 
        title={'Se connecter'} 
        backgroundColor='#172ACE00' 
        borderColor={'#172ACE'} 
        borderWidth={2} 
        color='#172ACE'
        onPress={() => navigation.navigate('Login')}
       />
    </View>
  )
}

const styles = StyleSheet.create({})


export default FirstPage