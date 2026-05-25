import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './Src/Navigation/StackNavigator'
import ThemeToggleContex from './Src/Context/ThemeContext'
const App = () => {
  return (
    <ThemeToggleContex>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </ThemeToggleContex>


  )
}

export default App

const styles = StyleSheet.create({

})