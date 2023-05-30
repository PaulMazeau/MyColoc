import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

export default function UserSettingsScreen() {
  return (
    <View>
        <StatusBar style="dark"/>
        <Text>Personnal settings</Text>
    </View>
  )
}

const styles = StyleSheet.create({})