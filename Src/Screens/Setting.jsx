import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import IonIcons from 'react-native-vector-icons/Ionicons'
import firestore from '@react-native-firebase/firestore'
import Padding from '../styles/Padding'
import Sizes from '../styles/Sizes'
import Margins from '../styles/Margins'
import Gaps from '../styles/Gaps'
const Setting = () => {
  const Img = require('../Assets/avatar.png')

  return (
    <View style={styles.mainContainer}>
      <View style={styles.profileView}>
        <Image source={Img} style={styles.img} />
        <IonIcons name="chevron-forward-outline" size={22} style={{ position: "absolute", top: Margins.TwntET, right: Margins.small }} />

      </View>
      <View>
        <View style={styles.accountContainer}>
          <IonIcons name='person-outline' size={22} />
          <Text style={styles.actTxt}>Account</Text>
          <IonIcons name="chevron-forward-outline" size={22} style={{ position: "absolute", top: Margins.inBetween, right: Margins.small }} />
        </View>
        <View style={styles.chatContainer}>
          <IonIcons name='chatbubble-outline' size={22} />
          <Text style={styles.chatTxt}>Chats</Text>
          <IonIcons name="chevron-forward-outline" size={22} style={{ position: "absolute", top: Margins.TwntET, right: Margins.small }} />

        </View>
      </View>

      <View style={styles.SecondContainer}>
        <View style={styles.appearanceView}>
          <IonIcons name='sunny-outline' size={22} />
          <Text style={styles.chatTxt}>Appereance</Text>
          <IonIcons name="chevron-forward-outline" size={22} style={{ position: "absolute", top: Margins.Thity, right: Margins.small }} />

        </View>
        <View style={styles.appearanceView}>
          <IonIcons name='notifications-outline' size={22} />
          <Text style={styles.chatTxt}>Notification</Text>
          <IonIcons name="chevron-forward-outline" size={22} style={{ position: "absolute", top: Margins.TwntET, right: Margins.small }} />

        </View>
        <View style={styles.appearanceView}>
          <IonIcons name='document-lock-outline' size={22} />
          <Text style={styles.chatTxt}>Privacy</Text>
          <IonIcons name="chevron-forward-outline" size={22} style={{ position: "absolute", top: Margins.TwntET, right: Margins.small }} />

        </View>
        <View style={styles.appearanceView}>
          <IonIcons name='folder-outline' size={22} />
          <Text style={styles.chatTxt}>Data Usage</Text>
          <IonIcons name="chevron-forward-outline" size={22} style={{ position: "absolute", top: Margins.TwntET, right: Margins.small }} />

        </View>
      </View>


      <View style={styles.appearanceView}>
        <IonIcons name="help-circle-outline" size={22} />
        <Text style={styles.chatTxt}>Help</Text>
        <IonIcons name="chevron-forward-outline" size={22} style={{ position: "absolute", top: Margins.Thity, right: Margins.small }} />

      </View>
      <View style={styles.appearanceView}>
        <IonIcons name='mail-outline' size={22} />
        <Text style={styles.chatTxt}>Invite Your Friends</Text>
        <IonIcons name="chevron-forward-outline" size={22} style={{ position: "absolute", top: Margins.TwntET, right: Margins.small }} />

      </View>

    </View>
  )
}

export default Setting

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: Padding.middle,
    backgroundColor: 'white'
  },
  profileView: {
    flexDirection: 'row',
    paddingTop: Padding.small,
    paddingBottom: Padding.small,
  },
  img: {
    height: Sizes.XXL,
    width: Sizes.XXL
  },
  accountContainer: {
    flexDirection: 'row',
    gap: Gaps.Middle,
    paddingTop: Padding.smaller

  },
  actTxt: {
    fontSize: Sizes.smaller,
    fontWeight: 600
  },
  chatContainer: {
    flexDirection: 'row',
    gap: Gaps.Middle,
    paddingTop: Padding.middle
  },
  chatTxt: {
    fontSize: Sizes.smaller,
    fontWeight: 600
  },
  SecondContainer: {
    paddingTop: Padding.doubleOfSmall,
    paddingBottom: Padding.small,
    borderBottomWidth: 0.5,
    borderColor: '#EDEDED'
  },
  appearanceView: {
    flexDirection: 'row',
    gap: Gaps.Middle,
    paddingTop: Padding.middle
  }
})
