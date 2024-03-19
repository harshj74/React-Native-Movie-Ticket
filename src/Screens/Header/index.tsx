import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import navigate from '../../../img/navigate.png'
import pin from '../../../img/loc.png'
import { DrawerActions, NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
//import { Store } from '../../Context/Wrapper';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cityAction } from '../../Redux/actions';

interface headerProps {
  title: string
  image?: boolean
  source: string
  onPress?(): void
}

const Header = (props: headerProps) => {

  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<any>>();
  const { title, source, onPress } = props
  //const { data, setdata } = useContext(Store)
  const city = useSelector((state: any) => state.cityReducer.city);


  return (
    // <View style={styles.container}>
    <View style={{ justifyContent: 'center', backgroundColor: 'white' }}>

      <View style={{ position: 'absolute', alignSelf: 'center' }}>


        <Text style={[styles.text]}>{title}</Text>
      </View>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', width: '100%', height: 50, paddingHorizontal: 20, }}>

        {/* () => {
          navigation.dispatch(DrawerActions.openDrawer())
        } */}

        <TouchableOpacity style={{padding:5}} onPress={onPress} >
          <Image source={source ?? navigate} style={styles.image}></Image>
        </TouchableOpacity>

        {props.image && <View style={{ flexDirection: 'row', }}>
          <TouchableOpacity style={{paddingHorizontal:5}} onPress={() => {
            navigation.navigate("SelectCity", { isCity: true })
          }}>
            <Image source={pin} style={styles.locimg}></Image>
          </TouchableOpacity>
          {/* <Text style={styles.text1}>{data}</Text> */}
          <Text style={styles.text1}>{city}</Text>
        </View>

          // <View style={{ flexDirection: 'row' }}>

          // </View>
        }
      </View>
    </View>
    // </View>

  )
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: '#E3E3E3',
    flex: 0.07,
    flexDirection: 'row',
    alignItems: 'center',
    //borderWidth: 1
  },

  image: {
    height: 20,
    width: 20,
    tintColor: '#ff5492'
    //backgroundColor:'red',
  },

  locimg: {
    height: 23,
    width: 23,
    tintColor: '#ff5492',
  },

  text: {
    // marginLeft: '7%',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff5492'
  },

  text1: {

    fontSize: 16,
    color: '#ff5492',
    //borderWidth: 1,
    textAlign: 'center',
    marginLeft: 5
  }
})
export default Header;