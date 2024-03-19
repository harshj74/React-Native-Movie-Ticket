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
import mail from '../../../img/mail.png'
import pass from '../../../img/password.png'
import iuser from '../../../img/iuser.png'
import { useDispatch } from 'react-redux';
import Close from '../../../img/close.png'
const { height, width } = Dimensions.get('window');
import auth from '@react-native-firebase/auth'
import Model from '../Model';

const Login = () => {

  const checkLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        AsyncStorage.getItem("login").then((value) => {
          value != null ? navigation.replace('BottomTab') : navigation.replace('Language');
        })
        AsyncStorage.setItem('loggedin','on');
        console.log('signed in !');    
      })
      .catch((error) => {
        setvis(true)
        //console.log(error.code);
        //console.log(error.message);
      })
    {/*firestore()
      .collection('Users')
      .where('email', '==', email)
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot.docs);

        if (querySnapshot.docs.length > 0) {
          if (querySnapshot.docs[0]._data.email === email && querySnapshot.docs[0]._data.password === password) {
            AsyncStorage.getItem("login").then((value) => {
              value != null ? navigation.replace('BottomTab') : navigation.replace('Language');
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
      });*/}
  }

  const [email, setEmail] = useState('');
  const [emailValidError, setEmailValidError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordValidError, setPasswordValidError] = useState('');

  const [emailcheck, setEmailCheck] = useState(true);
  const [passcheck, setPassCheck] = useState(true);

  const [visible, setvisible] = useState(true);

  const [err, seterr] = useState('');
  const [vis, setvis] = useState(false);

  const [er, seter] = useState(false);

  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <View style={{ display: 'flex', flex: 1, backgroundColor: 'white', }}>
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
              <View>
                <Image tintColor='grey' style={styles.icon} source={mail} />
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: emailValidError ? "red" : "lightgrey",
                    borderRadius: 15,
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
                    //console.log(email)
                  }}></TextInput>
              </View>

              {emailValidError ? (
                <Text style={styles.error}>{emailValidError}</Text>
              ) : null}

            </View>

            <View style={styles.container3}>
              <Text style={styles.aboveinput}>Password</Text>
              <View style={{
                flexDirection: 'row',
                borderColor: passwordValidError ? 'red' : 'lightgrey',
                borderRadius: 15,
                borderWidth: 2,
                justifyContent: 'space-between'
              }}>
                <View>
                  <Image tintColor='grey' style={styles.icon1} source={pass} />
                  <TextInput
                    secureTextEntry={visible}
                    style={{ ...styles.input1, marginBottom: 0 }}
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
                </View>
                <TouchableOpacity onPress={() => {
                  setvisible(!visible)
                }}
                  style={{ right: 5, width: 50, alignItems: 'center', justifyContent: "center", alignSelf: 'center' }}>
                  <Image tintColor='grey' style={{ height: 20, width: 20, }} source={visible ? secret : public1}></Image>
                </TouchableOpacity>
              </View>

              {passwordValidError ? (
                <Text style={styles.error}>
                  {passwordValidError}
                </Text>
              ) : null}
            </View>

            <View style={{ alignSelf: "flex-end" }}>
              <TouchableOpacity onPress={() => {
                navigation.replace('ForgotPassword')
              }}>
                <Text style={{ fontSize: 16, color: '#ff5492', fontWeight: 'bold' }}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>



            <View style={{ margin: 10 }}>
              <View style={{ width: 200, alignSelf: 'center' }}>
                <TouchableOpacity
                  style={{ ...styles.button, backgroundColor: !(emailcheck || passcheck) ? '#ff5492' : '#E3E3E3' }}
                  onPress={() => {
                    checkLogin();
                  }}
                  disabled={emailcheck || passcheck}>
                  <Text
                    style={{
                      fontSize: 20,
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

      {vis ? 
        <Model visible={vis} pressOut={() => { setvis(false) }}>
          <View style={{ width: 200 }}>
            <Image
              source={iuser}
              style={{ height: 70, width: 70, padding: 10, alignSelf: 'center', position: 'absolute', bottom: 45 }} />
            <TouchableOpacity
              style={{ alignSelf: 'flex-end', }}
              onPress={() => setvis(false)}>
              <Image
                //tintColor='gray'
                source={Close}
                style={{ height: 18, width: 18, }} />
            </TouchableOpacity>
            <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', marginTop: 12, color:'gray' }}>Invalid login credentials.</Text>
          </View>
        </Model> : null}
      {/* </KeyboardAwareScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({

  icon: {
    position: 'absolute',
    height: 18,
    width: 18,
    marginLeft: 12,
    marginTop: 17
  },

  icon1: {
    position: 'absolute',
    height: 18,
    width: 18,
    marginLeft: 12,
    marginTop: 14
  },
  container: {
    paddingTop: 30,
    backgroundColor: 'white',
    height: '70%',
    //borderWidth:1
  },

  container4: {
    paddingTop: 75,
    alignItems: 'center',
    backgroundColor: 'white',
    //height: '30%',
    justifyContent: 'flex-end',
    //borderWidth:1
  },

  input: {
    fontSize: 15,
    paddingLeft: 40,
    fontWeight: '400',
    // borderWidth: 2,
    //padding: 15,
    marginBottom: 5,
    // borderColor: 'lightgrey',
    //borderRadius: 10,
    color: 'gray'
  },

  input1: {
    fontSize: 15,
    paddingLeft: 38,
    fontWeight: '400',
    // borderWidth: 2,
    //padding: 15,
    marginBottom: 5,
    //borderColor: 'lightgrey',
    //borderRadius: 10,
    color: 'gray'
  },

  button: {
    width: (width * 93) / 100,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 15,
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
    color: 'grey',
    fontWeight: '600',
    marginBottom: 1,
    marginLeft: 5
  },

  error: {
    color: 'red',
    marginLeft: 5,
    fontSize: 12
  },

  container3: {
    marginBottom: 15,
    //borderWidth: 1,com
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