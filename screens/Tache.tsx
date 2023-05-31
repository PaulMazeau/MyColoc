import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { main } from '../constants/Colors';
import Header from '../components/Reusable/Header';
import ScreenTitle from '../components/Reusable/ScreenTitle';
import MesTaches from '../components/Tache/MesTaches';
import GlobalTaches from '../components/Tache/GlobalTaches';
import { collection, query, where, onSnapshot, orderBy, QuerySnapshot, Query } from "firebase/firestore";
import { UserContext } from '../UserContext';
import { FB_DB } from '../firebaseconfig';

const TacheScreen = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [myTache, setMyTache] = useState([]);
  const [allTache, setAllTache] = useState([]);
  const [myNextTache, setMyNextTache] = useState([]);
  const [snapshot, setSnapshot] = useState(null);
  const [user, setUser] = useContext(UserContext);
  const handleTabPress = (index: number) => {
    setSelectedTabIndex(index);
  };
  useEffect(()=>{ //setup the listener on mount, unsubscribe on dismount
    const q = query(collection(FB_DB, "Colocs/"+user.colocID+ "/Taches"), orderBy('date'))
    const subscriber = onSnapshot(q, (QuerySnapshot) => {setSnapshot(QuerySnapshot)})
    return () => {subscriber()}
  }, [])

  useEffect(()=>{ //each time the snapshot updates, update myTache, etc...
    if(snapshot){
      const myTacheSetter = []
      const myNextTacheSetter = []
      const allTacheSetter = []
      snapshot.forEach((doc)=>{
        const task = doc.data()
        if(task.nextOne === user.uuid){
          myNextTacheSetter.push(task)
        }else if(task.concerned.includes(user.uuid)){
          myTacheSetter.push(task)
        }
        allTacheSetter.push(task)
      })
      setAllTache(allTacheSetter);
      setMyTache(myTacheSetter);
      setMyNextTache(myNextTacheSetter);
    }
  }, [snapshot])
  return (
    <View style={styles.container}>
      <Header />
      <ScreenTitle title="Tâche à faire" />
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
            Mes tâches
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
            Tâches générales
          </Text>
        </TouchableOpacity>
      </View>
      {selectedTabIndex === 0 ? (
        <MesTaches task={myTache} nextTask={myNextTache}/>
      ) : (
        <GlobalTaches task={allTache}/>
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

export default TacheScreen;
