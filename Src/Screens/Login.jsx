import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import { useState } from 'react'
const Login = () => {
    const Navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const Img = require('../Assets/loginWithGoogle.png')

    const LoginUser = () => {
        if (!email || !password) {
            Alert.alert('error', 'please fill all filds')
            return
        }

        signInWithEmailAndPassword(getAuth(), email, password)
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
                    Alert.alert('error', error.message)
                }
            })
    }
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.loginTitleTxt}>Login</Text>
            </View>

            <View style={styles.emailinputWrapper}>
                <Text style={styles.txts}>E-mail</Text>
                <TextInput style={styles.input}
                    placeholder='please Enter you email...'
                    placeholderTextColor={'grey'}
                    value={email}
                    onChangeText={text => setEmail(text)} />
            </View>
            <View style={styles.passwordinputWrapper}>
                <Text style={styles.txts}>Password</Text>
                <TextInput style={styles.input}
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

            <View style={{ paddingBottom: 40, paddingTop: 110 }}>
                <Text style={styles.loginWithTxt}>
                    Or Login with.
                </Text>
            </View>
            <TouchableOpacity style={styles.google}>
                <Image source={Img} style={styles.img} />
            </TouchableOpacity>

        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 100,

    },

    loginTitleTxt: {
        fontSize: 25,
        fontWeight: 600,
        color: 'blue',
        textAlign: 'center'
    },

    emailinputWrapper: {
        gap: 20,
        paddingTop: 40
    },

    txts: {
        fontSize: 16
    },

    input: {
        borderWidth: 1,
        paddingRight: 120,
        borderRadius: 12,
        paddingLeft: 20,
        paddingTop: 15,
        paddingBottom: 15

    },

    passwordinputWrapper: {
        gap: 20,
        paddingTop: 30
    },
    btnWrapper: {
        paddingTop: 90,
        paddingBottom: 20
    },
    LoginBtn: {
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 140,
        alignSelf: 'center',
        backgroundColor: 'blue'
    },
    txt: {
        color: 'white'
    },
    google: {
        alignSelf: 'center'
    },
    img: {
        height: 40,
        width: 300
    },
    loginWithTxt: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '600'
    }
})  