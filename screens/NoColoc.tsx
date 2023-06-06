    import React, {useContext, useState} from 'react'
    import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
    import {UserContext} from '../UserContext'
    import { FB_AUTH, FB_DB } from '../firebaseconfig';
    import * as Crypto from 'expo-crypto';
    import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
    import { main } from '../constants/Colors';
    import BlueGradient from '../components/Reusable/BlueGradient';
    import { StatusBar } from 'expo-status-bar';
    import Button from '../components/Reusable/Button';

    export default function NoColoc() {

        const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    const handleTabPress = (index: number) => {
        setSelectedTabIndex(index);
        console.log(`Onglet ${index + 1} sélectionné`);
    };
        const [user, setUser] = useContext(UserContext);
        const [nomColoc, setNomColoc] = useState(null);
        const [codeColoc, setCodeColoc] = useState(null);
        const handleCreateColoc = async () => {
            const userID = FB_AUTH.currentUser.uid
            var colocID = Crypto.randomUUID().substring(0, 6)
            console.log(colocID)
            var colocData = await getDoc(doc(FB_DB, "Colocs", colocID));
            while(colocData.exists()){ //checking if colodID already exists
                colocID = Crypto.randomUUID().substring(0, 6)
                colocData = await getDoc(doc(FB_DB, "Colocs", colocID))
            }
            const colocEntry = {
                id: colocID,
                nom: nomColoc,
                membersID: [userID],
            }
            await setDoc(doc(FB_DB, 'Colocs', colocID),colocEntry); //creating the coloc file
            await updateDoc(doc(FB_DB, 'Users', userID), {colocID: colocID, nomColoc: nomColoc, membersID: [FB_AUTH.currentUser.uid]}); //updating user file
            setUser({...user, colocID: colocID, nomColoc: nomColoc, membersID: [FB_AUTH.currentUser.uid]}) //updating user context
        }

        const handleJoinColoc = async () => { //update de la prop membersID des autres membres coté serveurs
            const colocData = await getDoc(doc(FB_DB, "Colocs", codeColoc));
            if(!(colocData.exists())){alert("Ce code n'existe pas !"); setCodeColoc("")}
            else {
                var membersID = colocData.data().membersID;
                membersID.push(FB_AUTH.currentUser.uid);
                await updateDoc(doc(FB_DB, "Users", FB_AUTH.currentUser.uid), {colocID: codeColoc, nomColoc: colocData.data().nom, membersID: membersID})
                await updateDoc(doc(FB_DB, "Colocs", codeColoc), {membersID: membersID});
                setUser({...user, colocID: codeColoc, nomColoc: colocData.data().nom, membersID: membersID})
            }
        }
        const TabButton = ({ index, title }) => {
            const isActive = selectedTabIndex === index;
            return (
              <TouchableOpacity
                style={[styles.tabButton, isActive && styles.activeTabButton]}
                onPress={() => handleTabPress(index)}
              >
                <Text
                  style={[styles.tabButtonText, isActive && styles.activeTabButtonText]}
                >
                  {title}
                </Text>
              </TouchableOpacity>
            );
          };
          
          return (
            <View style={styles.container}>
              <View style={styles.content}>
                <StatusBar style="light" />
                <BlueGradient height={0.6} />
                <View style={styles.inputContainer}>
                  <View style={styles.segmentedControl}>
                    <TabButton index={0} title="J'ai une colocation" />
                    <TabButton index={1} title="Je n'ai pas de colocation" />
                  </View>
                  <Text style={styles.Title}>
                    {selectedTabIndex === 0
                      ? "Rejoindre ta colocation"
                      : "Créer ta colocation"}
                  </Text>
                  <TextInput
                    value={selectedTabIndex === 0 ? codeColoc : nomColoc}
                    style={styles.input}
                    onChangeText={text =>
                      selectedTabIndex === 0 ? setCodeColoc(text) : setNomColoc(text)
                    }
                    placeholder={
                      selectedTabIndex === 0 ? "Rentre le code" : "Rentre le nom"
                    }
                    placeholderTextColor="rgba(255, 255, 255, 0.8)"
                    autoCorrect={selectedTabIndex !== 0}
                  />
                </View>
                <Button
                  title={selectedTabIndex === 0 ? "Rejoindre" : "C'est parti !"}
                  onPress={
                    selectedTabIndex === 0 ? handleJoinColoc : handleCreateColoc
                  }
                />
              </View>
              <TouchableOpacity style={styles.decoBouton} onPress={() => { FB_AUTH.signOut(); setUser(null);}}><Text style={styles.textDecoBouton}>Déconnexion</Text></TouchableOpacity>
            </View>
          );
          
    }
    const styles = StyleSheet.create({
        container: {
        flex: 1,
        backgroundColor: main.BgColor,
        justifyContent: 'space-between',
      },
      content: {
        flex: 1,
      },
    inputContainer: {
        position: "absolute",
        width: "90%",
        top: 100,
        zIndex: 1,
        marginHorizontal: '5%'
    },
    Title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 12
    },
    segmentedControl: {
        flexDirection: 'row',
        marginBottom: 24,
        borderRadius: 8,
        backgroundColor: 'white',
        height: 48,
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
    input: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        marginTop: 10,
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        fontSize: 19,
        fontWeight: '600',
        color: 'white',
        marginBottom: 15,
    },
    decoBouton: {
      marginBottom: 28
    },
    textDecoBouton: {
      textDecorationLine: 'underline',
      textAlign: 'center',
      fontSize: 16,
    },
    })

