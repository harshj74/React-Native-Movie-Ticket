import { View, Text, StyleSheet, Image, ScrollView, ImageBackground, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import Header from '../Header';
import { moviegenres, nowShowing, popularcinemas, recommended, upComing } from '../../Utils/Data';
import favourite from '../../../img/favourite.png'
import star from '../../../img/star.png'
import like from '../../../img/like.png'
import firestore from '@react-native-firebase/firestore'
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';

const Home = () => {

  const navigation = useNavigation();

  const [isSelected, setIsSelected] = useState(0);
  const [isClicked, setIsClicked] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [data, setdata] = useState<any>({})

  const movie:any[] = useSelector((state: any) => state.movieReducer.movie)

  // useEffect(() => {
  //   for (let index = 0; index < recommended.length; index++) {
  //     firestore().collection("Movies").doc(recommended[index].title).set(recommended[index])
  //   }
  // },[])

  return (

    <View style={styles.container}>
      <Header image title='Home'></Header>
      <View style={{ flex: 1 }}>

        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            style={{ marginVertical: 5, marginBottom: 20, }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={moviegenres}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{
                  borderColor: isSelected == index ? '#ff5492' : 'grey',
                  height: 40,
                  backgroundColor: 'white',
                  marginHorizontal: 10,
                  marginVertical: 5,
                  alignItems: "center",
                  justifyContent: 'center',
                  borderRadius: 20,
                  paddingHorizontal: 20,
                  borderWidth: isSelected == index ? 3 : 1,
                }} onPress={() => {
                  setIsSelected(index);
                  setIsClicked(false);
                  //const arr = [...]
                }}>
                <Text style={{
                  //fontWeight: isSelected == index ? 'bold' : '400',
                  color: isSelected == index ? '#ff5492' : 'black',
                  fontSize: 16
                }}>{item}</Text>
              </TouchableOpacity>
            )} />












          <Text style={styles.text}>Recommended Movies</Text>

          <Modal transparent
            visible={modalVisible}
            animationType='fade'>
            <View style={styles.centeredView}>
              <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                <View style={styles.overlay} />
              </TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <Image style={styles.recommendedimage1} source={{ uri: data?.img }} />
                <View style={styles.modelmaintextview}>
                  <Text style={styles.title}>{data?.title}</Text>
                  <Text style={styles.type}>{data?.type}</Text>
                  <Text style={styles.time}>{data?.time}</Text>
                  <View style={{ flexDirection: 'row', gap: 10 }}>
                    <Text style={styles.modeltext}>{data?.certificate}</Text>
                    <Text style={styles.modeltext}>{data?.genre}</Text>
                  </View>
                  
                </View>
                <View style={styles.bnmodalview}>
                  <TouchableOpacity onPress={() => {
                    //console.log(data)
                    navigation.navigate('Details',{data})
                    setModalVisible(!modalVisible)
                  }}>
                    <Text style={styles.booknowmodal}>Book Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>


          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={movie.filter((res) => {
              return res.movietype === "recommended"
            })}
            renderItem={({ item, index }) => {
              return (
                (
                  <View
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 10,
                      //borderWidth: 1,
                      padding: 10,
                      marginBottom: 20,
                    }}
                  >
                    <TouchableOpacity activeOpacity={0.5} onPress={() => {
                      setModalVisible(!modalVisible)
                      setdata(item)
                    }}>
                      <FastImage style={styles.recommendedimage} source={{ uri: item.img }} />
                      <View style={styles.ratingview}>
                        <Image style={{ height: 18, width: 18, tintColor: 'red' }} source={star} />
                        <Text style={styles.recommendedmovietext}>{item.rating}/10</Text>
                        <Text style={styles.recommendedmovietext}>{item.votes} Votes</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )
              )
            }
            } />








          <Text style={styles.text}>Now Showing</Text>

          <FlatList
            numColumns={1}
            data={movie.filter((res) => {
              return res.movietype === "nowshowing"
            })}
            renderItem={({ item, index }) => (
              <View
                style={{
                  flex: 1,
                  padding: 10,
                  //backgroundColor: 'white',
                  borderRadius: 10,
                  marginBottom: 20,
                }}>
                <View>

                  <FastImage style={styles.nowshowingimage} source={{ uri: item.img }} />

                </View>
                <View style={styles.ratingview1}>
                  <Image style={{ height: 18, width: 18, }} source={like} />
                  <Text style={styles.recommendedmovietext}>{item.likes} Likes</Text>
                  <Text>                   </Text>
                  <Image style={{ height: 18, width: 18, tintColor: 'red' }} source={favourite} />
                  <Text style={styles.recommendedmovietext}>{item.fav}%</Text>
                </View>
                <View style={styles.nslast} >
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.nstext}>{item.title}</Text>
                    <View style={{ backgroundColor: '#ff5492', position: 'absolute', right: 0, borderRadius: 7 }}>
                      <TouchableOpacity onPress={() => {
                        //console.log(item)
                        navigation.navigate('Details', { data: item })
                        //setModalVisible(!modalVisible)
                      }}><Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white', padding: 10, marginHorizontal: 10 }}>Book Now</Text></TouchableOpacity>
                    </View>

                  </View>

                  <View style={{ flexDirection: 'row', gap: 10, paddingTop: 8, paddingBottom: 8 }}>
                    <Text style={styles.commingsoontext}>{item.certificate}</Text>
                    <Text style={styles.commingsoontext}>{item.genre}</Text>
                  </View>
                  <View>
                    <Text style={styles.commingsoontextlast}>{item.type}</Text>
                  </View>
                </View>

              </View>
            )} />










          <Text style={styles.text}>Popular Cinemas</Text>

          <FlatList
            style={{ marginVertical: 5, marginBottom: 20, }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={popularcinemas}
            renderItem={({ item, index }) => (
              <View
                style={{
                  borderColor: 'grey',
                  height: 40,
                  backgroundColor: 'white',
                  marginHorizontal: 10,
                  marginVertical: 5,
                  alignItems: "center",
                  justifyContent: 'center',
                  borderRadius: 20,
                  paddingHorizontal: 20,
                  borderWidth: 1,
                }}>
                <Text style={{
                  color: 'black',
                  fontSize: 16
                }}>{item}</Text>
              </View>
            )} />












          <Text style={styles.text}>Comming soon</Text>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={movie.filter((res) => {
            return res.movietype === "upcoming"
            })}
            renderItem={({ item, index }) => (
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                //borderWidth: 1,
                margin: 10,
                // marginBottom: 20
              }}
            >
              <View style={{ borderRadius: 10 }}>
                <FastImage style={styles.commingsoonimage} source={{ uri: item.img }} />
                <View style={styles.likeview}>
                  <Image style={{ height: 23, width: 23, tintColor: 'red' }} source={favourite} />
                  <Text style={{ fontSize: 13, color: 'black', fontWeight: 'bold' }}>{item.fav}%</Text>
                </View>
              </View>
              <View style={styles.cssecondview}>
                <Text style={styles.commingsoontext}>{item.title}</Text>
                <View style={{ flexDirection: 'row', gap: 10, paddingTop: 8, paddingBottom: 8 }}>
                  <Text style={styles.commingsoontext}>{item.certificate}</Text>
                  <Text style={styles.commingsoontext}>{item.genre}</Text>
                </View>
                <View>
                  <Text style={styles.commingsoontextlast}>{item.type}</Text>
                </View>
              </View>
            </View>
          )} />





        </ScrollView>
      </View>
    </View >
  )
};






const styles = StyleSheet.create({
  type: {
    backgroundColor: 'black',
    color: 'white',
    alignSelf: "flex-start",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5
  },

  time: {
    backgroundColor: 'lightgrey',
    color: 'black',
    alignSelf: "flex-start",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 15,
  },

  title: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: '900',
    color: 'black'
  },

  modelmaintextview: {
    marginLeft: 15,
    top: 0,
    marginTop: 15,
    alignSelf: 'flex-start',
  },

  modeltext: {
    color: 'black',
    marginTop: 15
  },

  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  modalView: {
    position: 'absolute',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: '5%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    }, shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000090'
  },

  nstext: {
    color: 'black',
  },

  nslast: {
    borderWidth: 1,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: 'white',
    borderColor: "grey",
    padding: 10,
  },

  nowshowingimage: {
    height: 240,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },

  recommendedmovietext: {
    fontSize: 13,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 7,
  },

  commingsoontextlast: {
    color: 'black',
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    alignSelf: 'flex-start',
    borderRadius: 7,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'lightgrey',
    borderColor: "transparent",
    //elevation:10
  },

  likeview: {
    position: 'absolute',
    bottom: 15,
    borderRadius: 7,
    marginLeft: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    padding: 5,
  },

  ratingview: {
    backgroundColor: 'black',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderColor: "black",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },

  ratingview1: {
    backgroundColor: 'black',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderColor: "black",
  },

  cssecondview: {
    backgroundColor: 'white',
    borderColor: "grey",
    padding: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
  },

  recommendedimage: {
    height: 230,
    width: 180,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },

  recommendedimage1: {
    height: 320,
    width: 280,
    borderRadius: 10,
  },

  commingsoonimage: {
    height: 350,
    width: 270,
    resizeMode: 'stretch',
    borderRadius: 10,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },

  commingsoontext: {
    color: 'black',
    //fontWeight: 'bold',
    //borderWidth:1,
  },

  container: {
    backgroundColor: 'white',
    display: 'flex',
    flex: 1
  },

  text: {
    color: '#ff5492',
    fontSize: 17,
    marginLeft: "3%",
    fontWeight: '600',
    marginBottom: 5,
    //marginTop: 2
  },



  textoverimage: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16
  },

  imagelikeview: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },

  fronttext: {
    backgroundColor: 'black',
    color: 'white'
  },

  booknowmodal: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    padding: 10,
    marginHorizontal: 10,
    textAlign: "center",
  },

  bnmodalview: {
    backgroundColor: '#ff5492',
    borderRadius: 7,
    marginTop: 25,
    width: '100%',
    alignSelf: 'center' 
  }
})

export default Home;