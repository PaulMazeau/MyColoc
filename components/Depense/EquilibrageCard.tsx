import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { Shadows } from '../../constants/Shadow'
import { Colors, Drawer } from 'react-native-ui-lib'

const EquilibrageCard = ({deveur, receveur, montant}) => {

  const handleDelete = async () => {
    //await deleteDoc(doc(db, "Colocs/"+clcID+"/Courses", courseID)); -> ancien code
    console.log('delete')
  }

  return (
    <View style={styles.body}>
    <Drawer
        rightItems={[{text: 'Supprimer', background: Colors.red30, onPress: () => handleDelete()}]}      
        style={styles.drawer}
      >
      <View style={styles.global}>
    <TouchableOpacity style={{flex: 1}} onPress={() => console.log('test')}>
    <View style={[styles.container, Shadows.shadow]}>
      <View style={styles.imageContainer}>
        <Image source={{uri : deveur.avatarUrl, cache:'force-cache'}} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.title}>{deveur.nom}</Text>
            <View style={styles.payeeContainer}>
              <Text style={styles.subtitle}>doit rembourser à {receveur.nom}</Text>
            </View>
          </View>
          <View style={styles.middleContainer}>
            <Text style={styles.title}>{montant}</Text>
          </View>
          <View style={styles.rightContainer}>
            <View style={styles.imageContainer}>
                 <Image source={{uri: receveur.avatarUrl, cache:'force-cache'}} style={styles.image} />
            </View>
          </View>
        </View>
    </View>
    </TouchableOpacity>
    </View>
    </Drawer>
    </View>
  )
}

const styles = StyleSheet.create({
    body: {
      ...Shadows.shadow,
      backgroundColor: 'white',
      width: '90%',
      marginHorizontal: '5%',
      borderRadius: 10,
      marginBottom: 12
    },
    global: {
      backgroundColor: 'white',
      borderRadius: 10,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      height: 60,
      borderRadius: 10,
      },
      imageContainer: {
        height: 40,
        width: 40,
        overflow: 'hidden',
        borderRadius: 7,
      },
      image: {
        height: '100%',
        width: '100%',
      },
      textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
      },
      leftContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginLeft: 10,
      },
      middleContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginLeft: 10,
      },
      rightContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginLeft: 10,
        alignItems: 'center',
      },
      title: {
        fontWeight: '600',
        fontSize: 19,
      },
      subtitle: {
        fontSize: 14,
      },
      payeeContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
      },
      drawer: {
        borderRadius: 10
      },
})

export default EquilibrageCard