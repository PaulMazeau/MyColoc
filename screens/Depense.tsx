import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { main } from '../constants/Colors';

export default function DepenseScreen() {
  return (
    <View style={styles.container}>
      <Text>Ecran Depense!</Text>
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
