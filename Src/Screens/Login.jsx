import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';  // getAuth () gets authentication && creates new user account
import { useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import Padding from '../styles/Padding';
import Sizes from '../styles/Sizes';
import Gaps from '../styles/Gaps';
import Radius from '../styles/Radius';
import BoldFont from '../styles/Bold';
import { ThemeToggleContex } from '../Context/ThemeContext';
const Login = () => {
    const { Theme } = useContext(ThemeToggleContex)
    const Navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const LoginUser = () => {
        firestore().collection('users').where('email', '==', email).get().then(res => {  // checking firestore user collection where email matches eneterd email
            console.log(res) 
        })
        if (!email || !password) { // checking if email  or password is empty
            Alert.alert('error', 'please fill all filds')
            return // stops login process if fields are empty
        }

        signInWithEmailAndPassword(getAuth(), email, password) // logs instace into firebase authentication
            .then(() => {
                console.log('login succees')
                Navigation.navigate('MainTab')
            })
            .catch(error => {
                if (error.code === 'auth/user-not-found') {
                    Alert.alert('error', 'user not registered')
                }
                else if (error.code === 'auth/auth/wrong-password') {
                    Alert.alert('error', 'wrong password')
                }
                else if (error.code === 'auth/auth/wrong-email') {
                    Alert.alert('error', 'wrog email')
                }
                else {
                    Alert.alert('user not found')
                }

            })
    }
    return (
        <View style={[styles.container, { backgroundColor: Theme.backgroundColor }]}>
            <View>
                <Text style={[styles.loginTitleTxt, { color: Theme.color }]}>Login</Text>
            </View>

            <View style={styles.emailinputWrapper}>
                <Text style={[styles.txts, { color: Theme.color }]}>E-mail</Text>
                <TextInput style={[styles.input, { backgroundColor:Theme.userContainerColor }]}
                    placeholder='please Enter you email...'
                    placeholderTextColor={'grey'}
                    value={email}
                    onChangeText={text => setEmail(text)} /> 
            </View>
            <View style={styles.passwordinputWrapper}>
                <Text style={[styles.txts, { color: Theme.color }]}>Password</Text>
                <TextInput style={[styles.input, { backgroundColor:Theme.userContainerColor }]}
                    placeholder='please Enter you email...'
                    placeholderTextColor={'grey'}
                    value={password}
                    onChangeText={text => setPassword(text)} />
            </View>

            <View style={styles.btnWrapper}>
                <TouchableOpacity style={styles.LoginBtn} onPress={LoginUser}>
                    <Text style={styles.txt}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footerWrapper}>

                <Text style={[styles.lastSentence, { color: Theme.color }]}>
                    Don't have an account?
                </Text>
                <TouchableOpacity onPress={() => Navigation.navigate('SignUp')}>
                    <Text style={[styles.SignUpTxt, { color: Theme.color }]}>   SignUp</Text>
                </TouchableOpacity>

            </View>



        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: Padding.small,
        paddingRight: Padding.small,
        paddingTop: Padding.century,
    },

    loginTitleTxt: {
        fontSize: Sizes.small,
        fontWeight: BoldFont.large,
        color: 'blue',
        textAlign: 'center'
    },

    emailinputWrapper: {
        gap: Gaps.small,
        paddingTop: Padding.doubleOfSmall
    },

    txts: {
        fontSize: Sizes.SevnTn
    },

    input: {
        borderWidth: Sizes.smallestOne,
        paddingRight: Padding.middleFourth,
        borderRadius: Radius.Twel,
        paddingLeft: Padding.small,
        paddingTop: Padding.smaller,
        paddingBottom: Padding.smaller
    },

    passwordinputWrapper: {
        gap: Gaps.small,
        paddingTop: Padding.small
    },
    btnWrapper: {
        paddingTop: Padding.middleTriple,
        paddingBottom: Padding.small
    },

    LoginBtn: {
        borderRadius: Radius.middle,
        paddingVertical: Padding.smaller,
        paddingHorizontal: Padding.middleFourthSmall,
        alignSelf: 'center',
        backgroundColor: 'blue'
    },

    txt: {
        color: 'white'
    },

    footerWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    lastSentence: {
        fontSize: 15
    },
    SignUpTxt: {
        fontSize: 14,
        fontWeight: BoldFont.small
    }


})  