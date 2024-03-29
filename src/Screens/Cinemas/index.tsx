import { Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../Header'
import back from '../../../img/back.png'
import right from '../../../img/right.png'
import search from '../../../img/search.png'
import inox from '../../../img/inox.png'
import direction from '../../../img/direction.png'
import eye from '../../../img/eye.png'
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import { useSelector } from 'react-redux'
//const { height, width } = Dimensions.get('window');

const Cinemas = () => {

  const cinema: any[] = useSelector((state: any) => state.cinemaReducer.cinema)
  const [newcinema, setnewcinema] = useState(cinema);
  const city = useSelector((state: any) => state.cityReducer.city);
  console.log(city);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header onPress={() => {
        navigation.goBack();
      }} source={back} image title='Cinemas'></Header>
      <View style={{ marginTop: 7 }}>
        <Image tintColor='grey' style={{ position: 'absolute', height: 20, width: 20, marginLeft: 32, marginTop: 10 }} source={search}></Image>
        <TextInput style={{ borderWidth: 1, marginHorizontal: 20, paddingLeft: 40, paddingRight: 15, paddingVertical: 5, borderRadius: 25, marginBottom: 20, borderColor: 'grey' }} placeholder='Search For Cinemas'></TextInput>
      </View>

      <FlatList showsVerticalScrollIndicator={false} data={newcinema.filter((res) => {
        return res.city === city
      })} renderItem={({ item, index }) => {
        return (
          <View style={styles.mainview}>
            <View style={{ flexDirection: 'row',}}>
              <View style={{ backgroundColor: '#E9E9E9', padding: 10, borderRadius: 20, alignSelf: 'flex-start', }}>
                <Image style={{ width: 50, height: 50, borderRadius: 10, objectFit: 'contain' }} source={{uri:item.img}}></Image>
              </View>
              <View style={{ marginHorizontal:5, width:'75%'}}>
                <Text  style={styles.titletext}>{item.title}</Text>
                <Text style={{ marginBottom: 10 }}>{item.can}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity>
                    <View style={styles.btnview1}>
                      <FastImage style={styles.directionsimg} source={direction} />
                      <Text style={styles.directionstext}>Directions</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View style={styles.btnview2}>
                      <FastImage tintColor='red' style={styles.viewshowsimg} source={eye} />
                      <Text style={styles.viewshowstext}>View Shows</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* <TouchableOpacity style={{ alignSelf: 'flex-start', borderWidth: 1, borderColor:'transparent', marginLeft: 50 }}>
            <Image style={{ width: 15, height: 15, marginVertical: 12,  }} source={right}></Image>
            </TouchableOpacity> */}
          </View>)
      }} />
    </View>
  )
}

export default Cinemas

const styles = StyleSheet.create({
  mainview: {
    backgroundColor: '#F8F8F8',
    marginHorizontal: 15,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between', 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  container: {
    backgroundColor: 'white',
    display: 'flex',
    flex: 1
  },

  viewshowstext: {
    fontSize: 13,
    paddingLeft: 5,
    color: 'red'
  },

  viewshowsimg: {
    height: 15,
    width: 15 
  },

  btnview2: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 30,
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginLeft: 15 
  },

  btnview1: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 30,
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
    paddingVertical: 5 
  },

  directionstext: {
    fontSize: 13,
    color: 'black',
    paddingLeft: 5 
  },

  directionsimg: {
    height: 15,
    width: 15
  }, 

  titletext: {
    fontSize: 16,
    color: 'black',
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 5,
    paddingRight:20,
  }
})