import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../Header';

const Home = () => {

  return (
    <View style={styles.container}>
     <Header title='Home'></Header>
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        display:'flex', 
        height:'100%'
    }
})

export default Home;