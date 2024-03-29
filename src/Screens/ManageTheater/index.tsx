import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Header'
import theater from '../../../img/theatre.png'
import firestore, { firebase } from '@react-native-firebase/firestore';

const ManageTheater = () => {

    const [id, setid] = useState('');

    const ok = () => {
        firestore()
            .collection('ManageTheater')
            .add({}).then((res: any) => {
                setid(res.id)
                console.log(id);
            }) 
    }

    const saveData = () => {
        firestore()
            .collection('ManageTheater')
            .doc(id)
            .set({
                id:id,
                cinemaid: cinemaid,
                movieid: movieid,
                city: city
            })
        setCinemaid('')
        setMovieid('')
        setCity('')
        setbtn(false)
    }

    const [cinemaid, setCinemaid] = useState('');
    const [movieid, setMovieid] = useState('');
    const [city, setCity] = useState('');
    const [btn, setbtn] = useState(false);

    return (
        <View style={styles.container}>
            <Header title='Manage Theater' source={theater} />
            <View style={styles.innercontainer}>
                <Text style={styles.aboveinput}>Cinema Id</Text>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Cinema Id"
                        value={cinemaid}
                        onChangeText={text => {
                            setCinemaid(text);
                            console.log(cinemaid);
                            
                        }}>
                    </TextInput>
                </View>
            </View>

            <View style={styles.innercontainer}>
                <Text style={styles.aboveinput}>Movie Id</Text>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Movie Id"
                        value={movieid}
                        onChangeText={text => {
                            setMovieid(text);
                            console.log(movieid);
                            
                        }}>
                    </TextInput>
                </View>
            </View>

            <View style={styles.innercontainer}>
                <Text style={styles.aboveinput}>City</Text>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter City"
                        value={city}
                        onChangeText={text => {
                            setCity(text);
                            console.log(city);
                            
                        }}>
                    </TextInput>
                </View>
            </View>

            <TouchableOpacity disabled={btn} style={{ ...styles.btn, backgroundColor : btn ? 'green' : '#ff5492'}} onPress={() => {
                setbtn(true)
                ok();
            }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Ok</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={{ ...styles.btn, backgroundColor: '#ff5492', }} onPress={() => {
                saveData();
            }}>
                <Text style={{color:'white', fontSize:20, fontWeight:'bold'}}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ManageTheater

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    txt: {
        fontSize: 20,
        color: 'black'
    },
    innercontainer: {
        //backgroundColor:'pink',
        paddingHorizontal: 20,
        marginBottom: 10
    },
    aboveinput: {
        color: 'grey',
        fontWeight: '600',
        marginBottom: 1,
        marginLeft: 5
    }, 
    input: {
        fontSize: 15,
        color: 'gray',
        marginBottom: 5,
        borderColor: '#ff5492',
        borderRadius: 15,
        borderWidth: 2,
        paddingHorizontal: 15
    },
    btn: {
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15
    }
})