import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './Src/Navigation/StackNavigator'
import ThemeToggleContex from './Src/Context/ThemeContext'
import { AppState } from 'react-native'
import Auth from '@react-native-firebase/auth'
import  firestore  from '@react-native-firebase/firestore'
import { useEffect } from 'react'
const App = () => {

  useEffect(() => {
    const CurrentUser = Auth().currentUser

    if (!CurrentUser) {
      return
    }
    console.log(CurrentUser.uid, 'id');
    
    const UpdatedUserStatus = async (status) => {
      await firestore()
        .collection('users')
        .doc(CurrentUser.uid)
        .update({
          online: status,
          lastSeen: firestore.FieldValue.serverTimestamp(),
        })
    }

    //App opened

    UpdatedUserStatus(true)
    const subscription = AppState.addEventListener(
      'change',
      nextAppState => {
        if (nextAppState === 'active') {
          UpdatedUserStatus(true)
        } else {
          UpdatedUserStatus(false)
        }

      })
    return () => {
      UpdatedUserStatus(false)
      subscription.remove()
    }
  }, [])
  return (
    <ThemeToggleContex>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </ThemeToggleContex>


  )
}

export default App

