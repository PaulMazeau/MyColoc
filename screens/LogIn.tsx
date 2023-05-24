import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import BlueGradient from '../components/Reusable/BlueGradient';
import CustomButton from '../components/Reusable/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParams } from '../App';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FB_AUTH } from '../firebaseconfig';

type Props = NativeStackScreenProps<AuthStackParams, 'Login'>;

export default function LoginScreen({navigation}: Props) {
  const handleButtonPress = (message: string) => {
    console.log(message);
  };
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const signIn = async () => {
    try{
        const response = await createUserWithEmailAndPassword(FB_AUTH, email, pwd);
    } catch(error: any){
        alert(error.message)
    }}

  return (
    <View style={styles.container}>
      <StatusBar style="light"/>
      <BlueGradient height={0.6}/>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.PasdeCompte}>S'inscrire</Text>
        </TouchableOpacity>
        <View style={styles.Title}>
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={styles.screenTitle}>Se Connecter</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Adresse Email"
          style={styles.input}
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          autoCapitalize='none'
          keyboardType='email-address'
          autoCorrect={false}
          value = {email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Mot de passe"
          style={styles.input}
          secureTextEntry
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          autoCapitalize='none'
          value={pwd}
          onChangeText={(text) => setPwd(text)}
        />
        <TouchableOpacity onPress={() => handleButtonPress('true')}>
          <Text style={styles.mdpOublie}>Mot de passe oublié?</Text>
        </TouchableOpacity>
      </View>
      <CustomButton title="Se connecter" onPress={() => signIn()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputContainer: {
    position: "absolute",
    width: "90%",
    top: 50,
    zIndex: 1,
    marginHorizontal: '5%'
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 10,
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    fontSize: 19,
    fontWeight: '600',
    color: 'white',
    marginBottom: 15,
  },
  PasdeCompte: {
    color: 'white',
    textAlign: 'right',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 10
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  Title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '10%',
  },
  mdpOublie: {
    color: 'white',
    textDecorationLine: 'underline',
    fontWeight: '500',
    fontSize: 14,
    paddingLeft: 10
  },
});
