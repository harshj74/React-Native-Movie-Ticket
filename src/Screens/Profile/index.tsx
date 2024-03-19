import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Header';
import FastImage from 'react-native-fast-image';
import Profile1 from '../../../img/profile1.png';
import Edit from '../../../img/Edit.png';
import Arrow from '../../../img/arrow.png'
import Close from '../../../img/close.png'
import Model from '../Model';
import Navigation from '../../Navigation';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'



const Profile = () => {
  const navigation = useNavigation<StackNavigationProp<{ route: {} }>>();
  const [modelvisible, setmodelvisible] = useState(false);
  const [modalhead, setmodalhead] = useState('');
  const [text, setText] = useState('');
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [secure, setSecure] = useState(false);
  const [btn1, setBtn1] = useState('Ok');
  var [password, setPassword] = useState('');
  const usr = firebase.auth().currentUser
  const current = usr?.uid

  console.log(text1);
  

  const updateusername = () => {  
    firestore()
      .collection('Users')
      .doc(current)
      .update({username : text})
  }

  const updatemobile = () => {
    firestore()
      .collection('Users')
      .doc(current)
      .update({mobile : text1})
  }
  useEffect(() => {
    const usr = firebase.auth().currentUser
    const current = usr?.uid
    firestore()
      .collection('Users')
      .doc(current)
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot.data());
        setEmail(querySnapshot.data().mobile)
        setUser(querySnapshot.data().username)
        setName(querySnapshot.data().name)
      })
  }, [])


  return (
    <View style={styles.container}>
      <Header onPress={() => {
        navigation.dispatch(DrawerActions.openDrawer())
      }} title='Profile'></Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={{ marginTop: 20, borderRadius: 100, alignSelf: 'center', }}>
          <Image resizeMode='contain' style={styles.imgs} source={Profile1} />
        </TouchableOpacity>
        <Text style={styles.profilehead}>{name}</Text>
        <View style={{ marginTop: '5%', marginHorizontal: '5%' }}>
          <Text style={styles.editprofile}>Edit profile</Text>




          <Model
            pressOut={() => { setmodelvisible(false) }}
            visible={modelvisible}>
            <View>
              <TouchableOpacity
                style={{ alignSelf: 'flex-end' }}
                onPress={() => setmodelvisible(false)}>
                <Image
                  source={Close}
                  style={{ height: 18, width: 18 }} />
              </TouchableOpacity>
              <Text style={styles.modeltext1}>{modalhead}</Text>


              {modalhead === 'Are You Sure You Want To Sign Out ?' ? <><View style={{ marginTop: 15 }}></View></> : <TextInput
                secureTextEntry={secure}

                placeholder={modalhead === 'Change User Name' ? user : modalhead === 'Change Mobile' ? email : modalhead === 'Change Your Password' ? 'Old Password' : ''}

                style={styles.modeltextinput}

                onChangeText={text => {
                  if (modalhead === 'Change User Name') {
                    setText(text)
                  } else if (modalhead === 'Change Mobile') {
                    setText1(text)
                  }
                }} />}

              {/* {modalhead === 'Change Your Password' ?
                <>
                  <TextInput
                    placeholder='New Password'
                    style={styles.modeltextinput}
                    secureTextEntry
                  />
                  <TextInput
                    placeholder='Confirm Password'
                    style={styles.modeltextinput}
                    secureTextEntry
                    onChangeText={text => {
                      setText2(text)
                    }}
                  />
                </> : null} */}

              <View style={{ flexDirection: 'row' }}>

                <TouchableOpacity
                  style={styles.ok}
                  onPress={() => {
                    if (modalhead === 'Change User Name') {
                      setmodelvisible(false),
                        setUser(text);
                      updateusername();
                    } else if (modalhead === 'Change Mobile') {
                      setmodelvisible(false);
                      setEmail(text1);
                      updatemobile();
                    }
                    // } else if (modalhead === 'Change Your Password') {
                    //   setmodelvisible(false);
                    //   password = ''
                    //   for (var i = 0; i < text2.length; i = i + 1) {
                    //     password = password + '*'
                    //   }
                    //   setPassword(password)
                    // } else if (modalhead === 'Are You Sure You Want To Sign Out ?') {
                    //   auth()
                    //     .signOut()
                    //     .then(() => console.log('User signed out!'));
                    //   setmodelvisible(false);
                    //   navigation.replace('Login')
                    // }
                  }}>
                  <Text style={styles.oktext}>{btn1}</Text>
                </TouchableOpacity>



                <TouchableOpacity
                  style={styles.cancel}
                  onPress={() => { setmodelvisible(false) }}>
                  <Text style={styles.canceltext}>Cancel</Text>
                </TouchableOpacity>

              </View>

            </View>
          </Model>





          <View style={styles.input}>
            <Text style={styles.head}>Username</Text>
            <Text style={{ color: 'gray' }}>{user}</Text>
            <TouchableOpacity style={styles.editimg} onPress={() => {
              setmodelvisible(true);
              setmodalhead('Change User Name')
              setSecure(false)
              setBtn1('Ok')
            }}>
              <Image style={styles.img} source={Edit} />
            </TouchableOpacity>
          </View>


          <View style={styles.input1}>
            <Text style={styles.head}>Mobile</Text>
            <Text style={{ color: 'gray' }}>{email}</Text>
            <TouchableOpacity style={styles.editimg} onPress={() => {
              setmodelvisible(true);
              setmodalhead('Change Mobile')
              setSecure(false)
              setBtn1('Ok')
            }}>
              <Image style={styles.img} source={Edit} />
            </TouchableOpacity>
          </View>

          {/* <View style={styles.input1}>
            <Text style={styles.head}>Password</Text>
            <Text>{password}</Text>
            <TouchableOpacity style={styles.editimg} onPress={() => {
              setmodelvisible(true);
              setmodalhead('Change Your Password');
              setSecure(true)
              setBtn1('Ok')
            }}>
              <Image style={styles.img} source={Edit} />
            </TouchableOpacity>
          </View> */}

          {/* <TouchableOpacity
            style={styles.logout}
            onPress={() => {
              setmodelvisible(true)
              setBtn1('Logout')
              setmodalhead('Are You Sure You Want To Sign Out ?')
            }}>
            <Text style={{ fontSize: 17, fontWeight: '600', color: 'black' }}>Logout</Text>
            <Image source={Arrow} style={styles.logoutimg} />
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </View>
  )
}

export default Profile;

const styles = StyleSheet.create({

  imgs: {
    alignSelf: 'center',
    height: 100,
    width: 100,
    //marginTop: "5%",
    //tintColor: '#ff5492',
    borderRadius: 100,
  },

  logout: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10
  },

  oktext: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18
  },

  canceltext: {
    color: 'grey',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18
  },

  cancel: {
    backgroundColor: 'white',
    width: 145,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'grey'
  },

  ok: {
    backgroundColor: '#ff5492',
    width: 145,
    marginRight: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },

  container: {
    backgroundColor: 'white',
    display: 'flex',
    height: '100%'
  },

  input: {
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    //paddingTop:20,
    borderColor: 'lightgrey',
    borderRadius: 10,
    color: 'grey',
    marginVertical: 15,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: 'black',
  },

  input1: {
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    //paddingTop:20,
    borderColor: 'lightgrey',
    borderRadius: 10,
    color: 'grey',
    backgroundColor: 'white',
    marginBottom: 15,
    elevation: 5,
    shadowColor: 'black',
  },

  profilehead: {
    alignSelf: 'center',
    marginTop: 5,
    color: 'black',
    fontSize: 17,
    fontWeight: '600'
  },

  modeltext1: {
    marginTop: 15,
    alignSelf: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
    width: 260,
    textAlign: 'center'
  },

  head: {
    color: 'black',
    fontSize: 15
  },

  editprofile: {
    fontSize: 17,
    fontWeight: '600',
    color: 'black'
  },

  editimg: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 13,
    right: 10
  },

  img: {
    height: 25,
    width: 25,
    //tintColor: '#ff5492'
  },

  logoutimg: {
    height: 30,
    width: 30,
    tintColor: 'black',
    right: 10
  },

  modeltextinput: {
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    //paddingTop:20,
    borderColor: 'lightgrey',
    borderRadius: 10,
    color: 'grey',
    marginVertical: 15,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: 'black',
    width: 300
  }
})