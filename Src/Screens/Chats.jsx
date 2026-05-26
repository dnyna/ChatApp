import { View, Text, Image } from 'react-native'
import React from 'react'
import Flexes from '../styles/Flexes'
// import IonIcons from 'react-native-vector-icons/Ionicons'
import { GiftedChat } from 'react-native-gifted-chat' // Its ready made chat UI
import { useState, useEffect, useCallback } from 'react'
import firestore from '@react-native-firebase/firestore' // firaebase fireSStore database
import auth from '@react-native-firebase/auth' // firebase authentication
import Padding from '../styles/Padding'
import Margins from '../styles/Margins'
import Zindexe from '../styles/Zindexe'
import Colors from '../styles/Colors'
import RNLinkPreview from 'react-native-link-preview'
const Chats = ({ route }) => {  // here we are recieving routes from navigation
  const { recieverId } = route.params  //getting Reciever's ID by params
  const CurrentUser = auth().currentUser  // getting Curretly logged in user 
  const [activeStatus, setActiveStatus] = useState(null)
  const [messages, setMessages] = useState([]) // storing chat messages 

  //Active Status

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .doc(recieverId)
      .onSnapshot(doc => {

        setActiveStatus(doc.data())
      })
    return unsubscribe
  }, [])



  //chatRoom id
  // creates unique chatRoom Id for two users  
  const chatId = CurrentUser.uid > recieverId ?
    `${CurrentUser.uid}-${recieverId}` : `${recieverId}-${CurrentUser.uid}`

  // fetching messages realtime  

  useEffect(() => {                              // runs when component loads
    const unsubscribe = firestore()             // starts fireStore conversation
      .collection('chats')                     //access chat collection
      .doc(chatId)                            //opens current chatroom document
      .collection('messages')                // access collection of messages then structure becomes chats-chatId-messages
      .orderBy('createdAt', 'desc')         // Orders messages by time , desc means newer message first
      .onSnapshot(querySnapshot => {       // .onSnapShot automatically updates when new messages arrives i.e. is real time update, it continuesly listens fireStore changes
        const allMessages = querySnapshot.docs.map(doc => {      //  loop through all message document
          const data = doc.data()  // extract data from doc
          return {
            _id: doc.id,
            ...data,
            createdAt: data.createdAt ?
              data.createdAt.toDate()       // converts firebase timestamp into JS Date
              : new Date(),  //using current time
          }
        })
        setMessages(allMessages) //updating chatmessage state
      })
    return unsubscribe

  }, [chatId])

  // useEffect(() => {
  //   const unsubscribe = firestore()             // starts fireStore conversation
  //     .collection('chats')                     //access chat collection
  //     .doc(chatId)                            //opens current chatroom document
  //     .collection('messages')                // access collection of messages then structure becomes chats-chatId-messages
  //     .where('sentTo', '==', CurrentUser.uid)
  //     .orderBy('createdAt', 'desc')         // Orders messages by time , desc means newer message first


  //     .onSnapshot(snapshot => {
  //       snapshot.docs.forEach(doc => {
  //         const data = doc.data

  //         if (data.seen === false) {
  //           doc.ref.update({
  //             seen: true,
  //           })
  //         }

  //       })

  //     }
  //     )
  //   return unsubscribe
  // }, [chatId])

  //send message
  const onSend = useCallback(async (messageArray = []) => {  // function runs when user sends message wrapped inside useCallback for optimization
    const msg = messageArray[0]                       // gifted chat sends message as array
    if (!msg || !CurrentUser?.uid || !recieverId) {  // stops executions if message missing, user not logged in, or reciever is missing
      return
    }

    let preViewData = null

    //URL detection

    const urlRegex = /(https?:\/\/[^\s]+)/g

    const matchedUrl = msg.text.match(urlRegex)

    //Fetch link preview

    if (matchedUrl) {
      try {
        preViewData = RNLinkPreview.getPreview(
          matchedUrl[0]
        )
      } catch {
        console.log(error)
      }
    }


    const myMessage = { // custom message object
      ...msg,          //copying text user and Id
      sentBy: CurrentUser.uid,   // storing sender user id
      sentTo: recieverId,        // storing reciever user id
      createdAt: new Date(),    // storing current message timing
      seen: false,

      //storing Preview
      preViewData
    }
    setMessages(previousMessages =>  // updating UI immediately and adding message to UI
      GiftedChat.append(previousMessages, [myMessage]),
    )
    firestore()              // saves message to fireStore
      .collection('chats')   //chat colection
      .doc(chatId)            // opens current chatroom by id
      .collection('messages')  // access message ollection
      .add(myMessage) //store messages to firestore
  }, [])

  //TickMarks

  // const TickMarks = (message) => {
  //   if (message.sentBy !== CurrentUser.uid) {
  //     return null
  //   }
  //   return message.seen ? (
  //     <IonIcons name='checkmark-done' color='blue' size={18} />
  //   ) : (<IonIcons name='checkmark' color='black' size={18} style={{ marginLeft: 20 }} />)
  // }
  return (
    <View style={{ flex: Flexes.flexible, paddingBottom: Padding.extrSmall, backgroundColor:'black' }}>
      <View style={{ position: 'absolute', left: Margins.ThriceFot, top: -Margins.TFay, zIndex: Zindexe.first }}>
        <Text style={{ color: Colors.primary }}>
          {activeStatus?.online
            ? 'online'
            : 'offline'
          }
        </Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={message => onSend(message)}
        user={{
          _id: CurrentUser.uid,  // tells giifted chat that who current user
          name: CurrentUser.email,

        }}

        renderCustomView={(props) => {
          const Preview = props.currentMessage.preViewData
          if (!Preview) return null
          return (
            <View>
              {
                Preview.images?.length > 0 && (
                  <Image
                    source={{ uri: Preview.images[0] }}
                    style={{ width: 200, height: 120 }}
                  />
                )
              }
              <View style={{ paddingTop: 20 }}>
                <Text style={{ color: 'blue' }}>{Preview.title}</Text>
              </View>
              <View>
                <Text style={{ color: 'black' }}>{Preview.description}</Text>
              </View>
            </View>
          )

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

