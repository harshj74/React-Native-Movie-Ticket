import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../Header';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Header title='Profile'></Header>
    </View>
  )
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    display:'flex', 
    height:'100%'
}
})