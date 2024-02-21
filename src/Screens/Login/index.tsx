import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { handleEmail, handleMobileno, handlePassword, handleUsername } from '../../Utils';
import MovieTicket from '../../../img/MovieTicket.png';
import firestore, { firebase } from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import secret from '../../../img/secret.png'
import public1 from '../../../img/public.png'
const { height, width } = Dimensions.get('window');

const Login = () => {

  const checkLogin = () => {
    firestore()
      .collection('Users')
      .where('email', '==', email)
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot.docs);

        if (querySnapshot.docs.length > 0) {
          if (querySnapshot.docs[0]._data.email === email && querySnapshot.docs[0]._data.password === password) {
            AsyncStorage.getItem("login").then((value) => {
              value != null ? navigation.replace('MyDrawer') : navigation.replace('Language');
            })
            //navigation.replace('Language')
            setEmail('');
            setPassword('');
          } else {
            Alert.alert("Incorrect email id or password !");
          }

          console.log(
            querySnapshot.docs[0]._data.email +
            ' ' +
            querySnapshot.docs[0]._data.password
          );
        } else {
          Alert.alert("Account not found !");
          console.log('account not found');
        }
      });
  }

  const [email, setEmail] = useState('');
  const [emailValidError, setEmailValidError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordValidError, setPasswordValidError] = useState('');

  const [emailcheck, setEmailCheck] = useState(true);
  const [passcheck, setPassCheck] = useState(true);

  const [visible, setvisible] = useState(true);

  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <View style={{ flex: 1 }}>
      {/* <ScrollView> */}

      {/* <KeyboardAwareScrollView bounces={false}  > */}
      <View style={styles.container4}>
        <Image source={MovieTicket} style={styles.innerimage} />
        <View style={styles.innercontainer}>
          <Text style={styles.text1}>MOVIE</Text>
          <Text style={styles.text2}>TICKET</Text>
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.header}>Login</Text>
        <View style={styles.container2}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container3}>
              <Text style={styles.aboveinput}>Email</Text>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: 'lightgrey',
                  borderRadius: 10,
                  borderWidth: 2
                }}
                placeholder="Enter your Email"
                value={email}
                onChangeText={text => {
                  setEmail(text);
                  const value = handleEmail(text);
                  if (!value) {
                    setEmailCheck(false);
                    setEmailValidError('');
                  } else {
                    setEmailValidError(value);
                  }
                }}></TextInput>

              {emailValidError ? (
                <Text style={styles.error}>{emailValidError}</Text>
              ) : null}
            </View>

            <View style={styles.container3}>
              <Text style={styles.aboveinput}>Password</Text>
              <View style={{
                flexDirection: 'row',
                borderColor: 'lightgrey',
                borderRadius: 10,
                borderWidth: 2,
                justifyContent: 'space-between'
              }}>
                <TextInput
                  secureTextEntry={visible}
                  style={{ ...styles.input, marginBottom:0}}
                  placeholder="Password"
                  value={password}
                  onChangeText={pass => {
                    setPassword(pass);
                    const value = handlePassword(pass);
                    if (!value) {
                      setPassCheck(false);
                      setPasswordValidError('');
                    } else {
                      setPasswordValidError(value);
                    }
                  }}></TextInput>
                <TouchableOpacity onPress={() => {
                  setvisible(!visible)
                }}
                  style={{ right: 5, width: 50, alignItems: 'center', justifyContent: "center", alignSelf: 'center' }}>
                  <Image tintColor='grey' style={{ height: 20, width: 20, }} source={visible? secret : public1}></Image>
                </TouchableOpacity>
              </View>

              {passwordValidError ? (
                <Text style={styles.error}>
                  {passwordValidError}
                </Text>
              ) : null}
            </View>



            <View style={{ margin: 10 }}>
              <View style={{ width: 200, alignSelf: 'center' }}>
                <TouchableOpacity
                  style={{ ...styles.button, backgroundColor: !(emailcheck || passcheck) ? '#ff5492' : '#E3E3E3' }}
                  onPress={() => {
                    checkLogin();
                    //navigation.navigate('Language');
                  }}
                  disabled={emailcheck || passcheck}>
                  <Text
                    style={{
                      fontSize: 25,
                      color: !(emailcheck || passcheck) ? 'white' : 'grey',
                      fontWeight: 'bold'
                    }}>Login</Text>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: 15 }}>
                <Text style={{ fontSize: 17, color: 'black' }}>Don't have any account? </Text>
                <TouchableOpacity onPress={() => {
                  navigation.navigate('Signup');
                }}><Text style={{ fontSize: 17, color: '#ff5492', fontWeight: 'bold' }}>Sign Up</Text></TouchableOpacity>
              </View>

            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
      {/* </KeyboardAwareScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: 'white',
    height: '70%'
  },

  container4: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: '30%',
    justifyContent: 'flex-end',
  },

  input: {
    fontSize: 20,
    // borderWidth: 2,
    padding: 15,
    marginBottom: 5,
    // borderColor: 'lightgrey',
    //borderRadius: 10,
    color: 'black'
  },

  button: {
    width: (width * 93) / 100,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    //elevation: 10,

  },

  header: {
    fontSize: 30,
    color: '#ff5492',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
  },

  container2: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: 15,
  },

  aboveinput: {
    color: 'black',
    marginBottom: 1,
  },

  error: {
    color: 'red',
  },

  container3: {
    marginBottom: 15,
  },

  innerimage: {
    alignItems: 'center',
    resizeMode: 'contain',
    width: 100,
    height: 100,
  },

  text1: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '900',
    color: '#ff5492',
  },

  text2: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '900',
    color: '#54768a'
  },

  innercontainer: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'space-between',
    columnGap: 5
  }
});

export default Login;