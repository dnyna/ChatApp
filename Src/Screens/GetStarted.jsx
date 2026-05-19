import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
const GetStarted = () => {
    const Illustration = require('../Assets/Illustration.png')
    const Navigation = useNavigation()
    return (
        <View>
            <View style={styles.imgConitainer}>
                <Image source={Illustration} stye={styles.img} />
            </View>
            <Text style={styles.connectTxt}>Connect easily with                    your family and friends            over countries</Text>
            <Text style={{ textAlign: 'center' }}>Terms & Privacy Policy</Text>
            <View style={styles.btnWrapper}>
                <TouchableOpacity style={styles.LoginBtn} onPress={() => Navigation.navigate('SignUp')}>
                    <Text style={styles.txt}>Start Messaging</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default GetStarted

const styles = StyleSheet.create({
    imgConitainer: {
        paddingTop: 135,
        paddingLeft: 55,
        paddingBottom: 32
    },

    img: {
        height: 271,
        width: 262
    },

    connectTxt: {
        fontSize: 24,
        fontWeight: 700,
        textAlign: 'center'
    },

    btnWrapper: {
        paddingTop: 90,
        paddingBottom: 20
    },

    LoginBtn: {
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 100,
        alignSelf: 'center',
        backgroundColor: 'blue'
    },

    txt: {
        color: 'white'
    },
})