import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, ImageBackground} from 'react-native';
import { main } from '../constants/Colors';
import Header from '../components/Reusable/Header';
import { TouchableOpacity } from 'react-native-gesture-handler';

const windowHeight = Dimensions.get('window').height
const image = require('../img/homepage_bg.png')
export default function LoginSignupScreen() {
  return (

    <View style={styles.container}>
         <ImageBackground source={image} resizeMode="cover" style={styles.bluebg} imageStyle={{borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}></ImageBackground>
         <View style={styles.buttonContainer}>
         <TouchableOpacity
        //   onPress={handleLogin}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity
        //   onPress={handleSignup}
          style={styles.button}
        >
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>
      
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: main.BgColor,
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: windowHeight*0.1,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#172ace',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#172ace',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: 'white',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 10,
  },
  bluebg: {
    width: 'auto',
    backgroundColor: '#172ACE',
    height: windowHeight * 0.7 ,
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
},
});
