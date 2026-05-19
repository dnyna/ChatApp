import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import IonIcons from 'react-native-vector-icons/Ionicons'
import firestore, { Timestamp } from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { timestampAdd } from '@react-native-firebase/app/dist/module/internal/web/firebaseFirestorePipelines'
const ChatList = () => {
  const [users, setUsers] = useState([])
  const Navigation = useNavigation()
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

  //last seen

  // const LastSeen = timestamp=>{
  //   if(!Timestamp){
  //     return('offline')
  //   }

  //   const date= timestamp.toDate()
    
  //   return `last seen $
  //   {date.toLocaleTimeString([],{
  //   hour:'2-digit'
  //   minute:'2-digit'
  //   })}`
  // }

  const RenderItems = ({ item }) => (
    <View style={{ paddingTop: 20 }}>
      <View style={{
        borderColor: 'black',
        paddingVertical
          : 20,
        borderRadius: 10,
        backgroundColor: 'white'

      }}>
        <TouchableOpacity onPress={() => Navigation.navigate('Chats')}>
          <Text style={{ paddingLeft: 20 }}>{item.email}</Text>
          {/* <Text>{LastSeen.date}</Te
          xt> */}
        </TouchableOpacity>

      </View>

    </View>
  )
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>Navigation.navigate('SignUp')}style={styles.addIcon}>
        <IonIcons name='add-outline'  size={20} />
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