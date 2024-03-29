import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Dimensions, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { cities } from '../../Utils/Data'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { cityAction } from '../../Redux/actions';
import Header from '../Header';
import back from '../../../img/back.png'
import search from '../../../img/search.png'
import FastImage from 'react-native-fast-image';
const { height, width } = Dimensions.get('window');

const SelectCity = () => {

  const [isSelected, setIsSelected] = useState();
  const [isClicked, setIsClicked] = useState(true);
  const route = useRoute<any>()
  const isCity = route?.params?.isCity
  console.log(isCity)
  

  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch();
  const cinema: any[] = useSelector((state: any) => state.cinemaReducer.cinema)
  //console.log(cinema)

  return (
    <View style={{
      ...styles.container,
      paddingHorizontal: isCity ? 0 : 20,
      paddingTop: isCity ? 0 : 35,
    }}>
      {isCity ? <View style={{}}>
        <Header title='Select City' source={back} onPress={() => {
          AsyncStorage.setItem("login", "on")
          navigation.navigate('BottomTab');
        }} />
      </View> : null}
      {isCity ? null : <Text style={styles.text}>Select city</Text>}
      {isCity ? <View style={{ marginTop: 7 }}>
        <FastImage tintColor='grey' style={{ position: 'absolute', height: 20, width: 20, marginLeft: 32, marginTop: 10 }} source={search}></FastImage>
        <TextInput style={{ borderWidth: 1, marginHorizontal: 20, paddingLeft: 40, paddingRight: 15, paddingVertical: 5, borderRadius: 25, marginBottom: 20, borderColor: 'grey' }} placeholder='Search...'></TextInput>
      </View> : null}
      
      <FlatList showsVerticalScrollIndicator={false} columnWrapperStyle={{ justifyContent: "space-between" }} numColumns={2} style={{ marginTop: isCity ? 0: 40, paddingHorizontal: isCity ? 20 : 0 }} data={cities} renderItem={({ item, index }) => (
          <TouchableOpacity
          style={{
              alignSelf:"center",
              borderColor: isSelected == index ? '#ff5492' : 'grey',
              borderWidth: isSelected == index ? 2 : 0,
              //marginLeft: 20,
              marginBottom: 20,
              paddingHorizontal: 17,
              paddingVertical: 9,
            borderRadius: 20,
            backgroundColor: isSelected == index ? '#FFF5EE' : 'white'
            }}
            onPress={() => {
              console.log(item.city);
              setIsSelected(index);
              setIsClicked(false);
              AsyncStorage.setItem("city", item.city)
              dispatch(cityAction(item.city))
              //setdata(item);
          }}>
          <View style={{
            width: width * 35 / 100,
            //borderWidth: sel === index ? 2 : 0,
            //justifyContent: 'flex-start',
            //flexDirection: 'row',
            padding: 10,
            borderRadius: 20,
            alignItems: 'center',
            //borderColor: sel === index ? item.color1 : '',
            backgroundColor: isSelected == index? '#FFF5EE' : 'white'
            
          }}>
            <Image style={{ height: 60, width: 60, borderRadius:20 }} source={{ uri: item.source }}/>
            <Text style={{
              fontWeight: isSelected == index ? 'bold' : '400',
              color: isSelected == index ? '#ff5492' : 'grey',
              fontSize: 16
            }}>{item.city}</Text>
          </View>
          </TouchableOpacity>
        )} />

        <TouchableOpacity
          disabled={isClicked}
          style={{
            backgroundColor: isClicked == false ? '#ff5492' : '#E3E3E3',
            marginHorizontal: 20,
            height: 50,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 10,
            marginBottom:30,
          }}
          onPress={() => {
            AsyncStorage.setItem("login","on")
            navigation.navigate('BottomTab');
            //navigation.goBack();
          }}>
          <Text
            style={{
              color: isClicked == false ? 'white' : 'grey',
              fontSize: 20,
              fontWeight: 'bold'
            }}>{isCity? "Update":"Get Started"}</Text>
        </TouchableOpacity>
      </View>
    

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    
  },

  text: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold'
  },

  button: {
    backgroundColor: '#ff5492',
    marginHorizontal: 40,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },

}
);

export default SelectCity