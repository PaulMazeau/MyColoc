import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import BlueGradient from '../components/Reusable/BlueGradient';
import CustomButton from '../components/Reusable/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParams } from '../App';
import { StatusBar } from 'expo-status-bar';
import { useContext, useState } from 'react';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { FB_AUTH, FB_DB } from '../firebaseconfig';
import {setDoc, doc, collection, getDoc} from 'firebase/firestore'
import { UserContext } from '../UserContext';

type Props = NativeStackScreenProps<AuthStackParams, 'SignUp'>;

export default function SignUpScreen({navigation}: Props) {
  const handleButtonPress = (message: string) => {
    console.log(message);
  };
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [username, setUsername] = useState('');
  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const signUp = async () => {
    if(username==""){
        alert("Rentre un nom d'utilisateur !");
        return
    }
    setLoading(true)
    createUserWithEmailAndPassword(FB_AUTH, email, pwd).then(function(userCred) {
        // get user data from the auth trigger
        const userUid = userCred.user.uid; // The UID of the user.
        // set account  doc  
        const entry = {
          nom: username,
          uuid: userUid,
          solde: 0,
          colocID: "0",
          // avatarUrl: avatarUrl
        }
        setDoc(doc(FB_DB, 'Users', userUid),entry).then(() => {setUser(username);
        setLoading(false)}); 
      }).catch(error => alert(error.message));
    
}
  return (
    <View style={styles.container}>
      <StatusBar style="light"/>
      <BlueGradient height={0.6}/>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.PasdeCompte}>Se connecter</Text>
        </TouchableOpacity>
        <View style={styles.Title}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => handleButtonPress('prout')}>
            <Text style={styles.screenTitle}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Nom d'utilisateur"
          style={styles.input}
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          autoCapitalize='none'
          keyboardType='email-address'
          autoCorrect={false}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          placeholder="Adresse Email"
          style={styles.input}
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          autoCapitalize='none'
          keyboardType='email-address'
          autoCorrect={false}
          value={email}
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
      {loading ? <ActivityIndicator size='large' /> : <CustomButton title="S'inscrire" onPress={() => signUp()} />}
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
