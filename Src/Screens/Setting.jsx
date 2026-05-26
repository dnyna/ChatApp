import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import IonIcons from 'react-native-vector-icons/Ionicons'
import firestore from '@react-native-firebase/firestore'
import Padding from '../styles/Padding'
import Sizes from '../styles/Sizes'
import Margins from '../styles/Margins'
import Gaps from '../styles/Gaps'
import { useNavigation } from '@react-navigation/native'
import { Switch } from 'react-native'
import { ThemeToggleContex } from '../Context/ThemeContext'
import BoldFont from '../styles/Bold'
import Colors from '../styles/Colors'
import Auth from '@react-native-firebase/auth'
import Flexes from '../styles/Flexes'
const Setting = () => {
  const { mode, ToggleTheme, Theme } = useContext(ThemeToggleContex)
  const Navigation = useNavigation()
  const [userName, setUserName] = useState('')


  useEffect(() => { // runs automatically when component loads
    const currentUser = Auth().currentUser // gets currently logged in user
    const subscriber = firestore() // sarts fireStore connection
      .collection('users') // accessing user collection
      .doc(currentUser.uid)
      .onSnapshot(documentSnapshot => {      // runs whenever user collection changes

        const data = documentSnapshot.data() //getting single documment data      
        setUserName(data.email)



        // setUsers(userData) //storing all use data 


      })

    return () => subscriber()
  }, [])
  return (
    <View style={[styles.mainContainer, { backgroundColor: Theme.backgroundColor }]}>
      <View style={styles.profileView}>
        <IonIcons name='person-circle-outline' size={Sizes.smallestAndXXL} style={[styles.img, { color: Theme.color }]} />
        <Text style={[styles.usernameTxt, { color: Theme.color }]}>{userName}</Text>
        <IonIcons name="chevron-forward-outline" size={Sizes.TT} style={[styles.iconstyle, { color: Theme.color }]} />
      </View>

      <View>

        <View style={styles.accountContainer}>
          <IonIcons name='person-outline' size={Sizes.TT} style={[styles.leftIcons, { color: Theme.color }]} />
          <Text style={[styles.actTxt, { color: Theme.color }]}>Account</Text>
          <IonIcons name="chevron-forward-outline" size={Sizes.TT} style={[styles.AccountIcon, { color: Theme.color }]} />
        </View>

        <TouchableOpacity style={styles.chatContainer} onPress={() => Navigation.navigate('contacts')}>
          <IonIcons name='chatbubble-outline' size={Sizes.TT} style={[styles.leftIcons, { color: Theme.color }]} />
          <Text style={[styles.chatTxt, { color: Theme.color }]}>Chats</Text>
          <IonIcons name="chevron-forward-outline" size={Sizes.TT} style={[styles.iconstyle, { color: Theme.color }]} />
        </TouchableOpacity>
      </View>

      <View style={styles.SecondContainer}>
        <View style={styles.appearanceView}>
          <IonIcons name='sunny-outline' size={Sizes.TT} style={[styles.leftIcons, { color: Theme.color }]} />
          <Text style={[styles.chatTxt, { color: Theme.color }]}>Appereance</Text>
        </View>

        <View>
          <Switch
            trackColor={{ false: Colors.Grey, true: Colors.skyBlue }}
            thumbColor={mode ? Colors.realBlack : Colors.BasicPrimary}
            ios_backgroundColor={Colors.iosBg}
            onValueChange={ToggleTheme}
            value={mode}
            style={styles.switch}
          />
        </View>
        <View style={styles.appearanceView}>
          <IonIcons name='notifications-outline' size={Sizes.TT} style={[styles.leftIcons, { color: Theme.color }]} />
          <Text style={[styles.chatTxt, { color: Theme.color }]}>Notification</Text>
          <IonIcons name="chevron-forward-outline" size={Sizes.TT} style={[styles.iconstyle, { color: Theme.color }]} />

        </View>
        <View style={styles.appearanceView} >
          <IonIcons name='document-lock-outline' size={Sizes.TT} style={[styles.leftIcons, { color: Theme.color }]} />
          <Text style={[styles.chatTxt, { color: Theme.color }]}>Privacy</Text>
          <IonIcons name="chevron-forward-outline" size={Sizes.TT} style={[styles.iconstyle, { color: Theme.color }]} />

        </View>
        <View style={styles.appearanceView}>
          <IonIcons name='folder-outline' size={Sizes.TT} style={[styles.leftIcons, { color: Theme.color }]} />
          <Text style={[styles.chatTxt, { color: Theme.color }]}>Data Usage</Text>
          <IonIcons name="chevron-forward-outline" size={Sizes.TT} style={[styles.iconstyle, { color: Theme.color }]} />

        </View>
      </View>


      <View style={styles.appearanceView}>
        <IonIcons name="help-circle-outline" size={Sizes.TT} style={[styles.leftIcons, { color: Theme.color }]} />
        <Text style={[styles.chatTxt, { color: Theme.color }]}>Help</Text>
        <IonIcons name="chevron-forward-outline" size={Sizes.TT} style={[styles.Icons, { color: Theme.color }]} />

      </View>
      <View style={styles.appearanceView}>
        <IonIcons name='mail-outline' size={Sizes.TT} style={[styles.leftIcons, { color: Theme.color }]} />
        <Text style={[styles.chatTxt, { color: Theme.color }]}>Invite Your Friends</Text>
        <IonIcons name="chevron-forward-outline" size={Sizes.TT} style={[styles.iconstyle, , { color: Theme.color }]} />
      </View>

      <TouchableOpacity style={styles.sigOutCont} onPress={async () => {
        await Auth().signOut()
        Navigation.replace('Login')

      }}>
        <Text style={[styles.logOutTxt, { color: Theme.color }]}> LogOut </Text>
        <IonIcons name='log-out-outline' size={Sizes.smaller} style={[styles.logOutIcon, , { color: Theme.color }]} />
      </TouchableOpacity>

    </View>
  )
}

export default Setting

const styles = StyleSheet.create({
  mainContainer: {
    flex: Flexes.flexible,
    paddingHorizontal: Padding.small,
    backgroundColor: 'red',
    paddingTop: Padding.TooSmalll
  },

  profileView: {
    flexDirection: 'row',
    paddingTop: Padding.small,
    paddingBottom: Padding.small,
  },

  usernameTxt: {
    fontSize: Sizes.SevnTn,
    fontWeight: BoldFont.largest,
    paddingTop: Padding.extrSmall,
    paddingLeft: Padding.TooSmalll
  },

  accountContainer: {
    flexDirection: 'row',
    gap: Gaps.Middle,
    paddingTop: Padding.smaller

  },

  actTxt: {
    fontSize: Sizes.SmallFtn,
    fontWeight: BoldFont.small
  },

  AccountIcon: {
    position: "absolute",
    top: Margins.Twlv,
    right: Margins.small
  },

  chatContainer: {
    flexDirection: 'row',
    gap: Gaps.Middle,
    paddingTop: Padding.TTSix
  },

  chatTxt: {
    fontSize: Sizes.SmallFtn,
    fontWeight: BoldFont.small
  },

  switch: {
    position: 'absolute',
    right: Margins.small,
    bottom: Margins.smallest
  },

  Icons: {
    position: "absolute",
    top: Margins.Thity,
    right: Margins.small
  },

  iconstyle: {
    position: "absolute",
    top: Margins.TTFor,
    right: Margins.small
  },

  SecondContainer: {
    paddingTop: Padding.middle,
    paddingBottom: Padding.small,
    borderBottomWidth: Sizes.smallestOne,
    borderColor: Colors.primary
  },

  appearanceView: {
    flexDirection: 'row',
    gap: Gaps.Middle,
    paddingTop: Padding.middle
  },
  
  sigOutCont: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: Padding.TooSmallandMiddle
  },

  logOutTxt: {
    fontWeight: BoldFont.large
  },

  logOutIcon: {
    color: Colors.realBlack
  }
})
