import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { main } from '../constants/Colors';
import Header from '../components/Reusable/Header';
import React, { useState } from 'react';
import ScreenTitle from '../components/Reusable/ScreenTitle';
import Equilibrage from '../components/Depense/Equilibrage';


export default function DepenseScreen() {

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const handleTabPress = (index: number) => {
    setSelectedTabIndex(index);
    console.log(`Onglet ${index + 1} sélectionné`);
  };
  
  return (
    <View style={styles.container}>
      <Header/>
      <ScreenTitle title="Gestion des dépenses"/>
      <View style={styles.segmentedControl}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTabIndex === 0 && styles.activeTabButton,
          ]}
          onPress={() => handleTabPress(0)}
        >
          <Text
            style={[
              styles.tabButtonText,
              selectedTabIndex === 0 && styles.activeTabButtonText,
            ]}
          >
            Equilibrage dépenses
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTabIndex === 1 && styles.activeTabButton,
          ]}
          onPress={() => handleTabPress(1)}
        >
          <Text
            style={[
              styles.tabButtonText,
              selectedTabIndex === 1 && styles.activeTabButtonText,
            ]}
          >
            Dépenses générales
          </Text>
        </TouchableOpacity>
      </View>
      {selectedTabIndex === 0 ? (
        <Equilibrage />
      ) : (
        <Text>SousProut</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: main.BgColor,
  },
  segmentedControl: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: 'white',
  },

  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    margin: 4
  },

  activeTabButton: {
    backgroundColor: '#3661F6',
    borderRadius: 4,
  },
  tabButtonText: {
    color: '#8E8E93',
    fontWeight: 'bold',
    fontSize: 12,
  },
  activeTabButtonText: {
    color: 'white',

  },
});
