import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import IonIcons from 'react-native-vector-icons/Ionicons'
import firestore from '@react-native-firebase/firestore'
const ChatList = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .onSnapshot(querySnapshot => {
        const userData = []
        querySnapshot.forEach(documentSnapshot => {
          userData.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          })
          console.log(documentSnapshot.data())
        })
        setUsers(userData)
      })
    return () => subscriber()
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
        <IonIcons name='search-outline' size={25} style={styles.searchIcon} color={'grey'}></IonIcons>
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
    paddingLeft: 50,
    color: 'black', elevation: 1
  },

  searchIcon: {
    position: 'absolute',
    top: 28,
    left: 30
  },

  searchContainer: {
    paddingHorizontal: 15,
    paddingTop: 20
  }

})