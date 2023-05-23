import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BlueGradient from '../components/Reusable/BlueGradient';
import Header from '../components/Reusable/Header';
import { main } from '../constants/Colors';
import BoutonMiniJeu from '../components/Accueil/BoutonMiniJeux';
import MonSolde from '../components/Accueil/MonSolde';
import TacheCardAccueil from '../components/Accueil/TacheCardAccueil';
import Suggestion from '../components/Accueil/Suggestions';

const AccueilScreen = () => {
  return (
    <View style={styles.container}>
      <Header/>
      <BlueGradient/>
      <StatusBar style="auto" />
      <BoutonMiniJeu/>
      <MonSolde/>
      <TacheCardAccueil/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: main.BgColor,
  },
});

export default AccueilScreen;