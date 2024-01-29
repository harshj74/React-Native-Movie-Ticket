import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../Header';

const Help = () => {
  return (
    <View style={styles.container}>
     <Header title='Help'></Header>
    </View>
  )
}

export default Help;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    display:'flex', 
    height:'100%'
}
})