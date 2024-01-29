import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { cities } from '../../Utils/Data'
import { NavigationProp, useNavigation } from '@react-navigation/native';

const SelectCity = () => {

  const [isSelected, setIsSelected] = useState();
  const [isClicked, setIsClicked] = useState(true);
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Select city</Text>

      <View>
        <FlatList style={{ marginTop: 40 }} numColumns={3} data={cities} renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              borderColor: isSelected == index ? '#ff5492' : 'grey',
              borderWidth: isSelected == index ? 3 : 1,
              marginLeft: 20,
              marginBottom: 30,
              paddingHorizontal: 18,
              paddingVertical: 9,
              borderRadius: 20
            }}
            onPress={() => {
              console.log(item);
              setIsSelected(index);
              setIsClicked(false);
            }}>
            <Text style={{
              fontWeight: isSelected == index ? 'bold' : '400',
              color: isSelected == index ? '#ff5492' : 'grey',
              fontSize: 16
            }}>{item}</Text>
          </TouchableOpacity>
        )} />
      </View>

      <View style={{ flex: 0.9, justifyContent: 'flex-end' }}>
        <TouchableOpacity
          disabled={isClicked}
          style={{
            backgroundColor: isClicked == false ? '#ff5492' : '#E3E3E3',
            marginHorizontal: 40,
            height: 50,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 10,
          }}
          onPress={() => {
            navigation.replace('MyDrawer')
          }}>
          <Text
            style={{
              color: isClicked == false ? 'white' : 'grey',
              fontSize: 20,
              fontWeight: 'bold'
            }}>Get Started</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 35
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