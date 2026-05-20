import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import IonIcons from 'react-native-vector-icons/Ionicons'
const Setting = () => {
  const Img = require('../Assets/avatar.png')

  return (
    <View style={styles.mainContainer}>
      <View style={styles.profileView}>
        <Image source={Img} style={styles.img} />
        <IonIcons name="chevron-forward-outline" size={22} style={{ position: "absolute", top: 28, right: 10 }} />

      </View>
      <View>
        <View style={styles.accountContainer}>
          <IonIcons name='person-outline' size={22} />
          <Text style={styles.actTxt}>Account</Text>
          <IonIcons name="chevron-forward-outline" size={22} style={{ position: "absolute", top: 15, right: 10 }} />
        </View>
        <View style={styles.chatContainer}>
          <IonIcons name='chatbubble-outline' size={22} />
          <Text style={styles.chatTxt}>Chats</Text>
          <IonIcons name="chevron-forward-outline" size={22} style={{ position: "absolute", top: 28, right: 10 }} />

        </View>
      </View>

      <View style={styles.SecondContainer}>
        <View style={styles.appearanceView}>
          <IonIcons name='sunny-outline' size={22} />
          <Text style={styles.chatTxt}>Appereance</Text>
          <IonIcons name="chevron-forward-outline" size={22} style={{ position: "absolute", top: 30, right: 10 }} />

        </View>
        <View style={styles.appearanceView}>
          <IonIcons name='sunny-outline' size={22} />
          <Text style={styles.chatTxt}>Notification</Text>
          <IonIcons name="chevron-forward-outline" size={22} style={{ position: "absolute", top: 28, right: 10 }} />

        </View>
        <View style={styles.appearanceView}>
          <IonIcons name='sunny-outline' size={22} />
          <Text style={styles.chatTxt}>Privacy</Text>
          <IonIcons name="chevron-forward-outline" size={22} style={{ position: "absolute", top: 28, right: 10 }} />

        </View>
        <View style={styles.appearanceView}>
          <IonIcons name='sunny-outline' size={22} />
          <Text style={styles.chatTxt}>Data Usage</Text>
          <IonIcons name="chevron-forward-outline" size={22} style={{ position: "absolute", top: 28, right: 10 }} />

        </View>
      </View>


      <View style={styles.appearanceView}>
        <IonIcons name='sunny-outline' size={22} />
        <Text style={styles.chatTxt}>Help</Text>
        <IonIcons name="chevron-forward-outline" size={22} style={{ position: "absolute", top: 30, right: 10 }} />

      </View>
      <View style={styles.appearanceView}>
        <IonIcons name='sunny-outline' size={22} />
        <Text style={styles.chatTxt}>Invite Your Friends</Text>
        <IonIcons name="chevron-forward-outline" size={22} style={{ position: "absolute", top: 28, right: 10 }} />

      </View>

    </View>
  )
}

export default Setting

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: 'white'
  },
  profileView: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
  },
  img: {
    height: 45,
    width: 45
  },
  accountContainer: {
    flexDirection: 'row',
    gap: 25,
    paddingTop: 15

  },
  actTxt: {
    fontSize: 16,
    fontWeight: 600
  },
  chatContainer: {
    flexDirection: 'row',
    gap: 25,
    paddingTop: 30
  },
  chatTxt: {
    fontSize: 16,
    fontWeight: 600
  },
  SecondContainer: {
    paddingTop: 40,
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    borderColor: '#EDEDED'
  },
  appearanceView: {
    flexDirection: 'row',
    gap: 25,
    paddingTop: 30
  }
})
