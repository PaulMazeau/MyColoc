import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BlueGradient from '../components/Reusable/BlueGradient';

const windowHeight = Dimensions.get('window').height;

export default function LoginScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <BlueGradient height={0.6}/>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={() => console.log('prout')}>
          <Text style={styles.PasdeCompte}>S'inscrire</Text>
        </TouchableOpacity>
        <View style={styles.Title}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => console.log('prout')}>
            <Text style={styles.screenTitle}>Se Connecter</Text>
          </TouchableOpacity>
        </View>
        
          <TextInput
            placeholder="Adresse Email"
            onChangeText={text => console.log('true')}
            style={styles.input}
            placeholderTextColor="rgba(255, 255, 255, 0.8)"
            autoCapitalize='none'
            keyboardType='email-address'
            autoCorrect={false}
          />
          <TextInput
            placeholder="Mot de passe"
            onChangeText={text => console.log('true')}
            style={styles.input}
            secureTextEntry
            placeholderTextColor="rgba(255, 255, 255, 0.8)"
            autoCapitalize='none'
          />
       
        <TouchableOpacity onPress={() => console.log('true')}>
          <Text style={styles.mdpOublie}>Mot de passe oublié?</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  safeAreaView: {
    flex: 1,
  },
  inputContainer: {
    position: "absolute",
    width: "100%",
    top: 0,
    zIndex: 1,
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
    marginTop: '10%'
  },
  mdpOublie: {
    color: 'white',
    textDecorationLine: 'underline',
    fontWeight: '500',
    fontSize: 14,
    paddingLeft: 10
  },
});
