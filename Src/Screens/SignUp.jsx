import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { getAuth, createUserWithEmailAndPassword } from '@react-native-firebase/auth'; // getAuth () gets authentication && creates new user account
import { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import Padding from '../styles/Padding'
import Sizes from '../styles/Sizes';
import Radius from '../styles/Radius';
import Gaps from '../styles/Gaps';
import BoldFont from '../styles/Bold';
import { ThemeToggleContex } from '../Context/ThemeContext';
import Colors from '../styles/Colors';
const SignUp = () => {
    const { Theme } = useContext(ThemeToggleContex)
    const Navigation = useNavigation()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')


    const createUser = async () => {
        if (password !== confPassword) {
            Alert.alert('password is not matching')
            return // stops execution if passwords are not matching
        }
        createUserWithEmailAndPassword(getAuth(), email, password)
            .then(async userCredential => {

                const user = userCredential.user
                await firestore()
                    .collection('users')  // accessing user collection
                    .doc(user.uid) // using firebase user UID as document id
                    .set({ // storing userData

                        id: user.uid,
                        email: email,
                        name: name,
                        createdAt: firestore.FieldValue.serverTimestamp() // store firebase server time
                    }).then(res => {
                        console.log('userAccount got created')

                    })
                Navigation.navigate('Login')

            })
            .catch(error => {
                console.log(error)
                Alert.alert(' user not found')
            }
            )

    }
    return (
        <View style={[styles.container, { backgroundColor: Theme.backgroundColor }]}>
            <View style={styles.headerTitle}>
                <Text style={styles.signUpTxt}>SignUp</Text>
            </View>
            <View>
                <Text style={{ textAlign: 'center' }}>SignUp to start chat</Text>

            </View>
            <View style={styles.emailinputWrapper}>
                <Text style={[styles.inputTxt, { color: Theme.color }]}>name</Text>
                <TextInput style={[styles.input, { backgroundColor: Theme.userContainerColor }]}
                    placeholder='please Enter you email'
                    placeholderTextColor={'grey'}
                    value={name}
                    onChangeText={text => setName(text)} />
            </View>

            <View style={styles.emailinputWrapper}>
                <Text style={[styles.inputTxt, { color: Theme.color }]}>E-mail</Text>
                <TextInput style={[styles.input, { backgroundColor: Theme.userContainerColor }]}
                    placeholder='please Enter you email'
                    placeholderTextColor={'grey'}
                    value={email}
                    onChangeText={text => setEmail(text)} />
            </View>
            <View style={styles.passwordinputWrapper}>
                <Text style={[styles.inputTxt, { color: Theme.color }]}>Password</Text>
                <TextInput style={[styles.input, { backgroundColor: Theme.userContainerColor }]}
                    placeholder='please Enter you email'
                    placeholderTextColor={'grey'}
                    value={password}
                    onChangeText={text => setPassword(text)} />
            </View>
            <View style={styles.passwordinputWrapper}>
                <Text style={[styles.inputTxt, { color: Theme.color }]}>Confirm Password</Text>
                <TextInput style={[styles.input, { backgroundColor: Theme.userContainerColor }]}
                    placeholder='please Enter you email'
                    placeholderTextColor={'grey'}
                    value={confPassword}
                    onChangeText={text => setConfPassword(text)} />
            </View>
            <View style={styles.btnWrapper}>
                <TouchableOpacity style={styles.creteAcntBtn} onPress={createUser}>
                    <Text style={[styles.txt, { color: Theme.color }]}>Create account</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footerWrapper}>

                <Text style={[styles.alredyActTxt, { color: Theme.color }]}>
                    Already have an account?
                </Text>
                <TouchableOpacity onPress={() => Navigation.navigate('Login')}>
                    <Text style={[styles.loginTxt, { color: Theme.color }]}>   Login</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: Padding.small,
        paddingRight: Padding.small,
        paddingTop: Padding.century,

    },
    headerTitle: {
        paddingBottom: Padding.TooSmalll
    },

    emailinputWrapper: {
        gap: Gaps.small,
        paddingTop: Padding.TooSmalll
    },

    inputTxt: {
        color: 'black'
    },

    input: {
        borderWidth: Sizes.smallestOne,
        paddingRight: Padding.middleFourth,
        borderRadius: Radius.smallerOne,
        paddingLeft: Padding.small,
        color: 'black'
    },

    passwordinputWrapper: {
        gap: Gaps.small,
        paddingTop: Padding.middle
    },

    btnWrapper: {
        paddingTop: Padding.middleTriple,
        paddingBottom: Padding.small
    },

    creteAcntBtn: {
        borderRadius: Radius.middle,
        paddingVertical: Padding.smaller,
        paddingLeft: Padding.century,
        paddingRight: Padding.century,
        alignSelf: 'center',
        backgroundColor: 'blue'
    },

    txt: {
        color: 'white',
        fontSize: Sizes.SevnTn
    },

    footerWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },

    alredyActTxt: {
        color: 'black'
    },

    signUpTxt: {
        fontSize: Sizes.small,
        fontWeight: BoldFont.large,
        color: Colors.blue,
        textAlign: 'center'
    },

    loginTxt: {
        fontSize: 14,
        fontWeight: BoldFont.small

    }
})  