import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import BlueGradient from '../components/Reusable/BlueGradient'
import Button from '../components/Reusable/ButtonColor';
import { FB_DB, FB_STORE } from '../firebaseconfig';
import { getDownloadURL, list, ref } from 'firebase/storage';
import { UserContext } from '../UserContext';
import { doc, updateDoc } from 'firebase/firestore';

const AvatarSettings: React.FC = (Props) => {
    const [urls, setUrls] = useState([]) 
    const [user, setUser] = useContext(UserContext);
    useEffect(() => {
      const avatarListRef = ref(FB_STORE, 'AvatarsCompress/');
      list(avatarListRef).then((res => {
        res.items.forEach((item) => {
          getDownloadURL(item).then((url) => {setUrls((prev) => [...prev, url])})
        })
      }))
    }, [])
   
    const imageData = urls.map((url, index)=>{
      var rObj = {}
      rObj['id'] = index
      rObj['uri'] = url
      return rObj
    })

    const handleUpdateAvatar = async () => {
      await updateDoc(doc(FB_DB, "Users", user.uuid), {avatarUrl: selectedImage});
    }
    const navigation = useNavigation();
    const [selectedImage, setSelectedImage] = useState<string | null>(user.avatarUrl);

    const renderItem = ({ item }: { item }) => (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => setSelectedImage(item.uri)}>
          <Image
            source={{ uri: item.uri }}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
    );
  
    return (
      <View style={styles.container}>
        <StatusBar style="light"/>
        <BlueGradient height={0.5}/>
        {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            style={styles.selectedImage}
          />
        )}
        <View style={styles.containerGalery}>
          <FlatList
            data={imageData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={4}
            showsVerticalScrollIndicator={false}
          />
          <Button text='Enregistrer' colorBackGround={"#172ACE"} colorText={'white'} onPress={() => {navigation.goBack(); setSelectedImage(null); handleUpdateAvatar(); setUrls([])}}/>
        </View>
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    containerGalery: {
      flex: 1,
      width: '90%',
      marginHorizontal: '5%',
    },
    item: {
      flex: 1,
      marginVertical: 12,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 80, 
      height: 80,
      borderRadius: 12
    },
    selectedImage: {
      width: 300,
      height: 300,
      borderRadius: 12,
      alignSelf: 'center',
      marginTop: 20, 
      position: 'absolute',
      top: '7%'
    }
  });
  
  export default AvatarSettings;