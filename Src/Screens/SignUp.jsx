import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { getAuth, createUserWithEmailAndPassword } from '@react-native-firebase/auth';
import { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import Padding  from '../styles/Padding'
import Sizes from '../styles/Sizes';
const SignUp = () => {
    const Navigation = useNavigation()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')


    const createUser = async () => {
        if (password !== confPassword) {
            Alert.alert('password is not matching')
        }
        createUserWithEmailAndPassword(getAuth(), email, password)
            .then(async userCredential => {

                const user = userCredential.user
                await firestore()
                    .collection('users')
                    .doc(user.uid)
                    .set({

                        ud: user.uid,
                        email: email,
                        name:name,
                        createdAt: firestore.FieldValue.serverTimestamp()
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
        <View style={styles.container}>
            <View style={styles.headerTitle}>
                <Text style={styles.signUpTxt}>SignUp</Text>
            </View>
            <View>
                <Text style={{ textAlign: 'center' }}>SignUp to start chat</Text>

            </View>
            <View style={styles.emailinputWrapper}>
                <Text>name</Text>
                <TextInput style={styles.input}
                    placeholder='please Enter you email'
                    placeholderTextColor={'grey'}
                    value={name}
                    onChangeText={text => setName(text)} />
            </View>

            <View style={styles.emailinputWrapper}>
                <Text>E-mail</Text>
                <TextInput style={styles.input}
                    placeholder='please Enter you email'
                    placeholderTextColor={'grey'}
                    value={email}
                    onChangeText={text => setEmail(text)} />
            </View>
            <View style={styles.passwordinputWrapper}>
                <Text>Password</Text>
                <TextInput style={styles.input}
                    placeholder='please Enter you email'
                    placeholderTextColor={'grey'}
                    value={password}
                    onChangeText={text => setPassword(text)} />
            </View>
            <View style={styles.passwordinputWrapper}>
                <Text>Confirm Password</Text>
                <TextInput style={styles.input}
                    placeholder='please Enter you email'
                    placeholderTextColor={'grey'}
                    value={confPassword}
                    onChangeText={text => setConfPassword(text)} />
            </View>
            <View style={styles.btnWrapper}>
                <TouchableOpacity style={styles.creteAcntBtn} onPress={createUser}>
                    <Text style={styles.txt}>Create account</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footerWrapper}>

                <Text>
                    Already have an account?
                </Text>
                <TouchableOpacity style={styles.loginWrapper} onPress={() => Navigation.navigate('Login')}>
                    <Text style={{
                        fontSize: 14, fontWeight: '700'
                    }}>   Login</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        paddingLeft: Padding.small,
        paddingRight: Padding.small,
        paddingTop: Padding.century,

    },
    headerTitle: {
        paddingBottom: Padding.TooSmalll
    },

    emailinputWrapper: {
        gap: 20,
        paddingTop:Padding.TooSmalll
    },

    input: {
        borderWidth: Sizes.smallestOne,
        paddingRight: Padding.middleFourth,
        borderRadius: 8,
        paddingLeft: Padding.small,
        color: 'black'

    },

    passwordinputWrapper: {
        gap: 20,
        paddingTop: Padding.middle
    },

    btnWrapper: {
        paddingTop: Padding.middleTriple,
        paddingBottom: Padding.small
    },

    creteAcntBtn: {
        borderRadius: 20,
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

    signUpTxt: {
        fontSize: Sizes.small,
        fontWeight: 600,
        color: 'blue',
        textAlign: 'center'
    }
})  