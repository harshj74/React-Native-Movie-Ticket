import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { handleEmail, handleMobileno, handlePassword, handleUsername } from '../../Utils';
import firestore, { firebase } from '@react-native-firebase/firestore';
import messeging from '@react-native-firebase/messaging';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import secret from '../../../img/secret.png'
import public1 from '../../../img/public.png'
const { height, width } = Dimensions.get('window');

const SignUp = () => {

  const saveData = () => {
    firestore()
      .collection('Users')
      .add({
        username: username,
        mobile: mobileno,
        email: email,
        password: password
      })
      .then(() => {
        console.log('User added!');
        navigation.goBack();
      });
  }

  const [email, setEmail] = useState('');
  const [emailValidError, setEmailValidError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordValidError, setPasswordValidError] = useState('');

  const [username, setUsername] = useState('');
  const [userValidError, setUserValidError] = useState('');

  const [mobileno, setMobileno] = useState('');
  const [mobileValidError, setMobileValidError] = useState('');

  const [emailcheck, setEmailCheck] = useState(true);
  const [passcheck, setPassCheck] = useState(true);
  const [usercheck, setUserCheck] = useState(true);
  const [mobilecheck, setMobileCheck] = useState(true);

  const [visible, setvisible] = useState(true);

  const navigation = useNavigation<NavigationProp<any>>();

  return (

    <KeyboardAwareScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Text style={styles.header}>Sign Up</Text>
        <View style={styles.container2}>

          <View style={styles.container3}>
            <Text style={styles.aboveinput}>Username</Text>
            <TextInput
              style={{
                ...styles.input,
                borderColor: 'lightgrey',
                borderRadius: 10,
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

            {userValidError ? (
              <Text style={styles.error}>{userValidError}</Text>
            ) : null}
          </View>

          <View style={styles.container3}>
            <Text style={styles.aboveinput}>Mobile No</Text>
            <TextInput
              style={{
                ...styles.input,
                borderColor: 'lightgrey',
                borderRadius: 10,
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
              }}></TextInput>

            {mobileValidError ? (
              <Text style={styles.error}>{mobileValidError}</Text>
            ) : null}
          </View>

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
                style={{...styles.input, marginBottom:0}}
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
                style={{  right: 5,  width: 50, alignItems: 'center', justifyContent: "center", alignSelf:'center' }}>
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
                style={{ ...styles.button, backgroundColor: !(emailcheck || passcheck || usercheck || mobilecheck) ? '#ff5492' : '#E3E3E3' }}
                onPress={() => {
                  saveData();
                  //navigation.navigate('Login');
                }}
                disabled={emailcheck || passcheck || usercheck || mobilecheck}>
                <Text style={{ fontSize: 25, color: !(emailcheck || passcheck || usercheck || mobilecheck) ? 'white' : 'grey', fontWeight: 'bold' }}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: 15 }}>
              <Text style={{ fontSize: 17, color: 'black' }}>Already a member? </Text>
              <TouchableOpacity onPress={() => {
                navigation.navigate('Login');
              }}><Text style={{ fontSize: 17, color: '#ff5492', fontWeight: 'bold' }}>Login</Text></TouchableOpacity>
            </View>

          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },

  input: {
    fontSize: 20,
    padding: 15,
    //borderWidth: 2,
    marginBottom: 5,
    //borderColor: 'lightgrey',
    //borderRadius: 10,
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
    color: 'black',
    marginBottom: 1,
  },

  error: {
    color: 'red',
  },

  container3: {
    marginBottom: 15,
  }
});

export default SignUp;