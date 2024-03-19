import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import back from '../../../img/back.png'
import info from '../../../img/help.png'
import { Theaters, dates } from '../../Utils/Data'
import { useNavigation } from '@react-navigation/native'
import YoutubePlayer from "react-native-youtube-iframe";
import search from '../../../img/search.png'
import loc from '../../../img/loc.png'
import play from '../../../img/play.png'

const Details = ({ route }) => {

    const [selected, setselected] = useState(true);
    const [date, setdate] = useState();
    const navigation = useNavigation();
    const { videoid, title, img, imglandscape } = route.params.data;
    const [isSelected, setisSelected] = useState()
    const [playing, setPlaying] = useState(false);
    const [mon, setmon] = useState('');

    var today = new Date();

    var today1 = new Date();
    var dat2 = today1.getDate() + 1;
    today1.setDate(dat2)

    var today2 = new Date();
    var dat3 = today2.getDate() + 2;
    today2.setDate(dat3)

    var today3 = new Date();
    var dat4 = today3.getDate() + 3;
    today3.setDate(dat4)

    var today4 = new Date();
    var dat5 = today4.getDate() + 4;
    today4.setDate(dat5)

    var today5 = new Date();
    var dat6 = today5.getDate() + 5;
    today5.setDate(dat6)

    var today6 = new Date();
    var dat7 = today6.getDate() + 6;
    today6.setDate(dat7)

    const dates = [
        {
            day: today.toLocaleString('en-US', { weekday: 'short' }),
            dat: today.getDate()
        },
        {
            day: today1.toLocaleString('en-US', { weekday: 'short' }),
            dat: today1.getDate()
        },
        {
            day: today2.toLocaleString('en-US', { weekday: 'short' }),
            dat: today2.getDate()
        },
        {
            day: today3.toLocaleString('en-US', { weekday: 'short' }),
            dat: today3.getDate()
        },
        {
            day: today4.toLocaleString('en-US', { weekday: 'short' }),
            dat: today4.getDate()
        },
        {
            day: today5.toLocaleString('en-US', { weekday: 'short' }),
            dat: today5.getDate()
        },
        {
            day: today6.toLocaleString('en-US', { weekday: 'short' }),
            dat: today6.getDate()
        }        
    ]

    const onStateChange = useCallback((state: string) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);

    const currentDate = new Date();
    const options = { month: 'short' };
    const month = new Intl.DateTimeFormat('en-US', options).format(currentDate).toUpperCase();
    //console.log(month)

    return (
        <View style={styles.mainview}>
            <View style={styles.iv}>
                <View style={styles.iv2}>
                    <TouchableOpacity onPress={() => {
                        //console.log(title)
                        navigation.goBack();
                    }}>
                        <Image style={styles.backimg} source={back} />
                    </TouchableOpacity>
                    <Text style={{ color: 'black', fontWeight: '600', fontSize: 17 }}>{title}</Text>
                </View>

                {/* <Image style={styles.searchimg} source={search} /> */}

            </View>

            {/* <Image resizeMode='stretch' style={{ height: '23%', width: '100%', marginBottom: 15, zIndex: 1 }} source={{ uri: imglandscape ?? img }} /> */}

            {/* <View style={{ marginTop: '13%', height: "23%", width: "100%", borderWidth: 1, backgroundColor: 'black', position: 'absolute', zIndex: 1, opacity: 0.8 }}>
                <TouchableOpacity onPress={togglePlaying}>
                    <Image tintColor="#ff5492" style={styles.play} source={play} />
                </TouchableOpacity>
            </View>  */}


            {/* Youtube Tab */}
            
                <YoutubePlayer
                    height={240}
                    play={playing}
                    videoId={videoid}
                    onChangeState={onStateChange}
                />

            <View style={{ alignItems: 'center',  marginBottom: 15, flexDirection: 'row', marginHorizontal: 20, }}>
                <View style={{ backgroundColor: 'grey', paddingVertical: 19.3, paddingHorizontal: 5, borderRadius: 7 }}>
                    <Text style={{ fontWeight: 'bold', color: 'white', transform: [{ rotate: '270deg' }] }}>{month}</Text>
                </View>
                <FlatList showsHorizontalScrollIndicator={false} horizontal data={dates} renderItem={({ item, index }) => (
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                            setisSelected(index)
                            setdate(item)
                            setselected(false)
                            //console.log(index)
                        }}
                        style={{ alignItems: 'center', paddingHorizontal: 10, paddingVertical: 10, marginHorizontal: 10, borderRadius: 7, backgroundColor: isSelected == index ? '#ff5492' : 'white', width: 50 }}>
                        <Text style={{ color: isSelected == index ? 'white' : '#ff5492', fontWeight: '700', fontSize: 14 }}>{item.day}</Text>
                        <Text style={{ color: isSelected == index ? 'white' : 'black', fontWeight: '700' }}>{item.dat}</Text>

                    </TouchableOpacity>
                )} />
            </View>
            <View>
                <Image tintColor='grey' style={{ position: 'absolute', height: 20, width: 20, marginLeft: 32, marginTop: 10 }} source={search}></Image>
                <TextInput style={{ borderWidth: 1, marginHorizontal: 20, paddingLeft: 40, paddingRight: 15, paddingVertical: 5, borderRadius: 25, marginBottom: 20, borderColor: 'grey' }} placeholder='Search...'></TextInput>
            </View>


            <FlatList showsVerticalScrollIndicator={false} style={{ marginHorizontal: 20, }} data={Theaters} renderItem={({ item, index }) => (
                <View
                    style={{
                        //height: 160,
                        borderWidth: 2,
                        //marginBottom: 10,
                        //marginTop: 15,
                        borderRadius: 12,
                        borderColor: '#E3E3E3',
                        padding: 10,
                        gap: 10, marginBottom: 15
                    }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                        <View style={{ flexDirection: 'row', gap: 10 }}>

                            <Text style={{ color: 'black', fontSize: 15, fontWeight: '500' }}>{item.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 3, }}>
                            <Image style={{ height: 20, width: 20, }} source={loc} />
                            <Text style={{ color: 'black' }}>{item.distance}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        <Image style={{ height: 20, width: 20, }} source={info} />
                        <Text style={{ fontWeight: '400', fontSize: 12, alignItems: 'center', color: 'black' }}>Non-cancellable</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {
                            item.timings.map((value, index) => (
                                <TouchableOpacity
                                    disabled={selected}
                                    onPress={() => {
                                        //console.log(date)
                                        navigation.navigate('Theaters', {
                                            title,
                                            mall: item.name,
                                            date,
                                            time: value
                                        })
                                    }}
                                    activeOpacity={0.2}
                                    key={index}
                                    style={styles.time}>
                                    <Text style={{ fontSize: 13, color: 'green' }}>{value}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>
            )} />
        </View>
    )
}

const styles = StyleSheet.create({
    mainview: {
        flex: 1,
        backgroundColor: 'white',
        //gap: 10,
    },
    iv: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: 13,
        //borderBottomColor: '#E3E3E3',
        //borderBottomWidth: 2,
        justifyContent: 'space-between',
        //backgroundColor: 'red',
    },
    iv2: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    backimg: {
        height: 20,
        width: 20,
        tintColor: '#ff5492'
    },
    searchimg: {
        height: 22,
        width: 22,
        tintColor: '#ff5492'
    },
    time: {
        paddingHorizontal: 11,
        borderWidth: 2,
        borderColor: 'green',
        marginRight: 6,
        //justifyContent:"space-evenly",
        borderRadius: 10,
        marginBottom: 7,
        paddingVertical: 5
    },
    play: {
        position: "absolute",
        height: 50,
        width: 50,
        alignSelf: "center",
        borderRadius: 50,
        top: 65
    }
})
export default Details;