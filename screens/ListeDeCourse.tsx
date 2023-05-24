import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RootStackParams } from '../App';
import BackButton from '../components/Reusable/BackButton';
import Header from '../components/Reusable/Header';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { CheckBox } from 'react-native-elements';
import React, { useState } from 'react';
import { main } from '../constants/Colors';

type Props = NativeStackScreenProps<RootStackParams, 'ListeDeCourse'>;

interface Item {
  key: string;
  label: string;
  selected: boolean;
  isInput?: boolean;
}

const ListeDeCourseScreen = ({route, navigation}: Props) => {
  const [data, setData] = useState<Item[]>([
    { key: '1', label: 'Cookie', selected: false },
    { key: '2', label: 'Taboulet', selected: false },
    { key: '3', label: 'Ratio', selected: false },
    { key: 'input', label: '', selected: false, isInput: true },
  ]);

  const handleItemSelectionToggle = (item: Item, isActive: boolean) => {
    if (!isActive) {
      const newData = data.map((dataItem) =>
        dataItem.key === item.key
          ? { ...dataItem, selected: !dataItem.selected }
          : dataItem
      );
      setData(newData);
    }
  }

  const handleItemSubmission = (event: any) => {
    const newItem: Item = { key: `${data.length}`, label: event.nativeEvent.text, selected: false };
    setData(prevData => [...prevData.slice(0, -1), newItem, prevData[prevData.length - 1]]);
  }

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Item>) => {
    if (item.isInput) {
      return (
        <TextInput
          style={styles.input}
          placeholder="Ajouter un nouvel élément..."
          onSubmitEditing={handleItemSubmission}
          blurOnSubmit={false}
        />
      );
    }

    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          { backgroundColor: isActive ? '#A0D6FF80' : main.BgColor },
        ]}
        onLongPress={drag}
      >
        <View style={styles.itemView}>
          <CheckBox
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={item.selected}
            onPress={() => handleItemSelectionToggle(item, isActive)}
          />
          <Text style={styles.itemText}>{item.label}</Text> 
        </View>
      </TouchableOpacity>
    );
  };

  const handleGoBack = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header/>
      <View style={styles.titleView}>
        <TouchableOpacity style={styles.titleTouch} onPress={handleGoBack}>
          <BackButton/>
          <Text style={styles.screenTitle}>{route.params.name}</Text>
        </TouchableOpacity>
      </View>
      <DraggableFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => `draggable-item-${item.key}`}
        onDragEnd={({ data }) => setData(data)}
        scrollEnabled={data.length > 10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: main.BgColor,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  titleView: {
    flexDirection: 'row', 
    marginBottom: 15,
    marginTop: 10
  },
  titleTouch: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  itemContainer: {
    flexDirection: 'row',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemView: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  itemText: {
    color: 'black', 
    fontSize: 18
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
});

export default ListeDeCourseScreen;
