import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { handleEmail, handleMobileno, handlePassword, handleUsername, handleName } from '../../Utils';
import firestore, { firebase } from '@react-native-firebase/firestore';
import messeging from '@react-native-firebase/messaging';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import reject from '../../../img/reject.png'
import Close from '../../../img/close.png'
import secret from '../../../img/secret.png'
import public1 from '../../../img/public.png'
import nam from '../../../img/name.png'
import usr from '../../../img/user.png'
import phone from '../../../img/phone.png'
import mail from '../../../img/mail.png'
import pass from '../../../img/password.png'
import auth from '@react-native-firebase/auth'
import Model from '../Model';
const { height, width } = Dimensions.get('window');

const SignUp = () => {

  const saveData = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('User account created', res.user.uid);
        firestore()
          .collection('Users')
          .doc(res.user.uid)
          .set({
            name: name,
            username: username,
            mobile: mobileno,
            email: email,
            //password: password,
          })
          .then(() => {
            console.log('User added!');
            navigation.goBack();
          });
      })
      .catch(error => {
        //if (error.code === 'auth/email-already-in-use') {
        //console.log('That email address is already in use!');
        seterr('The email provided is already associated with an account.')
        setvis(true)
        // }

        // if (error.code === 'auth/invalid-email') {
        //   //console.log('That email address is invalid!');
        //   seterr('That email address is invalid!')
        //   setvis(true)
        // }

        // console.error(error);
      });
  }

  const [email, setEmail] = useState('');
  const [emailValidError, setEmailValidError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordValidError, setPasswordValidError] = useState('');

  const [username, setUsername] = useState('');
  const [userValidError, setUserValidError] = useState('');

  const [name, setName] = useState('');
  const [nameValidError, setNameValidError] = useState('');

  const [mobileno, setMobileno] = useState('');
  const [mobileValidError, setMobileValidError] = useState('');

  const [emailcheck, setEmailCheck] = useState(true);
  const [passcheck, setPassCheck] = useState(true);
  const [usercheck, setUserCheck] = useState(true);
  const [mobilecheck, setMobileCheck] = useState(true);
  const [namecheck, setNameCheck] = useState(true);

  const [visible, setvisible] = useState(true);

  const [err, seterr] = useState('');
  const [vis, setvis] = useState(false);

  const navigation = useNavigation<NavigationProp<any>>();

  return (

    <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Text style={styles.header}>Sign Up</Text>
        <View style={styles.container2}>

          <View style={styles.container3}>
            <Text style={styles.aboveinput}>Name</Text>
            <View>
              <Image tintColor='grey' style={styles.icon} source={nam} />
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: nameValidError ? 'red' : 'lightgrey',
                  borderRadius: 15,
                  borderWidth: 2
                }}
                placeholder="Enter your Name"
                value={name}
                onChangeText={user => {
                  setName(user);
                  const value = handleName(user);
                  if (!value) {
                    setNameCheck(false);
                    setNameValidError('');
                  } else {
                    setNameValidError(value);
                  }
                }}></TextInput></View>

            {nameValidError ? (
              <Text style={styles.error}>{nameValidError}</Text>
            ) : null}
          </View>

          <View style={styles.container3}>
            <Text style={styles.aboveinput}>Username</Text>
            <View>
              <Image tintColor='grey' style={styles.icon} source={usr} />
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: userValidError ? 'red' : 'lightgrey',
                  borderRadius: 15,
                  borderWidth: 2
                }}
                placeholder="Enter your Username"
                value={username}
                onChangeText={user => {
                  setUsername(user);
                  const value = handleUsername(user);
                  if (!value) {
                    setUserCheck(false);
                    setUserValidError('');
                  } else {
                    setUserValidError(value);
                  }
                }}></TextInput>
            </View>

            {userValidError ? (
              <Text style={styles.error}>{userValidError}</Text>
            ) : null}
          </View>



          <View style={styles.container3}>
            <Text style={styles.aboveinput}>Mobile No</Text>
            <View>
              <Image tintColor='grey' style={styles.icon} source={phone} />
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: mobileValidError ? 'red' : 'lightgrey',
                  borderRadius: 15,
                  borderWidth: 2
                }}
                placeholder="+91   |   Enter your Mobile No"
                value={mobileno}
                onChangeText={mob => {
                  setMobileno(mob);
                  const value = handleMobileno(mob);
                  if (!value) {
                    setMobileCheck(false);
                    setMobileValidError('');
                  } else {
                    setMobileValidError(value);
                  }
                }}></TextInput></View>

            {mobileValidError ? (
              <Text style={styles.error}>{mobileValidError}</Text>
            ) : null}
          </View>

          <View style={styles.container3}>
            <Text style={styles.aboveinput}>Email</Text>
            <View>
              <Image tintColor='grey' style={styles.icon} source={mail} />
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: emailValidError ? 'red' : 'lightgrey',
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
                }}></TextInput></View>

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
                  }}></TextInput></View>
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



          <View style={{ margin: 10 }}>
            <View style={{ width: 200, alignSelf: 'center' }}>
              <TouchableOpacity
                style={{ ...styles.button, backgroundColor: !(emailcheck || passcheck || usercheck || mobilecheck || namecheck) ? '#ff5492' : '#E3E3E3' }}
                onPress={() => {
                  saveData();
                  //navigation.navigate('Login');
                }}
                disabled={emailcheck || passcheck || usercheck || mobilecheck || namecheck}>
                <Text style={{ fontSize: 20, color: !(emailcheck || passcheck || usercheck || mobilecheck || namecheck) ? 'white' : 'grey', fontWeight: 'bold' }}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: 15 }}>
              <Text style={{ fontSize: 17, color: 'black' }}>Already a member? </Text>
              <TouchableOpacity onPress={() => {
                navigation.navigate('Login');
              }}><Text style={{ fontSize: 17, color: '#ff5492', fontWeight: 'bold' }}>Login</Text></TouchableOpacity>
            </View>

            {err ? <Model visible={vis} pressOut={() => { setvis(false) }}>
              <View style={{ width: 200 }}>
                <Image
                  source={reject}
                  style={{ height: 70, width: 70, padding: 10, alignSelf: 'center', position: 'absolute', bottom: 65 }} />
                <TouchableOpacity
                  style={{ alignSelf: 'flex-end', }}
                  onPress={() => setvis(false)}>
                  <Image
                    //tintColor='gray'
                    source={Close}
                    style={{ height: 18, width: 18, }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', marginTop: 12 }}>{err}</Text>
              </View>
            </Model> : null}

          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
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
    backgroundColor: 'white',
  },

  input: {
    fontSize: 15,
    paddingLeft: 40,
    color: 'gray',
    //padding: 15,
    //borderWidth: 2,
    marginBottom: 5,
    //borderColor: 'lightgrey',
    //borderRadius: 10,
  },

  input1: {
    fontSize: 15,
    paddingLeft: 38,
    color: 'gray',
    //padding: 15,
    //borderWidth: 2,
    marginBottom: 5,
    //borderColor: 'lightgrey',
    //borderRadius: 10,
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
    textAlign: 'left',
    marginTop: 50,
    marginBottom: 10,
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',

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
  }
});

export default SignUp;