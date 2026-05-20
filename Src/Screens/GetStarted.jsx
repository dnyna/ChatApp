import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Padding from '../styles/Padding'
import Sizes from '../styles/Sizes'
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
        paddingTop: Padding.middleFourthSmall,
        paddingLeft: Padding.halfCenturyAndExtraSmall,
        paddingBottom: Padding.middle
    },

    img: {
        height: Sizes.TSeOnTOn,
        width: Sizes.ToSxTo
    },

    connectTxt: {
        fontSize: Sizes.small,
        fontWeight: 700,
        textAlign: 'center'
    },

    btnWrapper: {
        paddingTop: Padding.middleTriple,
        paddingBottom: Padding.small
    },

    LoginBtn: {
        borderRadius: 20,
        paddingVertical: Padding.small,
        paddingHorizontal: Padding.century,
        alignSelf: 'center',
        backgroundColor: 'blue'
    },

    txt: {
        color: 'white'
    },
})