import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import firestore, { firebase } from '@react-native-firebase/firestore';
import Header from '../Header'
import back from '../../../img/back.png'
import mail from '../../../img/mail.png'
import Close from '../../../img/close.png'
import alert from '../../../img/alert.png'
import { useNavigation } from '@react-navigation/native'
import Model from '../Model';
import auth from '@react-native-firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const { height, width } = Dimensions.get('window');

const ForgotPassword = () => {

    const navigation = useNavigation();
    const [show, setshow] = useState(false);
    const [email, setEmail] = useState('');

    const Onsubmit = () => {
        firestore()
            .collection('Users')
            .where('email', '==', email)
            .get()
            .then(
                querySnapshot => {
                    console.log(querySnapshot.docs);
                    if (querySnapshot.docs.length > 0) {
                        setshow(false)
                        auth().sendPasswordResetEmail(email)
                        console.log('Email sent successfully !');
                        navigation.replace('PasswordChanged')
                    }
                    else {
                        setshow(true)
                    }
                })

    }

    return (
        <View style={{ backgroundColor: 'white', display: 'flex', flex: 1, alignItems: "center", justifyContent: "space-around", }}>

            <View>
                <Text style={styles.header}>Forgot Password?</Text>

                <View style={styles.container1}>
                    <Text style={styles.aboveinput}>Email</Text>
                    <View>
                        <Image tintColor='grey' style={styles.icon} source={mail} />
                        <TextInput
                            style={{
                                ...styles.input,
                                borderColor: 'lightgrey',
                                borderRadius: 15,
                                borderWidth: 2
                            }}
                            placeholder="Enter your email address"
                            value={email}
                            onChangeText={text => {
                                setEmail(text);
                            }}></TextInput>
                        <Text style={{ color: 'gray', fontSize: 12, marginLeft: 5 }}>* We will send you a message to set or reset your new password</Text>

                        {/* {show ? <Text style={{ color: 'red', fontSize: 12, marginLeft: 5 }}>Kindly double-check the credentials you provided</Text> : null} */}

                        <View style={{ margin: 15 }}>
                            <View style={{ width: 200, alignSelf: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        Onsubmit();
                                    }}
                                    style={{ ...styles.button, backgroundColor: '#ff5492' }} >
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            color: 'white',
                                            fontWeight: 'bold'
                                        }}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{ flexDirection: 'row', top: 60 }}>
                <Text style={{ color: 'black', fontSize: 17, marginLeft: 5, }}>Remember Password?</Text>
                <TouchableOpacity onPress={() => {
                    navigation.replace('Login');
                }}>
                    <Text style={{ color: '#ff5492', fontSize: 17, marginLeft: 5, fontWeight: 'bold' }}>Login</Text>
                </TouchableOpacity>
            </View>
            {
                show ?
                    <Model pressOut={() => { setshow(false) }}
                        visible={show}>
                        <View style={{ width: 200 }}>
                            <Image
                                source={alert}
                                style={{ height: 70, width: 70, padding: 10, alignSelf: 'center', position: 'absolute', bottom: 50 }} />
                            <TouchableOpacity
                                style={{ alignSelf: 'flex-end', }}
                                onPress={() => setshow(false)}>
                                <Image
                                    //tintColor='gray'
                                    source={Close}
                                    style={{ height: 18, width: 18, }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', marginTop: 12 }}>Kindly double-check the credentials</Text>
                        </View>
                    </Model> : null
            }
        </View>
    )
}


export default ForgotPassword

const styles = StyleSheet.create({
    container: {
        paddingTop: 150,
        alignItems: 'center',
        backgroundColor: 'white',
        //height: '30%',
        justifyContent: 'flex-end',
        //borderWidth: 1
    },

    header: {
        fontSize: 25,
        color: '#ff5492',
        fontWeight: 'bold',
        textAlign: 'center',
        //marginBottom: 10,
        //marginLeft: 15,
        //marginRight: 15,
    },

    aboveinput: {
        color: 'grey',
        fontWeight: '600',
        marginBottom: 1,
        marginLeft: 5
    },

    container1: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginHorizontal: 15,
        marginVertical: 15,
        //borderWidth:1
    },

    icon: {
        position: 'absolute',
        height: 18,
        width: 18,
        marginLeft: 12,
        marginTop: 17
    },

    input: {
        fontSize: 15,
        paddingLeft: 40,
        fontWeight: '400',
        marginBottom: 5,
    },

    button: {
        width: (width * 89) / 100,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 15,
        padding: 10,
        marginVertical: 15
    }
})