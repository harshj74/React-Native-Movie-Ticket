import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../Header';

const Home = () => {

  return (
    <View style={styles.container}>
      <Header title='Home'></Header>
      <ScrollView style={styles.innercontainer}>
        <Text>Now Showing</Text>
      </ScrollView>
    </View>


  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    display: 'flex',
    height: '100%'
  },

  innercontainer: {
    backgroundColor: 'skyblue',
    display: 'flex',
    flex: 1
  }
})

export default Home;