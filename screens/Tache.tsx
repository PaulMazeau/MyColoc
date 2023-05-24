import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { main } from '../constants/Colors';
import Header from '../components/Reusable/Header';
import ScreenTitle from '../components/Reusable/ScreenTitle';
import { useState } from 'react';
import SegmentedControlTab from 'react-native-segmented-control-tab';

const TacheScreen = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const handleTabPress = (index: number) => {
    setSelectedTabIndex(index);
    console.log(`Onglet ${index + 1} sélectionné`);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header />
      <ScreenTitle title="Tâche à faire" />
      <View style={styles.segmentedControl}>
        <SegmentedControlTab
          values={['Onglet 1', 'Onglet 2']}
          selectedIndex={selectedTabIndex}
          onTabPress={handleTabPress}
          activeTabStyle={styles.activeTabStyle}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
        />
      </View>
      {selectedTabIndex === 0 ? (
        <Text>Contenu de l'onglet 1</Text>
      ) : (
        <Text>Contenu de l'onglet 2</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: main.BgColor,
  },
  segmentedControl: {
    marginTop: 20,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  activeTabStyle: {
    backgroundColor: '#007AFF',
    borderWidth: 0,
  },
  tabStyle: {
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  tabTextStyle: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default TacheScreen;
