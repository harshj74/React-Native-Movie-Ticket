import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
const { height, width } = Dimensions.get('window');

const PasswordChanged = () => {

  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <View style={{ backgroundColor: 'white', display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{}}>
        <Image style={{ width: 400, height:200, resizeMode: 'contain', }} source={require('../../../img/success.png')} /></View>
      <Text style={styles.header}>E-mail Sent !</Text>
      <Text style={{ width: 250, textAlign: 'center', fontSize: 13 }}>Link to reset your password has been dispatched to your email</Text>

      <View style={{ width: 200, alignSelf: 'center', marginTop: 15 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.replace('Login')
          }}
          style={{ ...styles.button, backgroundColor: '#ff5492' }} >
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              fontWeight: 'bold'
            }}>Back To Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default PasswordChanged

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    color: '#ff5492',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5
  },

  button: {
    width: (width * 89) / 100,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 15,
    padding: 10,
  }
})