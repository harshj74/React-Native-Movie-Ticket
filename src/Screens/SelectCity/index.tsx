import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { cities } from '../../Utils/Data'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Store } from '../../Context/Wrapper';
import { useDispatch } from 'react-redux';
import { cityAction } from '../../Redux/actions';

const SelectCity = () => {

  const [isSelected, setIsSelected] = useState();
  const [isClicked, setIsClicked] = useState(true);
  //const { data, setdata } = useContext(Store)

  //console.log(data);

  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch();

  return (
      <View style={styles.container}>
      <Text style={styles.text}>Select city</Text>
        <FlatList columnWrapperStyle={{justifyContent:"space-between"}} numColumns={3} style={{ marginTop: 40,  }} data={cities} renderItem={({ item, index }) => (
          <TouchableOpacity
          style={{
              alignSelf:"center",
              borderColor: isSelected == index ? '#ff5492' : 'grey',
              borderWidth: isSelected == index ? 3 : 1,
              //marginLeft: 20,
              marginBottom: 20,
              paddingHorizontal: 18,
              paddingVertical: 9,
              borderRadius: 20,
            }}
            onPress={() => {
              console.log(item);
              setIsSelected(index);
              setIsClicked(false);
              AsyncStorage.setItem("city", item)
              dispatch(cityAction(item))
              //setdata(item);
            }}>
            <Text style={{
              fontWeight: isSelected == index ? 'bold' : '400',
              color: isSelected == index ? '#ff5492' : 'grey',
              fontSize: 16
            }}>{item}</Text>
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
            navigation.replace('MyDrawer');
          }}>
          <Text
            style={{
              color: isClicked == false ? 'white' : 'grey',
              fontSize: 20,
              fontWeight: 'bold'
            }}>Get Started</Text>
        </TouchableOpacity>
      </View>
    

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 35,
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