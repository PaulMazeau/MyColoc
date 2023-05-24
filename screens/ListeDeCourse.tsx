import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParams } from '../App';
import BackButton from '../components/Reusable/BackButton';
import CourseCard from '../components/Course/CourseCard';
import Header from '../components/Reusable/Header';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { CheckBox } from 'react-native-elements';
import React, { useState } from 'react';

// Définition du type des propriétés pour le composant ListeDeCourseScreen
type Props = NativeStackScreenProps<RootStackParams, 'ListeDeCourse'>;

interface Item {
  key: string;
  label: string;
  selected: boolean;
}

const ListeDeCourseScreen = ({route, navigation}: Props) => {
  const [data, setData] = useState<Item[]>([
    { key: '1', label: 'Cookie', selected: false },
    { key: '2', label: 'Taboulet', selected: false },
    { key: '3', label: 'Ratio', selected: false },
  ]);

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Item>) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          height: 50,
          backgroundColor: isActive ? 'blue' : 'white',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
        onLongPress={drag}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <CheckBox
            checked={item.selected}
            onPress={() => {
              if (!isActive) { // on ne change l'état que si l'élément n'est pas en cours de glissement
                const newData = data.map((dataItem) =>
                  dataItem.key === item.key
                    ? { ...dataItem, selected: !dataItem.selected }
                    : dataItem
                );
                setData(newData);
              }
            }}
          />
          <Text style={{ color: 'black', fontSize: 18 }}>{item.label}</Text> 
        </View>
      </TouchableOpacity>
    );
  };
   

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header/>
      <View style = {styles.Title}>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}  onPress={() => {
      navigation.goBack() }}>
        <BackButton/>
        <Text style={styles.screenTitle}>{route.params.name}</Text>
        </TouchableOpacity>
      </View>
      <DraggableFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => `draggable-item-${item.key}`}
        onDragEnd={({ data }) => setData(data)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  Title: {
    flexDirection : 'row', 
    marginBottom : 15,
    marginTop: 10
  },
});

export default ListeDeCourseScreen;
