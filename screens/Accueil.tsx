import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { main } from '../constants/Colors';
import GameCard from '../components/GameCard'

const AccueilScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Bienvenue sur Notre App</Text>
      <GameCard></GameCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: main.BgColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AccueilScreen;