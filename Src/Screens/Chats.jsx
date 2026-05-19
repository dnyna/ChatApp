import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React from 'react'
// import IonIcons from 'react-native-vector-icons/Ionicons'
import { GiftedChat } from 'react-native-gifted-chat'
import { useState, useEffect } from 'react'
const Chats = () => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'John Doe',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = messageArray => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messageArray),
    )
  }
  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
      {/* <View style={{ paddingTop: 700, paddingHorizontal: 10, }}>
        <TextInput
          placeholder='type message.....'
          placeholderTextColor={'grey'}
          style={styles.typeInput}

        />
        <TouchableOpacity style={{ position: 'absolute', left: 15, bottom: 10, }}>
          <IonIcons name='add-outline' size={30} color={'blue'} />

        </TouchableOpacity>

        <TouchableOpacity style={{ position: 'absolute', right: 20, bottom: 10, }}>
          <IonIcons name='send' size={30} color={'blue'} />
        </ TouchableOpacity>
      </View> */}
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