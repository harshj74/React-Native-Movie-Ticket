import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import back from '../../../img/back.png'
import search from '../../../img/search.png'
import info from '../../../img/info.png'
import { Theaters, dates } from '../../Utils/Data'
import { useNavigation } from '@react-navigation/native'
import loc from '../../../img/loc.png'

const Details = ({ route }) => {

    const [selected, setselected] = useState(true);
    const [date, setdate] = useState();
    const navigation = useNavigation();
    const { title, img, imglandscape } = route.params.data;
    const [isSelected, setisSelected] = useState()

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
            <Image resizeMode='stretch' style={{ height: '23%', width: '100%', marginBottom: 15 }} source={{ uri: imglandscape ?? img }} />
            <View style={{ height: '11%', alignItems: 'center', marginBottom: 15 }}>

                <FlatList showsHorizontalScrollIndicator={false} horizontal data={dates} renderItem={({ item, index }) => (
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                            setisSelected(index)
                            setdate(item)
                            setselected(false)
                            //console.log(index)
                        }}
                        style={{ alignItems: 'center', justifyContent: 'space-evenly', paddingHorizontal: 10, marginHorizontal: 10, borderRadius: 7, backgroundColor: isSelected == index ? '#ff5492' : 'white', }}>
                        <Text style={{ color: isSelected == index ? 'white' : '#ff5492', fontWeight: '400', fontSize: 14 }}>{item.day}</Text>
                        <Text style={{ color: isSelected == index ? 'white' : 'black', fontWeight: '700' }}>{item.dat}</Text>
                        <Text style={{ color: isSelected == index ? 'white' : 'black', fontWeight: '400', fontSize: 14 }}>{item.mon}</Text>
                    </TouchableOpacity>
                )} />


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
                        padding:10,
                        gap: 10, marginBottom:15 
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
        height: '6.5%',
        paddingHorizontal: 13,
        //borderBottomColor: '#E3E3E3',
        //borderBottomWidth: 2,
        justifyContent: 'space-between',
        //backgroundColor: 'red',
    },
    iv2: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
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
    }
})
export default Details;