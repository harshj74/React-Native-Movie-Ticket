import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Header from '../Header';
import Down from '../../../img/down.png'
import Up from '../../../img/up.png'
import { DrawerActions, useNavigation } from '@react-navigation/native';

const FAQ = () => {

  const [vis1, setVis1] = useState(false);
  const [vis2, setVis2] = useState(false);
  const [vis3, setVis3] = useState(false);
  const [vis4, setVis4] = useState(false);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header onPress={() => {
        navigation.dispatch(DrawerActions.openDrawer())
      }} title='FAQ'></Header>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>

          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={styles.txt1}>How do I register with this app?</Text>
          <TouchableOpacity
            onPress={() => {
              if (vis1 === true) {
                setVis1(false)
              } else {
                setVis1(true)
              }
            }}
            style={styles.btn}>
            <Image style={styles.img} source={vis1 === false ? Down : Up}></Image>
          </TouchableOpacity>
          </View>
          {vis1 ?
            <Text
              style={styles.txt2}>Oh, that's easy as pie!
              {'\n'}
              {'\n'}Just go to our application and click on the Sign-up option.
            </Text> : null}


          <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={styles.txt1}>Is it necessary to register on app for booking tickets?</Text>
            <TouchableOpacity
              onPress={() => {
                if (vis2 === true) {
                  setVis2(false)
                } else {
                  setVis2(true)
                }
              }}
              style={styles.btn}>
              <Image style={styles.img} source={vis2 === false ? Down : Up}></Image>
            </TouchableOpacity>
          </View>
          {vis2 ?
            <Text
              style={styles.txt2}>Yes it is a compulsion, you cannot book your tickets without registering
              {'\n'}
              {'\n'}Registering will give you the following features :
              {'\n'}Help & Support
              {'\n'}Account & Settings
              {'\n'}Stream Library
              {'\n'}Offers
            </Text> : null}

          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.txt1}>Are there any benefits to register with MovieTicket?</Text>
            <TouchableOpacity
              onPress={() => {
                if (vis3 === true) {
                  setVis3(false)
                } else {
                  setVis3(true)
                }
              }}
              style={styles.btn}>
              <Image style={styles.img} source={vis3 === false ? Down : Up}></Image>
            </TouchableOpacity>
          </View>
          {vis3 ?
            <Text
              style={styles.txt2}>Absolutely! There are benefits to register with BookMyShow which would cost you nothing.
              {'\n'}
              {'\n'}1. MovieTicket allows you to save your Debit/Credit card, Net Banking, Gift Voucher, UPI or Redeem Points details under the "Quick Pay" option. It makes your life a bit easier in terms of quick payment as you wouldn't have to enter the card details manually anymore.
              {'\n'}
              {'\n'}2. You could keep a track of all your bookings/purchases under the "Your Orders" section.
              {'\n'}
              {'\n'}3. Subscribe to the newsletters and stay updated about all your favorite Movies, Events, Sports, etc. You too get push notifications on the App.
              {'\n'}
              {'\n'}4. Restaurant Discounts.
              {'\n'}
              {'\n'}5. Offers.
              {'\n'}
              {'\n'}6. Rewards.
            </Text> : null}
          

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.txt1}>What is a MovieTicket Gift Card?</Text>
            <TouchableOpacity
              onPress={() => {
                if (vis4 === true) {
                  setVis4(false)
                } else {
                  setVis4(true)
                }
              }}
              style={styles.btn}>
              <Image style={styles.img} source={vis4 === false ? Down : Up}></Image>
            </TouchableOpacity>
          </View>
          {vis4 ?
            <Text
              style={styles.txt2}>The "MovieTicket Gift Card" is a new way of gifting Movies, Plays, Concerts or Sports tickets to your loved ones.
              {'\n'}
              {'\n'}Each Gift Card has a predefined amount loaded on it which can be used to buy tickets.
              {'\n'}
              {'\n'}This Gift Card is suitable for all gifting purposes and can be redeemed on MovieTicket only.
            </Text> : null}

        </View>
      </ScrollView>
    </View>
  )
}

export default FAQ;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    display: 'flex',
    height: '100%'
  },

  txt1: {
    color: "#ff5492",
    fontWeight: "500",
    paddingVertical: 10,
    fontSize: 16,
    paddingHorizontal: 5,
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#C0C0C0",
    //borderWidth: 1,
    marginBottom: 5,
    borderColor: "black",
    flexShrink: 1
  },
  txt2: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    color: 'black',
    fontSize: 16,
    //backgroundColor: "#ffbbd3",
    //marginTop: 4,
    //borderRadius:10
  },
  btn: {
    //alignItems:'center'
    //position: "absolute",
    //alignSelf: "flex-end",
    marginTop: 11,
    //paddingHorizontal: 10,
  },
  img: {
    height: 20,
    width: 20,
    tintColor: "#C0C0C0",
  }
})