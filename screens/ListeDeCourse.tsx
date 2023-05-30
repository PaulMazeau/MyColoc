import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import Header from '../components/Reusable/Header';
import { StatusBar } from 'expo-status-bar';
import Valider from '../assets/icons/Valider';
import { main } from '../constants/Colors';
import { Shadows } from '../constants/Shadow';
import BackIcon from '../components/Reusable/BackButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import ScreenTitle from '../components/Reusable/ScreenTitle';

// Définition du type des propriétés pour le composant ListeDeCourseScreen
type Props = NativeStackScreenProps<RootStackParams, 'ListeDeCourse'>;

type Todo = {
  id: string;
  title: string;
  completed?: boolean;
};

const initialTodos: Todo[] = [
  { id: '1', title: 'Tarte' },
  { id: '2', title: 'Pomme de terre' },
  { id: '3', title: 'aliments' },
];


const TodoList = ({route, navigation}: Props) => {
  const [todos, setTodos] = useState(initialTodos);
  const [input, setInput] = useState('');

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const isScrollEnabled = todos.length > 15; // nombre d'élément avant un scroll

  const addTodo = () => {
    if (input.length > 0) {
      setTodos([...todos, { id: Math.random().toString(36).substring(7), title: input }]);
      setInput('');
    }
  };

  return (
    <View style={styles.body}>
      <Header/>
      <StatusBar style="auto" />
      <TouchableOpacity style={{flexDirection: 'row'}}  onPress={() => {navigation.goBack() }}>
        
        <ScreenTitle title={route.params.name}/>
        </TouchableOpacity>
      <View style={[styles.container, Shadows.shadow]}>
        <KeyboardAwareFlatList
          data={todos}
          keyExtractor={item => item.id}
          scrollEnabled={isScrollEnabled} 
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => toggleTodo(item.id)}>
              <View style={[styles.item, item.completed && styles.completedItem]}>
                <View style={[styles.checkbox, item.completed && styles.completedCheckbox]}>
                  <Valider color="white" width={14} height={14}/>
                </View>
                <Text style={[styles.itemText, item.completed && styles.completedText]}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
          //ItemSeparatorComponent={() => <View style={styles.separator} />} -> j'hésite
          ListFooterComponent={
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              onSubmitEditing={addTodo}
              placeholder="Ajouter un nouvel élément..."
              returnKeyType="done"
              blurOnSubmit={false}
            />
          }
          extraScrollHeight={Platform.OS === 'ios' ? 120 : 100}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: main.BgColor  
  },
  container: {
    height: "auto",
    backgroundColor: "white",
    width: "90%",
    marginHorizontal: "5%",
    borderRadius: 10,
    padding: 10,
  },
  listContainer: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
    marginBottom: 2
  },
  completedItem: {
    backgroundColor: '#f0f0f0',
  },
  checkbox: {
    width: 24,
    height: 24,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#172ACE',
    borderRadius: 4,
    padding: 4,
  },
  completedCheckbox: {
    backgroundColor: '#172ACE',
  },
  itemText: {
    fontSize: 18,
  },
  completedText: {
    color: "#8D8D8D",
    opacity: 0.8,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginLeft: "12%",
  },
  input: {
    height: 40,
    backgroundColor: '#fff',  // Background color to match the todo items
    paddingHorizontal: 15,  // Horizontal padding to match the todo items
    paddingVertical: 10,  // Vertical padding to match the todo items
    fontSize: 18,  // Font size to match the todo items
    color: '#000',  // Text color to match the todo items
  },
});

export default TodoList;
