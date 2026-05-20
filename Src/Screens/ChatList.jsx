import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import IonIcons from 'react-native-vector-icons/Ionicons'
import firestore, { DocumentSnapshot, } from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
const ChatList = () => {
  const [users, setUsers] = useState([])
  const Navigation = useNavigation()
  useEffect(() => {
    const currentUser = auth().currentUser
    const subscriber = firestore()
      .collection('users')
      .onSnapshot(querySnapshot => {
        const userData = []
        querySnapshot.forEach(documentSnapshot => {
          const data = documentSnapshot.data()

          console.log(documentSnapshot.data())

          ///skipping login user

          if (data.email !== currentUser.email) {
            userData.push({
              id: documentSnapshot.id,
              ...data,
            })
          }
        })
        setUsers(userData)
      })
    return () => subscriber()
  }, [])


  const Img = require('../Assets/avatar.png')
  const RenderItems = ({ item }) => (
    <TouchableOpacity onPress={() => Navigation.navigate('Chats', {recieverId:item.id, recieverEmail:item.email},)} style={{
      paddingTop: 20, flexDirection: 'row',
      borderColor: 'black',
      paddingVertical: 20,
      borderRadius: 10,


    }}>
      <View>
        <Image source={Img} style={styles.img} />
      </View>
      <View>
        <View>
          <Text style={{ paddingLeft: 20 }}>{item.name}</Text>
          {/* <Text>{LastSeen.date}</Te
          xt> */}
        </View>

      </View>

    </TouchableOpacity >
  )
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => Navigation.navigate('SignUp')} style={styles.addIcon}>
        <IonIcons name='add-outline' size={20} />
      </TouchableOpacity>
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
    flex: 1,
    paddingBottom: 50,
    backgroundColor: 'white'
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
    paddingTop: 20,
    paddingBottom: 20
  },
  img: {
    height: 30,
    width: 30
  }

})