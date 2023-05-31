import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { main } from '../constants/Colors';
import Header from '../components/Reusable/Header';
import React, { useContext, useEffect, useState } from 'react';
import ScreenTitle from '../components/Reusable/ScreenTitle';
import Equilibrage from '../components/Depense/Equilibrage';
import ListeTransaction from '../components/Depense/ListeTransaction';
import { DocumentData, QuerySnapshot, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { FB_DB } from '../firebaseconfig';
import { UserContext } from '../UserContext';


export default function DepenseScreen() {

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [user, setUser] = useContext(UserContext);
  const [transac, setTransac] = useState([])
  const [snapshot, setSnapshot] = useState(null);
  const handleTabPress = (index: number) => {
    setSelectedTabIndex(index);
  };
  useEffect(()=>{ //setup the listener on mount, unsubscribe on dismount
    const q = query(collection(FB_DB, "Colocs/"+user.colocID+ "/Transactions"), orderBy('timestamp'))
    const subscriber = onSnapshot(q, (QuerySnapshot) => {setSnapshot(QuerySnapshot)})
    return () => {subscriber()}
  }, [])
  useEffect(()=>{
    if(snapshot){
      const transacSetter = []
      snapshot.forEach((doc)=>{
        transacSetter.push(doc)
      })
      setTransac(transacSetter)
    }
  }, [snapshot])
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
            Equilibrage
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
            Transactions
          </Text>
        </TouchableOpacity>
      </View>
      {selectedTabIndex === 0 ? (
        <Equilibrage />
      ) : (
        <ListeTransaction transacs={transac}/>
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


function setSnapshot(QuerySnapshot: QuerySnapshot<DocumentData>) {
  throw new Error('Function not implemented.');
}

