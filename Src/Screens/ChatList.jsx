import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Image, RefreshControl } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import IonIcons from 'react-native-vector-icons/Ionicons'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import Padding from '../styles/Padding'
import Sizes from '../styles/Sizes'
import Margins from '../styles/Margins'
import Radius from '../styles/Radius'
import Gaps from '../styles/Gaps'
import BoldFont from '../styles/Bold'
import Zindexe from '../styles/Zindexe'
import Shadow from '../styles/Shadow'
import { ThemeToggleContex } from '../Context/ThemeContext'
import Flexes from '../styles/Flexes'
import Colors from '../styles/Colors'
const ChatList = () => {
  const { Theme, } = useContext(ThemeToggleContex)
  const [users, setUsers] = useState([])
  const [refresh, setRefresh] = useState(false)
  const Navigation = useNavigation()

  useEffect(() => {                                                // runs automatically when component loads
    const currentUser = auth().currentUser                        // gets currently logged in user
    const subscriber = firestore()                               // sarts fireStore connection
      .collection('users')                                      // accessing user collection
      .onSnapshot(querySnapshot => {                           // runs whenever user collection changes
        const userData = []                                   //stores fetched users temporarily
        querySnapshot.forEach(documentSnapshot => {          //  loops through every firestore  document
          const data = documentSnapshot.data()              //getting single documment data

          console.log(documentSnapshot.data())

          ///skipping login user from the list

          if (data.email !== currentUser.email) {
            userData.push({
              id: documentSnapshot.id,
              ...data,
            })

          }

        })

        setUsers(userData)                  //storing all use data 

      })

    return () => subscriber()
  }, [])

  //function for refresh

  const onRefresh = () => {
    setRefresh(true)
    setTimeout(() => {
      setRefresh(false)
    }, 2000)

  }


  const Img = require('../Assets/avatar.png')
  const RenderItems = ({ item }) => (
    <TouchableOpacity onPress={() => Navigation.navigate('Chats', { recieverId: item.id, recieverEmail: item.email, recieverName: item.name })} style={[styles.cartContainer, { color: Theme.color }]}>
      <View style={[styles.imgContainer, { backgroundColor: Theme.userContainerColor }]}>
        <Image source={Img} style={styles.img} />

      </View>
      <View>
        <View>
          <Text style={[styles.chatListNames, { color: Theme.color }]}>{item.name}</Text>
          <Text style={styles.lastseenTxt}>Last seen</Text>
        </View>

      </View>

    </TouchableOpacity >
  )
  return (
    <View style={[styles.container, { backgroundColor: Theme.backgroundColor }]}>
      <TouchableOpacity onPress={() => Navigation.navigate('SignUp')} style={styles.addIcon}>
        <IonIcons name='add-outline' size={Sizes.smaller} />
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder='search'
          placeholderTextColor={Colors.ButtnColor}
          style={[styles.searchInput,{color:Theme.color, backgroundColor: Theme.backgroundColor, borderColor:Theme.color}]} />
        <IonIcons name='search-outline' size={Sizes.small} style={styles.searchIcon} color={Colors.ButtnColor}></IonIcons>
        <View>


          <FlatList
            data={users}
            renderItem={RenderItems}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={onRefresh}
              />
            }
          />
        </View>
      </View>
    </View>
  )
}

export default ChatList

const styles = StyleSheet.create({
  container: {
    flex: Flexes.flexible,
    paddingBottom: Padding.halfCentury,
    backgroundColor: Colors.BasicPrimary,
    borderBottomWidth: Sizes.smallestOne,
    borderTopWidth: Sizes.smallestOne

  },

  addIcon: {
    position: 'absolute',
    right: Margins.middle,
    top: -Margins.TFay,
    zIndex: Zindexe.first
  },

  searchInput: {
    backgroundColor:Colors.BasicPrimary,
    borderRadius: Radius.middle,
    paddingLeft: Padding.halfCentury,
    color:Colors.realBlack,
    elevation: Shadow.OnlyOne,
    borderWidth:Sizes.smallestOne
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

  imgContainer: {
    paddingTop: Padding.extarSmaller,
    
  },

  img: {
    height: Sizes.extraLarge,
    width: Sizes.extraLarge,
  },

  chatListNames: {
    paddingLeft: Padding.small,
    fontSize: Sizes.SevnTn,
    fontWeight: BoldFont.middle
  },

  lastseenTxt: {
    color:Colors.Grey,
    paddingTop: Padding.TooSmalll,
    marginLeft: Padding.small
  },

  cartContainer: {
    paddingTop: Padding.small, flexDirection: 'row',
    borderColor:Colors.realBlack,
    paddingVertical: Padding.small,
    borderRadius: Radius.small,
    borderBottomWidth: Sizes.smallestOne,
    borderColor:Colors.Grey,
    gap: Gaps.small
  }

})