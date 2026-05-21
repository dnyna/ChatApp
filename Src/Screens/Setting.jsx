import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
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
const Setting = ({ route }) => {
  const recieverName = route.params?.recieverName
  const { mode, ToggleTheme, Theme } = useContext(ThemeToggleContex)
  const Navigation = useNavigation()
  const Img = require('../Assets/avatar.png')

  return (
    <View style={[styles.mainContainer, { backgroundColor: Theme.backgroundColor }]}>
      <View style={styles.profileView}>
        <Image source={Img} style={[styles.img, { color: Theme.color }]} />
        <Text style={[styles.usernameTxt, { color: Theme.color }]}>{recieverName}</Text>

        <IonIcons name="chevron-forward-outline" size={22} style={[styles.iconstyle, , { color: Theme.color }]} />

      </View>
      <View>
        <View style={styles.accountContainer}>
          <IonIcons name='person-outline' size={22} style={styles.leftIcons} />
          <Text style={[styles.actTxt, { color: Theme.color }]}>Account</Text>
          <IonIcons name="chevron-forward-outline" size={22} style={[styles.AccountIcon, { color: Theme.color }]} />
        </View>
        <TouchableOpacity style={styles.chatContainer} onPress={() => Navigation.navigate('contacts')}>
          <IonIcons name='chatbubble-outline' size={22} style={styles.leftIcons} />
          <Text style={[styles.chatTxt, { color: Theme.color }]}>Chats</Text>
          <IonIcons name="chevron-forward-outline" size={22} style={[styles.iconstyle, , { color: Theme.color }]} />

        </TouchableOpacity>
      </View>

      <View style={styles.SecondContainer}>
        <View style={styles.appearanceView}>
          <IonIcons name='sunny-outline' size={22} style={styles.leftIcons} />
          <Text style={[styles.chatTxt, { color: Theme.color }]}>Appereance</Text>
        </View>

        <View>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={mode ? '#0e0e0d' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={ToggleTheme}
            value={mode}
            style={styles.switch}
          />
        </View>
        <View style={styles.appearanceView}>
          <IonIcons name='notifications-outline' size={22} style={styles.leftIcons} />
          <Text style={[styles.chatTxt, { color: Theme.color }]}>Notification</Text>
          <IonIcons name="chevron-forward-outline" size={22} style={[styles.iconstyle, , { color: Theme.color }]} />

        </View>
        <View style={styles.appearanceView} >
          <IonIcons name='document-lock-outline' size={22} style={styles.leftIcons} />
          <Text style={[styles.chatTxt, { color: Theme.color }]}>Privacy</Text>
          <IonIcons name="chevron-forward-outline" size={22} style={[styles.iconstyle, , { color: Theme.color }]} />

        </View>
        <View style={styles.appearanceView}>
          <IonIcons name='folder-outline' size={22} style={styles.leftIcons} />
          <Text style={[styles.chatTxt, { color: Theme.color }]}>Data Usage</Text>
          <IonIcons name="chevron-forward-outline" size={22} style={[styles.iconstyle, , { color: Theme.color }]} />

        </View>
      </View>


      <View style={styles.appearanceView}>
        <IonIcons name="help-circle-outline" size={22} style={styles.leftIcons} />
        <Text style={[styles.chatTxt, { color: Theme.color }]}>Help</Text>
        <IonIcons name="chevron-forward-outline" size={22} style={[styles.Icons, , { color: Theme.color }]} />

      </View>
      <View style={styles.appearanceView}>
        <IonIcons name='mail-outline' size={22} style={styles.leftIcons} />
        <Text style={[styles.chatTxt, { color: Theme.color }]}>Invite Your Friends</Text>
        <IonIcons name="chevron-forward-outline" size={22} style={[styles.iconstyle, , { color: Theme.color }]} />

      </View>

    </View>
  )
}

export default Setting

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: Padding.small,
    backgroundColor: 'white',
    paddingTop: Padding.TooSmalll
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

  usernameTxt: {
    fontSize: Sizes.SevnTn,
    fontWeight: BoldFont.small
  },

  accountContainer: {
    flexDirection: 'row',
    gap: Gaps.Middle,
    paddingTop: Padding.smaller

  },

  leftIcons: {
    paddingTop: Padding.smalestOne
  },

  actTxt: {
    fontSize: Sizes.smaller,
    fontWeight: BoldFont.small
  },

  AccountIcon: {
    position: "absolute",
    top: Margins.inBetween,
    right: Margins.small
  },

  chatContainer: {
    flexDirection: 'row',
    gap: Gaps.Middle,
    paddingTop: Padding.middle
  },

  chatTxt: {
    fontSize: Sizes.smaller,
    fontWeight: BoldFont.small
  },

  switch: {
    position: 'absolute',
    right: 10,
    bottom: 1
  },

  Icons: {
    position: "absolute",
    top: Margins.Thity,
    right: Margins.small
  },

  iconstyle: {
    position: "absolute",
    top: Margins.large,
    right: Margins.small
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
