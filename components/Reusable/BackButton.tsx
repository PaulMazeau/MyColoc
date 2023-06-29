import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import BackIcon from '../../assets/icons/BackIcon'
import { useNavigation } from '@react-navigation/core'

type ScoreBoardProps = {
  color?:string
};

const BackButton = ({color }: ScoreBoardProps) => {
  const navigation = useNavigation()

  return <View style={styles.container}>
    <TouchableHighlight style={styles.backButton} onPress={() => {
      navigation.goBack()
    }}>
      <BackIcon color={color || "#333"} size={28} />
    </TouchableHighlight>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
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