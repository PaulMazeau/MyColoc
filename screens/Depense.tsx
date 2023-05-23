import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { main } from '../constants/Colors';
import Header from '../components/Reusable/Header';
import GameCard from '../components/MiniJeu/GameCard';

export default function DepenseScreen() {
  return (
    <View style={styles.container}>
      <Header/>
      <Text>Ecran Depense!</Text>
      
      
      <View style={{alignItems:'center', height:"35%"}}>
        <GameCard/>
      </View>
      
      
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: main.BgColor,
  },
});
