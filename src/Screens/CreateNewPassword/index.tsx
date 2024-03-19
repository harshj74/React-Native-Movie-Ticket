import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import password from '../../../img/password.png'
const { height, width } = Dimensions.get('window');

const CreateNewPassword = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');

    return (
        <View style={{ backgroundColor: 'white', display: 'flex', flex: 1, alignItems: "center", justifyContent: "space-around", borderWidth: 1 }}>

            <View>
                <Text style={styles.header}>Create new Password</Text>

                <View style={styles.container1}>
                    <Text style={styles.aboveinput}>New Password</Text>
                    <View>
                        <Image tintColor='grey' style={styles.icon} source={password} />
                        <TextInput
                            style={{
                                ...styles.input,
                                borderColor: 'lightgrey',
                                borderRadius: 15,
                                borderWidth: 2
                            }}
                            placeholder="Enter new password"
                            value={pass1}
                            onChangeText={text => {
                                setPass1(text);
                            }}></TextInput>
                        <View style={{ marginBottom: 15 }}></View>
                    </View>

                    <Text style={styles.aboveinput}>Confirm Password</Text>
                    <View>
                        <Image tintColor='grey' style={styles.icon} source={password} />
                        <TextInput
                            style={{
                                ...styles.input,
                                borderColor: 'lightgrey',
                                borderRadius: 15,
                                borderWidth: 2
                            }}
                            placeholder="Enter confirm password"
                            value={pass2}
                            onChangeText={text => {
                                setPass2(text);
                            }}></TextInput>
                        <Text style={{ color: 'transparent', fontSize: 12, marginLeft: 5 }}>* We will send you a message to set or reset your new password</Text>
                    </View>

                    <View style={{ width: 200, alignSelf: 'center' }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.replace('PasswordChanged');
                            }}
                            style={{ ...styles.button, backgroundColor: '#ff5492' }} >
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}>Reset Password</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
            <View></View>
        </View>
    )
}

export default CreateNewPassword

const styles = StyleSheet.create({
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
        //marginVertical: 15
    }
})