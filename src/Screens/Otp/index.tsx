import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import OtpInputs from 'react-native-otp-inputs'
import { useNavigation } from '@react-navigation/native';
const { height, width } = Dimensions.get('window');

const Otp = () => {

    const navigation = useNavigation();

    return (
        <View style={{ backgroundColor: 'white', display: 'flex', flex: 1, alignItems: "center", justifyContent: "space-around", }}>
            <View>
            <Text style={{ fontSize: 25, color: '#ff5492', fontWeight: 'bold', alignSelf:'center' }}>Enter 4 Digit OTP</Text>
            <View>

                <Text style={{ marginVertical: 15, color: 'gray', fontSize: 12, alignSelf: 'flex-start', marginLeft: 22 }}>Enter the OTP code from the email we just sent you.</Text>
                <OtpInputs style={{ flexDirection: 'row' }}
                    handleChange={(code) => console.log(code)}
                    numberOfInputs={4} autofillFromClipboard={false} inputContainerStyles={{ borderWidth: 2, marginHorizontal: 20, borderRadius: 10, paddingHorizontal: 10, borderColor: 'gray', }} inputStyles={{fontSize:20, marginLeft:5}} />
                <View style={{ flexDirection: 'row', marginVertical: 15, alignSelf: 'flex-start', marginLeft: 22 }}>
                    {/* <Text style={styles.secondarylabel}>Didn't receive OTP Code!</Text>
                    <TouchableOpacity><Text style={styles.link}>Resend</Text></TouchableOpacity> */}
                </View>

                <View style={{ margin: 10 }}>
                    <View style={{ width: 200, alignSelf: 'center' }}>
                        <TouchableOpacity
                                onPress={() => {
                                    navigation.replace('CreateNewPassword')
                        }}
                                style={{ ...styles.button, backgroundColor: '#ff5492' }}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}>Verify</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', top: 60 }}>
                <Text style={{ color: 'black', fontSize: 17, marginLeft: 5, }}>Remember Password?</Text>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Login');
                }}>
                    <Text style={{ color: '#ff5492', fontSize: 17, marginLeft: 5, fontWeight: 'bold' }}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Otp

const styles = StyleSheet.create({
    secondarylabel: {
        color: 'gray',
        fontSize: 12,
    },

    link: {
        color: '#ff5492',
        fontSize: 12,
        paddingLeft: 5,
        fontWeight: 'bold',
        //textDecorationLine: 'underline',
    }, 

    button: {
        width: (width * 89) / 100,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 15,
        padding: 10,
        //marginTop: 20,
    }
})