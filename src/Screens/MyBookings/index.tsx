import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import Header from '../Header';
import { useNavigation } from '@react-navigation/native';
import back from '../../../img/back.png'
import circlefull from '../../../img/circleful.png'
import FastImage from 'react-native-fast-image';

const MyBookings = () => {

  const data = [
    {
      title: 'Animal',
      imgs: 'https://firebasestorage.googleapis.com/v0/b/movie-ticket-9ddbf.appspot.com/o/Movies%2FAnimal.jpg?alt=media&token=02d3e4e0-023f-41d2-8938-8e573fb322db',
      lang: 'Hindi',
      type: '2D',
      date: '20 April 8:00 PM',
      count: 2,
      seats: 'E4, D4',
      id: 'WW30345WE',
      location: 'INOX: VR Mall, Surat',
      img: 'https://firebasestorage.googleapis.com/v0/b/movie-ticket-9ddbf.appspot.com/o/QR%2Fqr.png?alt=media&token=4c1e40da-f2c9-4089-ba22-920a548f20b7',
    },
    {
      title: 'Merry Christmas',
      imgs: 'https://firebasestorage.googleapis.com/v0/b/movie-ticket-9ddbf.appspot.com/o/Movies%2FMerry_Christmas.jpg?alt=media&token=97e1edc8-e23f-4034-a377-4f484f83fded',
      lang: 'Hindi',
      type: '2D',
      date: '27 April 09:30 AM',
      count: 3,
      seats: 'G2, G3',
      id: 'WW30495WE',
      location: 'Cinepolis: Imperial Square Mall, Surat',
      img: 'https://firebasestorage.googleapis.com/v0/b/movie-ticket-9ddbf.appspot.com/o/QR%2Fqr.png?alt=media&token=4c1e40da-f2c9-4089-ba22-920a548f20b7',
    },

  ]
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header onPress={() => {
        navigation.goBack();
      }} source={back} title='My Bookings'></Header>

      <FlatList showsVerticalScrollIndicator={false} data={data} renderItem={({ item, index }) => {
        return (
          <View style={styles.mainview}>

            <FastImage tintColor='white' resizeMode='contain' style={{ height: 25, width: 25, position: 'absolute', left: -15, zIndex: 1 }} source={circlefull} />
            <View style={{ flexDirection: 'row' }}>

              <View style={{ height: 150, width: '35%', borderRadius: 15, }}>
                <FastImage resizeMode='stretch' style={styles.image} source={{ uri: item.imgs }} />
              </View>
              <View style={{ width: '65%', paddingRight: 10, paddingLeft: 25 }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'black', marginVertical: 1 }}>{item.title}</Text>
                <Text style={{ fontSize: 14, marginBottom: 7 }}>{item.lang} | {item.type}</Text>
                <Text style={{ fontSize: 12, marginBottom: 1, color: 'black', fontWeight: 'bold' }}>{item.date}</Text>
                <Text style={{ fontSize: 12, marginBottom: 7 }}>{item.location}</Text>
                <Text style={{ fontSize: 12, marginBottom: 1, color: 'black', fontWeight: 'bold'}}>{item.count}</Text>
                <Text style={{ fontSize: 12, marginBottom: 7 }}>{item.seats}</Text>
                <Text style={{ fontSize: 12, marginBottom: 1, color: 'black', fontWeight: 'bold' }}>{item.id}</Text>
                <FastImage resizeMode='contain' style={{ height: 70, width: 70, position: 'absolute', bottom: -10, right: -10 }} source={{ uri: item.img }} />
              </View>
            </View>
            <FastImage tintColor='white' resizeMode='contain' style={{ height: 25, width: 25, position: 'absolute', right: -10 }} source={circlefull} />
          </View>
        )
      }} />
    </View>
  )
}

export default MyBookings

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    display: 'flex',
    flex: 1
  },

  mainview: {
    backgroundColor: '#FFF5EE',
    marginHorizontal: 15,
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },

  image: {
    paddingHorizontal: 10,
    borderRadius: 15,
    width: '100%',
    height: '100%',
  }
})