import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { main } from '../constants/Colors';

export default function TacheScreen() {
  return (
    <View style={styles.container}>
      <Text>Ecran Tache!</Text>
      <StatusBar style="auto" />
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
