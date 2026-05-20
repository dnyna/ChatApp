import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import IonIcons from 'react-native-vector-icons/Ionicons'
import firestore, { DocumentSnapshot, } from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import Padding from '../styles/Padding'
import Sizes from '../styles/Sizes'
import Margins from '../styles/Margins'
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
    <TouchableOpacity onPress={() => Navigation.navigate('Chats', { recieverId: item.uid, recieverEmail: item.email },)} style={{
      paddingTop: Padding.small, flexDirection: 'row',
      borderColor: 'black',
      paddingVertical: Padding.small,
      borderRadius: 10,


    }}>
      <View>
        <Image source={Img} style={styles.img} />
      </View>
      <View>
        <View>
          <Text style={{ paddingLeft: Padding.small }}>{item.name}</Text>
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
    paddingBottom: Padding.halfCentury,
    backgroundColor: 'white'
  },

  addIcon: {
    position: 'absolute',
    right: Margins.middle,
    top: -Margins.Fot,
    zIndex: 1
  },

  searchInput: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingLeft: Padding.halfCentury,
    color: 'black',
    elevation: 1
  },

  searchIcon: {
    position: 'absolute',
    top: Margins.TwntET,
    left: Margins.Thity
  },

  searchContainer: {
    paddingHorizontal: Padding.smaller,
    paddingTop: Padding.small,
    paddingBottom: Padding.small
  },
  img: {
    height: Sizes.large,
    width: Sizes.large
  }

})