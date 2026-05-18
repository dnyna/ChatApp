import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { getAuth, createUserWithEmailAndPassword } from '@react-native-firebase/auth';
import { useState } from 'react';
const SignUp = () => {
    const Navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const createUser = () => {
        createUserWithEmailAndPassword(getAuth(), email, password)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
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
                    placeholderTextColor={'grey'} />
            </View>
            <View style={styles.btnWrapper}>
                <TouchableOpacity style={styles.creteAcntBtn} onPress={() => { createUser('Login') }}>
                    <Text style={styles.txt}>Create account</Text>
                </TouchableOpacity>
            </View>
            <View style={{ paddingBottom: 135 }}>

                <Text>
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </Text>
                <TouchableOpacity style={styles.loginWrapper} onPress={() => Navigation.navigate('Login')}>
                    <Text style={{
                        textAlign: 'center', color
                            : "blue", fontSize: 18, fontWeight: '700'
                    }}>Login</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 100,

    },
    headerTitle: {
        paddingBottom: 10
    },

    emailinputWrapper: {
        gap: 20,
        paddingTop: 40
    },

    input: {
        borderWidth: 1,
        paddingRight: 120,
        borderRadius: 8,
        paddingLeft: 20,

    },

    passwordinputWrapper: {
        gap: 20,
        paddingTop: 30
    },

    btnWrapper: {
        paddingTop: 90,
        paddingBottom: 20
    },

    creteAcntBtn: {
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 110,
        alignSelf: 'center',
        backgroundColor: 'blue'
    },

    txt: {
        color: 'white',
        fontSize: 17
    },

    loginWrapper: {
        paddingTop: 30
    },

    signUpTxt: {
        fontSize: 25,
        fontWeight: 600,
        color: 'blue',
        textAlign: 'center'
    }
})  