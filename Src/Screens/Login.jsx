import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import { useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import Padding from '../styles/Padding';
import Sizes from '../styles/Sizes';
import Gaps from '../styles/Gaps';
import Radius from '../styles/Radius';
import BoldFont from '../styles/Bold';
const Login = () => {
    const Navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const LoginUser = () => {
        firestore().collection('users').where('email', '==', email).get().then(res => {
            console.log(res)
        })
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
                    Alert.alert('user not found')
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
            <View style={styles.footerWrapper}>

                <Text>
                    Don't have an account?
                </Text>
                <TouchableOpacity style={styles.loginWrapper} onPress={() => Navigation.navigate('SignUp')}>
                    <Text style={{
                        fontSize: 14, fontWeight: '700'
                    }}>   SignUp</Text>
                </TouchableOpacity>

            </View>



        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
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


})  