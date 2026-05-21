import { View } from 'react-native'
import React from 'react'
// import IonIcons from 'react-native-vector-icons/Ionicons'
import { GiftedChat } from 'react-native-gifted-chat'
import { useState, useEffect, useCallback } from 'react'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
const Chats = ({ route }) => {
  const { recieverId } = route.params
  const CurrentUser = auth().currentUser

  const [messages, setMessages] = useState([])


  //chatRoom id

  const chatId = CurrentUser.uid > recieverId
    ? `${CurrentUser.uid}-${recieverId}` : `${recieverId}-${CurrentUser.uid}`

  // fetching messages realtime

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySapshot => {
        const allMessages = querySapshot.docs.map(doc => {
          const data = doc.data()
          return {
            ...data, createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
          }
        })
        setMessages(allMessages)
      })
    return unsubscribe

  }, [])

  //send message
  const onSend = useCallback((messageArray = []) => {
    const msg = messageArray[0]
    if (!msg || !CurrentUser?.uid || !recieverId) {
      return
    }
    const myMessage = {
      ...msg,
      sentBy: CurrentUser.uid,
      sentTo: recieverId,
      createdAt: new Date(),
    }
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, [myMessage]),
    )
    firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .add(myMessage)
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={message => onSend(message)}
        user={{
          _id: CurrentUser.uid,
          name: CurrentUser.email,
        }}
      />

    </View>
  )
}

export default Chats

// const styles = StyleSheet.create({
//   typeInput: {
//     borderRadius: 10,
//     paddingLeft: 40,
//     paddingTop: 15,
//     paddingBottom: 15,
//     backgroundColor: 'white',
//     color: 'black'
//   },

// })

// import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
// import React from 'react'
// import IonIcons from 'react-native-vector-icons/Ionicons'

// const Chats = () => {
//   return (
//     <KeyboardAvoidingView>
//       <View style={{ paddingTop: 700, paddingHorizontal: 10, }}>
//         <TextInput
//           placeholder='type message.....'
//           placeholderTextColor={'grey'}
//           style={styles.typeInput}

//         />
//         <TouchableOpacity style={{ position: 'absolute', left: 15, bottom: 10, }}>
//           <IonIcons name='add-outline' size={30} color={'blue'} />

//         </TouchableOpacity>

//         <TouchableOpacity style={{ position: 'absolute', right: 20, bottom: 10, }}>
//           <IonIcons name='send' size={30} color={'blue'} />
//         </ TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   )
// }

// export default Chats

// const styles = StyleSheet.create({
//   typeInput: {
//     borderRadius: 10,
//     paddingLeft: 40,
//     paddingTop: 15,
//     paddingBottom: 15,
//     backgroundColor: 'white',
//     color: 'black'
//   },

// })

