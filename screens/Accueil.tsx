import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BlueGradient from '../components/Reusable/BlueGradient';
import Header from '../components/Reusable/Header';
import { main } from '../constants/Colors';
import GameCard from '../components/GameCard'

const AccueilScreen = () => {
  return (
    <View style={styles.container}>
      <Header/>
      <BlueGradient/>
      <StatusBar style="auto" />
<<<<<<< main
      <Text>Bienvenue sur Notre App</Text>
>>>>>>> Ariel
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