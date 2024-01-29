import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../Header';

const FAQ = () => {
  return (
    <View style={styles.container}>
      <Header title='FAQ'></Header>
    </View>
  )
}

export default FAQ;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    display:'flex', 
    height:'100%'
}
})