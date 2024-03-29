import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Header';
import logo from '../../../img/logo.png'
import Star1 from '../../../img/star1.png'
import Star2 from '../../../img/star2.png'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import firestore, { firebase } from '@react-native-firebase/firestore';

const Reviews = () => {



  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation();
  const [text, setText] = useState('');

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              key={item}
              onPress={() => setDefaultRating(item)}>
              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultRating
                    ? Star1
                    : Star2
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const handleTextChange = (inputText:any) => {
    // Split the text by new lines
    const lines = inputText.split('\n');

    // Check if the lines are within the limit
    if (lines.length <= 3) {
      setText(inputText);
    } else {
      // If the line limit is exceeded, restrict the text to the last valid input
      // This simply ignores any input beyond the third newline
      setText(lines.slice(0, 3).join('\n'));
    }
  };

  const usr = firebase.auth().currentUser
  const current = usr?.uid

  const submit = () => {
    firestore()
      .collection('Reviews')
      .add({
        user: current,
        starRating: defaultRating,
        comment: text
      })
    setText('')
    setDefaultRating(2)
  }
  return (
    <View>
      <Header onPress={() => {
        navigation.dispatch(DrawerActions.openDrawer())
      }} title='Reviews'></Header>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={{ height: 50 }} />
        <Image style={styles.img} source={logo}></Image>
        <View style={{ height: 50 }} />
        <Text style={styles.text1}>Please Rate The Movie Ticket Booking !</Text>
        <CustomRatingBar />
        {/* <Text style={styles.textStyle}>
          {defaultRating} / {Math.max.apply(null, maxRating)}
        </Text> */}
        <Text style={styles.text2}>Your Comments and Suggestions help us Improve the service quality better !</Text>
        <TextInput
          style={styles.input}
          multiline
          onChangeText={handleTextChange}
          value={text}
          placeholder="Type here..."
        />
        <View>
          <TouchableOpacity
            onPress={() => {
              // setVisible(true)
              // setTimeout(() => {
              //   setVisible(false)
              // }, 2000)
              submit();
            }}
            style={styles.submit}><Text style={styles.submittext}>Submit</Text></TouchableOpacity>
        </View>
{/* 
        {visible ? <Text style={{ alignSelf: 'center', color: 'red', fontWeight: 'bold' }}>Review Submitted Successfully !</Text> : null} */}
      </KeyboardAwareScrollView>
    </View>
  )
}

export default Reviews;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    display: 'flex',
    height: '100%'
  },
  starImageStyle: {
    tintColor: '#FFD700',
    width: 40,
    height: 40,
    resizeMode: 'cover',
    marginHorizontal: 5
  },
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 15,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    marginTop: 15,
  },
  text1: {
    textAlign: "center",
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  text2: {
    marginTop: 30,
    textAlign: "center",
    color: 'grey',
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 25
  },
  img: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    backgroundColor: 'white'
  },
  comment: {
    borderWidth: 1,
    marginHorizontal: 20,
    //marginTop: 20,
    borderRadius: 10,
    borderColor: 'grey',
    paddingLeft: 10,
    width:350,
    height: 90,
    color:'red', fontSize:20
  },
  submittext: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  submit: {
    backgroundColor: '#ff5492',
    marginTop: 15,
    marginBottom:75,
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  input: {
    height: 100,
    //width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    textAlignVertical: 'top',
    marginHorizontal: 20, 
    borderRadius: 10,
    padding: 10,
    
  },
})