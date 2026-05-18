import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { FlatList, TextInput } from 'react-native-gesture-handler'
const ChatList = () => {
  const RenderItems = () => {
    <View style={{ paddingTop: 20 }}>
      <View style={{
        borderWidth: 1, borderColor: 'black', height: 80,
        width: '80%'
      }}>
        <Text>name</Text>
        <Text>Last seen</Text>
      </View>
      <View>
        <Text>name</Text>
        <Text>Last seen</Text>
      </View>
      <View>
        <Text>name</Text>
        <Text>Last seen</Text>
      </View>
    </View>
  }
  return (
    <View style={styles.container}>
      <IonIcons name='add-outline' style={styles.addIcon} size={20} />
      <View style={styles.searchContainer}>
        <TextInput
          placeholder='search'
          style={styles.searchInput} />
        <IonIcons name='search-outline' size={30} style={styles.searchIcon}></IonIcons>
        <View>
          <FlatList
            renderItem={RenderItems}
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
    paddingLeft: 50
  },
  searchIcon: {
    position: 'absolute',
    top: 19,
    left: 30
  },
  searchContainer: {
    paddingHorizontal: 15,
    paddingTop: 20
  }
})