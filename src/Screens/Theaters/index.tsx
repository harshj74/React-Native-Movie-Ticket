import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import back from '../../../img/back.png'
import Screen from '../../../img/screen.png'
import logo from '../../../img/logo.png'
import { Seats } from '../../Utils/Data'
import Availability from '../Availability'
//import { MallSeats } from '../../Context/Wrapper'
import { useDispatch, useSelector } from 'react-redux'
import { seatsArrayAction } from '../../Redux/actions'
import RazorpayCheckout from 'react-native-razorpay';

const Theaters = ({ route }: any) => {

  const openCheckout = () => {
    var options = {
      description: 'Credits towards Ticket Booking',
      //image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_1DP5mmOlF5G5ag', // Your api key
      amount: (amount * 100),
      name: 'Movie Ticket',
      prefill: {
        email: 'void@razorpay.com',
        contact: '9191919191',
        name: 'Razorpay Software',
      },
      theme: { color: '#ff5492' },
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        //Alert.alert(`Success: ${data.razorpay_payment_id}`);
        navigation.navigate('BottomTab')
      })
      .catch(error => {
        // handle failure
        Alert.alert(`Error: ${error.code} | ${error.description}`);
      });
  };
  
  const { title } = route.params; 
  //const { title, mall, time } = route.params;
  //const { date } = route.params;
  //const { seatsArray, setseatsArray } = useContext(MallSeats);
  const dispatch = useDispatch();
  const seatsArray = useSelector((state: any) => state.seatsArrayReducer.seatsArray);

  let amount = 0;

  if (seatsArray.length > 0) {
    amount = 100 * seatsArray.length;
  }

  console.log(seatsArray);

  const navigation = useNavigation();

  return (
    <View style={styles.mainview}>
      <View style={styles.iv}>
        <View style={styles.iv2}>
          <TouchableOpacity onPress={() => {
            navigation.goBack();
          }}>
            <Image style={styles.backimg} source={back} />
          </TouchableOpacity>
          <Text style={{ color: 'black', fontWeight: '600', fontSize: 17 }}>{title}</Text>
        </View>
      </View>

      {/* <Text style={styles.toptext}>{mall} | {date.dat} {date.mon} | {date.day} | {time}</Text> */}

      <View style={{ marginVertical: 10, }}>
        <Image resizeMode='contain' style={{ width: '90%', alignSelf: 'center', tintColor: 'pink' }} source={Screen} />
      </View>

      <View style={styles.iv3}>
        <FlatList
          numColumns={6}
          data={Seats}
          renderItem={({ item, index }) => (
            seatsArray.includes(item) ?
              (<TouchableOpacity
                onPress={() => {
                  dispatch(seatsArrayAction(seatsArray.filter((remove: any) => remove != item)))
                  //setseatsArray(seatsArray.filter((remove: any) => remove != item))
                }}
                style={{
                  backgroundColor: '#ff5492',
                  height: 40,
                  width: 40,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  margin: '3%'
                }}>
              </TouchableOpacity>) :
              (<TouchableOpacity
                onPress={() => {
                  dispatch(seatsArrayAction([...seatsArray, item]))
                  //setseatsArray([...seatsArray, item])
                }}
                style={{
                  backgroundColor: '#E3E3E3',
                  height: 40,
                  width: 40,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  margin: '3%'
                }}>
              </TouchableOpacity>)
          )}
        />
      </View>

      <View style={styles.bottombox}>
        <Availability name='Unavailable' color='#71797E' />
        <Availability name='Available' color='#E3E3E3' />
        <Availability name='Selected' color='#ff5492' />
      </View>

      <TouchableOpacity
        disabled={seatsArray.length === 0}
        onPress={() => {
          //console.log("Clicked")
          openCheckout()
        }}
        activeOpacity={0.9}
        style={styles.btn}>
        <Text style={styles.btntext}>Pay Now</Text>
        <Text style={styles.btntext}>₹ {amount}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Theaters

const styles = StyleSheet.create({
  mainview: {
    flex: 1,
    backgroundColor: 'white',
    //gap: 10,
  },
  iv: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '6.5%',
    //paddingHorizontal: 13,
    marginHorizontal: 10,
    borderBottomColor: '#E3E3E3',
    borderBottomWidth: 2,
    justifyContent: 'space-between',
    //backgroundColor: 'red',
  },
  iv2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  backimg: {
    height: 20,
    width: 20,
    tintColor: '#ff5492'
  },
  bottombox: {
    margin: 10,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 40,
  },
  iv3: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  toptext: {
    padding: 10,
    color: 'grey',
    fontSize: 17,
    fontWeight: '400'
  },
  btntext: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16
  },
  btn: {
    marginHorizontal: 15,
    height: 45,
    backgroundColor: '#ff5492',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 30,
    top: 30
  }
})