import { View, Text, StyleSheet, Image, ScrollView, ImageBackground, Modal, TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DrawerActions, NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import Header from '../Header';
import { moviegenres, popularcinemas } from '../../Utils/Data';
import favourite from '../../../img/favourite.png'
import star from '../../../img/reviews.png'
import like from '../../../img/like.png'
import Close from '../../../img/close.png'
import firestore, { firebase } from '@react-native-firebase/firestore'
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import Model from '../Model';
import { managetheaterAction, visibleAction } from '../../Redux/actions';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import { ManageTheater } from '../../Firebase/firebase';

const Home = () => {

  const navigation = useNavigation();
  const movie: any[] = useSelector((state: any) => state.movieReducer.movie)
  const [newmovie, setnewmovie] = useState(movie)
  const [isSelected, setIsSelected] = useState(0);
  const [isClicked, setIsClicked] = useState(true);
  const [lang, setlang] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [data, setdata] = useState<any>({})
  const dispatch = useDispatch();
  const modvisible = useSelector((state: any) => state.visibleReducer.visible);
  const [loading, setLoading] = useState(true);

  const city = useSelector((state: any) => state.cityReducer.city);

  useEffect(() => {
    if (movie) {
      setnewmovie(movie)
      setLoading(false);
    }
  }, [movie])

  // useEffect(() => {
  //   for (let index = 0; index < recommended.length; index++) {
  //     firestore().collection("Movies").doc(recommended[index].title).set(recommended[index])
  //   }
  // },[])
  //console.log(lang);

  return (

    <View style={styles.container}>
      <Header onPress={() => {
        navigation.dispatch(DrawerActions.openDrawer());
      }} image title='Home'></Header>

      {newmovie.length > 0 ?
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
                    borderColor: isSelected == index ? '#ff5492' : 'white',
                    height: 40,
                    backgroundColor: 'white',
                    marginHorizontal: 10,
                    marginVertical: 5,
                    alignItems: "center",
                    justifyContent: 'center',
                    borderRadius: 20,
                    paddingHorizontal: 20,
                    borderWidth: isSelected == index ? 3 : 1,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.23,
                    shadowRadius: 2.62,

                    elevation: 4,
                  }} onPress={() => {
                    setIsSelected(index);
                    setIsClicked(false);
                    setlang(item)
                    const arr = [...movie]
                    const newArr = []
                    for (let i = 0; i < arr.length; i++) {
                      if (arr[i].language.includes(item)) {
                        newArr.push(arr[i])
                      }
                    }
                    if (item === "All") {
                      setnewmovie(arr)
                    }
                    else {
                      setnewmovie(newArr)
                    }
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

                  <FastImage style={styles.recommendedimage1} source={{ uri: data?.img }} />
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
                    <TouchableOpacity onPress={async () => {
                      //console.log(data)
                      await ManageTheater().then((res) => {

                        const result = res.filter((obj) => {
                          //console.log(obj.movieid, data.title,obj.city, city, )

                          return obj.movieid === data.title && obj.city === city
                        })
                        console.log(result);
                        dispatch(managetheaterAction(result))
                      })
                      navigation.navigate('Details', { data })
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
              data={newmovie.filter((res) => {
                return res.movietype === "recommended"
              })}
              renderItem={({ item, index }) => {
                //console.log("tesing : ",item);
                return (

                  <View
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 10,
                      //borderWidth: 1,
                      margin: 10,
                      marginBottom: 20,

                    }}
                  >
                    <TouchableOpacity style={{
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.23,
                      shadowRadius: 2.62,

                      elevation: 4,
                    }} activeOpacity={0.5} onPress={() => {
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
              }
              } />








            <Text style={styles.text}>Now Showing</Text>

            <FlatList
              numColumns={1}
              data={newmovie.filter((res) => {
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
                  <View style={{
                    borderRadius: 15,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
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
                    borderColor: '#F8F8F8',
                    height: 40,
                    backgroundColor: 'white',
                    marginHorizontal: 10,
                    marginVertical: 5,
                    alignItems: "center",
                    justifyContent: 'center',
                    borderRadius: 20,
                    paddingHorizontal: 20,
                    borderWidth: 1,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.23,
                    shadowRadius: 2.62,

                    elevation: 4,
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
              data={newmovie.filter((res) => {
                return res.movietype === "upcoming"
              })}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 10,
                    //borderWidth: 1,
                    margin: 10,
                    // marginBottom: 20,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.23,
                    shadowRadius: 2.62,

                    elevation: 4,
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


            <Model
              pressOut={() => { }}
              visible={modvisible}>
              <View>
                <TouchableOpacity
                  style={{ alignSelf: 'flex-end' }}
                  onPress={() => { dispatch(visibleAction(false)) }}>
                  <Image
                    source={Close}
                    style={{ height: 18, width: 18 }} />
                </TouchableOpacity>
                <Text style={styles.modeltext1}>Are You Sure You Want To Sign Out ?</Text>
              </View>

              <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <TouchableOpacity
                  style={styles.ok}
                  onPress={() => {
                    AsyncStorage.setItem('loggedin', '');
                    auth()
                      .signOut()
                      .then(() => console.log('User signed out!'));
                    navigation.replace('Login');
                    dispatch(visibleAction(false))
                  }}>
                  <Text style={styles.oktext}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancel}
                  onPress={() => { dispatch(visibleAction(false)) }}>
                  <Text style={styles.canceltext}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </Model>

          </ScrollView>
        </View> : <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color='#ff5492' animating={true} />
          {/* <LottieView style={{flex:1}} source={require('../../../LottieFiles/loader.json')} autoPlay loop /> */}
        </View>}
    </View >
  )
};






const styles = StyleSheet.create({
  newcontainer: {
    flex: 1,
    justifyContent: 'center',
  },

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
    borderColor: "white",
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
    borderColor: "white",
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
  },

  modeltext1: {
    marginTop: 15,
    alignSelf: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
    width: 260,
    textAlign: 'center'
  },

  oktext: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18
  },

  ok: {
    backgroundColor: '#ff5492',
    width: 145,
    marginRight: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },

  cancel: {
    backgroundColor: 'white',
    width: 145,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'grey'
  },

  canceltext: {
    color: 'grey',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18
  },
})

export default Home;