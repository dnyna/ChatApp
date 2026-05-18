import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
const Login = () => {
    const Navigation = useNavigation()

    const Img = require('../Assets/loginWithGoogle.png')
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.loginTitleTxt}>Login</Text>
            </View>

            <View style={styles.emailinputWrapper}>
                <Text style={styles.txts}>E-mail</Text>
                <TextInput style={styles.input}
                    placeholder='please Enter you email...'
                    placeholderTextColor={'grey'} />
            </View>
            <View style={styles.passwordinputWrapper}>
                <Text style={styles.txts}>Password</Text>
                <TextInput style={styles.input}
                    placeholder='please Enter you email...'
                    placeholderTextColor={'grey'} />
            </View>

            <View style={styles.btnWrapper}>
                <TouchableOpacity style={styles.LoginBtn} onPress={() => Navigation.navigate('ChatList')}>
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