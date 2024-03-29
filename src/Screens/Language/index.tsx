import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import Lang from '../../../img/Language.png';
import { Dimensions } from 'react-native';
import Home from '../Home'
import SelectCity from '../SelectCity';
import Navigation from '../../Navigation';
import { Dropdown } from 'react-native-element-dropdown';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { languages } from '../../Utils/Data'

const { height, width } = Dimensions.get('window');

const data = [
  { label: 'English', value: '1' },
  { label: 'Gujarati', value: '2' },
  { label: 'Hindi', value: '3' },
  { label: 'chinese', value: '4' },
  { label: 'Japanese', value: '5' },
];

const Language = () => {

  //const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [sel, setsel] = useState();
  const [value, setvalue] = useState(false);

  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>

      <Text style={styles.text}>Select Your Language</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList style={{}} columnWrapperStyle={{ alignSelf: 'center', }} numColumns={2} data={languages} renderItem={({ item, index }) => (
          <View
            style={{
              //backgroundColor: 'white',
              //borderRadius: 10,
              //borderWidth: 1,
              //padding: 10,
              marginBottom: 20,
              marginHorizontal:10
            }}>
            <TouchableOpacity onPress={() => {
              setsel(index);
              setvalue(true)
            }}>
              <View style={{
                width: width * 41 /100,
                borderWidth: sel === index ? 2 : 0,
                justifyContent: 'flex-start',
                //flexDirection: 'row',
                padding: 10,
                borderRadius: 20,
                borderColor: sel === index ? item.color1 : '',
                backgroundColor: item.color2
              }}>
                <Text style={{color: item.color1, fontSize:12, fontWeight:'bold'}}>{item.language}</Text>
                <Text style={{alignSelf:'center', padding:30, fontSize:50, color: item.color1, fontWeight:'bold'}}>{item.letter}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )} />


        {/* <View style={styles.container}>

          <Dropdown showsVerticalScrollIndicator={false}
            style={[styles.dropdown, isFocus && { borderColor: 'black' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Language' : '...'}
            itemTextStyle={{color:'black'}}
            searchPlaceholder="Search..."
            value={value}
            //activeColor='red'
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
          /> 
        </View> */}
      </ScrollView>
      {/* <View style={{ backgroundColor:'red'}}>  */}
      <TouchableOpacity
          disabled={!value}
          style={{
            ...styles.button,
            backgroundColor: value ? '#ff5492' : '#E3E3E3'
          }}
          onPress={() => { navigation.replace('SelectCity') }}>
          <Text style={{ color: value ? 'white' : 'grey', fontSize: 20, fontWeight: 'bold' }}>Confirm</Text>
        </TouchableOpacity>
      {/* </View> */}
    </View>
  )
}

const styles = StyleSheet.create({


  innerimage: {
    alignItems: 'center',
    resizeMode: 'contain',
    height: '60%'
  },


  text: {
    marginVertical: 20,
    fontSize: 23,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'
  },

  button: {
    width: (width * 80) / 100,
    //borderWidth:1,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 50,
    padding: 10,
    marginVertical: 20,
    elevation: 10,
  },

  container: {
    //backgroundColor: 'white',
    padding: 16,
    borderWidth: 1,
    color: 'black'
  },
  dropdown: {
    height: 50,
    width: (width * 80) / 100,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 50,
    paddingHorizontal: 15,
    color: 'black',
  },

  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: 'black'
  },
  placeholderStyle: {
    fontSize: 16
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black'
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
    borderRadius: 10
  },
})

export default Language;