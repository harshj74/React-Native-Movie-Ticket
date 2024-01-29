import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import navigate from '../../../img/navigate.png'
import { DrawerActions, NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = (props) => {
  const navigation = useNavigation<NavigationProp<any>>();
  
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => {
        navigation.dispatch(DrawerActions.openDrawer())
      }} style={{ marginLeft: '3%' }}>
        <Image source={navigate} style={styles.image}></Image>
      </TouchableOpacity>
      <Text style={styles.text}>{props.title}</Text>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: '#E3E3E3',
    flex: 0.07,
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    height: 25,
    width: 25,
    //backgroundColor:'red',
    tintColor:'#ff5492'
  },

  text: {
    marginLeft: '7%',
    fontSize: 20,
    fontWeight:'bold',
    color: '#ff5492'
  }
})
export default Header;