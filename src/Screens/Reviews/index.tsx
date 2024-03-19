import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import Header from '../Header';
import logo from '../../../img/logo.png'
import Star1 from '../../../img/star1.png'
import Star2 from '../../../img/star2.png'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DrawerActions, useNavigation } from '@react-navigation/native';

const Reviews = () => {

  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation();

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

  return (
    <View>
      <Header onPress={() => {
        navigation.dispatch(DrawerActions.openDrawer())
      }} title='Reviews'></Header>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={{height:50}} />
        <Image style={styles.img} source={logo}></Image>
        <View style={{ height: 50 }} />
        <Text style={styles.text1}>Please Rate The Movie Ticket Booking !</Text>
        <CustomRatingBar />
        {/* <Text style={styles.textStyle}>
          {defaultRating} / {Math.max.apply(null, maxRating)}
        </Text> */}
        <Text style={styles.text2}>Your Comments and Suggestions help us Improve the service quality better !</Text>
        <View style={styles.comment}>
          <TextInput multiline placeholderTextColor='black' placeholder='Enter Your Comment' ></TextInput>
        </View>
        <View>
        <TouchableOpacity
          onPress={() => {
            setVisible(true)
            setTimeout(() => {
              setVisible(false)
            }, 2000)
          }}
            style={styles.submit}><Text style={styles.submittext}>Submit</Text></TouchableOpacity>
        </View>

        {/* {visible ? <Text style={{ alignSelf: 'center', color: 'red', fontWeight: 'bold' }}>Review Submitted Successfully !</Text> : null} */}
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
    marginBottom:10
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
    height: 90,
  },
  submittext: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  submit: {
    backgroundColor: '#ff5492',
    margin: 15,
    marginHorizontal:20,
    padding: 15,
    borderRadius: 10 
  }
})