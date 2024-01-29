import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../Header';

const Reviews = () => {
  return (
    <View style={styles.container}>
      <Header title='Reviews'></Header>
    </View>
  )
}

export default Reviews;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    display:'flex', 
    height:'100%'
}
})