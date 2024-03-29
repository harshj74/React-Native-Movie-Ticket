import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Header from '../Header';
import Help1 from '../../../img/help1.png'
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const Help = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header onPress={() => {
        navigation.dispatch(DrawerActions.openDrawer())
      }} title='Help'></Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Image tintColor='pink' style={styles.img} source={Help1}></Image> */}
        <View style={{ flex: 1, }}>

          <View style={styles.helpbox}>
            <TextInput multiline placeholderTextColor='#71797E' placeholder='Type Your Message' ></TextInput>
          </View>
          
            <View>
              <Text style={styles.txt}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et tortor at risus viverra adipiscing. Ut placerat orci nulla pellentesque dignissim enim sit amet.</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.send}>
                <Text style={styles.submittext}>Send Mail</Text>
              </TouchableOpacity>
            </View>
          
        </View>
      </ScrollView>
    </View>

  )
}

export default Help;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    display: 'flex',
    height: '100%'
  },
  helpbox: {
    borderWidth: 1,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    borderColor: 'lightgray',
    paddingLeft: 10,
    height: 150,
    backgroundColor: '#F8F8F8'
  },
  submittext: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  send: {
    backgroundColor: '#ff5492',
    margin: 20,
    marginTop: 0,
    padding: 15,
    borderRadius: 10,
  },
  txt: {
    margin: 20,
    color: "#71797E"
  },
  img: {
    height: 250,
    width: 250,
    alignSelf: 'center',
    backgroundColor: 'white'
  }
})