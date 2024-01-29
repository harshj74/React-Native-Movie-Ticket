import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import navigate from '../../../img/navigate.png'
import { DrawerActions, NavigationProp, useNavigation } from '@react-navigation/native';

const Header = (props) => {
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {
        //console.log(10);
        navigation.dispatch(DrawerActions.openDrawer())
      }} style={{ marginLeft: '3%' }}>
        <Image source={navigate} style={styles.image}></Image>
      </TouchableOpacity>
      <Text style={styles.text}>{props.title}</Text>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'skyblue',
    flex: 0.07,
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    height: 25,
    width: 25,
    //backgroundColor:'red',

  },

  text: {
    marginLeft: '7%',
    fontSize: 20,
    //fontWeight:'bold',
    color: 'black'
  }
})
export default Header;