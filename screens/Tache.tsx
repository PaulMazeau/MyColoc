import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { main } from '../constants/Colors';
import Header from '../components/Reusable/Header';
import ScreenTitle from '../components/Reusable/ScreenTitle';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import MesTaches from '../components/Tache/MesTaches';
import GlobalTaches from '../components/Tache/GlobalTaches';

const TacheScreen = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const handleTabPress = (index: number) => {
    setSelectedTabIndex(index);
    console.log(`Onglet ${index + 1} sélectionné`);
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScreenTitle title="Tâche à faire" />
      <View style={styles.segmentedControl}>
        <SegmentedControlTab
          values={['Mes tâches', 'Tâches générales']}
          selectedIndex={selectedTabIndex}
          onTabPress={handleTabPress}
          activeTabStyle={styles.activeTabStyle}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
        />
      </View>
      {selectedTabIndex === 0 ? (
        <MesTaches />
      ) : (
        <GlobalTaches />
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
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 4,
    backgroundColor: 'white',
  },
  activeTabStyle: {
    backgroundColor: '#172ACE',
    borderWidth: 2,
    borderColor: 'white',
  },
  tabStyle: {
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  tabTextStyle: {
    color: '#172ACE',
    fontWeight: 'bold',
  },
});

export default TacheScreen;
