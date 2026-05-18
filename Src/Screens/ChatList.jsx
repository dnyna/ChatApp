import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { firestore } from '@react-native-firebase/firestore'
const ChatList = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const subsScriber = firestore()
      .collection('users')
      .onSnapshot(querySnapshot => {
        const userData = []
        querySnapshot.forEach(documentSnapshot => {
          userData.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id
          })
        })
        setUsers(userData)
      })
    return () => subsScriber()
  }, [])


  const RenderItems = ({ item }) => (
    <View style={{ paddingTop: 20 }}>
      <View style={{
        borderWidth: 1,
        borderColor: 'black',
        height: 80,
        width: '80%'
      }}>
        <Text>{item.email}</Text>
        <Text>Last seen</Text>
      </View>

    </View>
  )
  return (
    <View style={styles.container}>
      <IonIcons name='add-outline' style={styles.addIcon} size={20} />
      <View style={styles.searchContainer}>
        <TextInput
          placeholder='search'
          placeholderTextColor={'grey'}
          style={styles.searchInput} />
        <IonIcons name='search-outline' size={30} style={styles.searchIcon}></IonIcons>
        <View>
          <FlatList
            data={users}
            renderItem={RenderItems}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </View>
  )
}

export default ChatList

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  addIcon: {
    position: 'absolute',
    right: 20,
    top: -40,
    zIndex: 1
  },

  searchInput: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingLeft: 60,
    color: 'black', elevation: 1
  },

  searchIcon: {
    position: 'absolute',
    top: 19,
    left: 35
  },

  searchContainer: {
    paddingHorizontal: 15,
    paddingTop: 20
  }

})