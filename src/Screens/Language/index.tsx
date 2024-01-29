import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Lang from '../../../img/Language.png';
import { Dimensions } from 'react-native';
import Home from '../Home'
import SelectCity from '../SelectCity';
import Navigation from '../../Navigation';
import { Dropdown } from 'react-native-element-dropdown';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

const data = [
  { label: 'English', value: '1' },
  { label: 'Gujarati', value: '2' },
  { label: 'Hindi', value: '3' },
  { label: 'chinese', value: '4' },
  { label: 'Japanese', value: '5' },
];

const Language = () => {

  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <View style={{ flex: 1 }}>

      <View style={styles.container2}>
        <Image source={Lang} style={styles.innerimage} />
      </View>

      <View style={styles.container1}>
        <Text style={styles.text}>Select Your Language</Text>

        <View style={styles.container}>
          <Dropdown
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
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>

        <TouchableOpacity
          disabled={!value}
          style={{
            ...styles.button, 
            backgroundColor: value ? '#ff5492' : '#E3E3E3' 
          }}
          onPress = {() => {navigation.replace('SelectCity')}}>
        <Text style={{ color: value ? 'white' : 'grey', fontSize: 20, fontWeight: 'bold' }}>Confirm</Text>
      </TouchableOpacity>

    </View>

    </View >
  )
}

const styles = StyleSheet.create({
  container2: {
    backgroundColor: 'white',
    display: 'flex',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  innerimage: {
    alignItems: 'center',
    resizeMode: 'contain',
    height: '60%'
  },

  container1: {
    backgroundColor: 'white',
    height: '50%',
    alignItems: 'center',
  },

  text: {
    marginTop: 50,
    marginBottom: 20,
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold'
  },

  button: {
    width: (width * 80) / 100,
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 50,
    padding: 10,
    marginTop: 20,
    elevation: 10,
  },

  container: {
    //backgroundColor: 'white',
    padding: 16,
    //borderWidth:1,

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