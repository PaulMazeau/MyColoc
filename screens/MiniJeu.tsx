import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, ImageBackground} from 'react-native';
import { main } from '../constants/Colors';
import Header from '../components/Reusable/Header';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BlueGradient from '../components/Reusable/BlueGradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AccueilStackParams } from '../App';

const windowHeight = Dimensions.get('window').height

export default function MiniJeu() {
  return (

    <View style={styles.container}>
        <Text>Bienvenue sur la page mini jeu</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: main.BgColor,
    justifyContent: 'center',
    alignItems:'center'
  },
});
