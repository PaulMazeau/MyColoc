import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { main } from '../constants/Colors';

const AccueilScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Bienvenue sur Notre App</Text>
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