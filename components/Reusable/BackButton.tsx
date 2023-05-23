import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import BackIcon from '../../assets/icons/BackIcon'
import { useNavigation } from '@react-navigation/core'

const BackButton = () => {
  const navigation = useNavigation()

  return <View style={styles.container}>
    <TouchableHighlight style={styles.backButton} underlayColor="#f0ddcc" onPress={() => {
      navigation.goBack()
    }}>
      <BackIcon color="#333" size={20} />
    </TouchableHighlight>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    marginTop: 100
  },
  backButton: {
    borderRadius: 8,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  }
})

export default BackButton