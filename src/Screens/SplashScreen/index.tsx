import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import MovieTicket from '../../../img/MovieTicket.png'

const SplashScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Image source={MovieTicket} style={styles.innerimage} />
            <View style={styles.innercontainer}>
                <Text style={styles.text1}>MOVIE</Text>
                <Text style={styles.text2}>TICKET</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerimage: {
        alignItems: 'center',
        resizeMode: 'contain',
        width: 200,
        height: 260,
        //backgroundColor:'red'
    },
    text1:{
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '900',
        color:'#ff5492'
    },
    text2:{
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '900',
        color:'#54768a'
    },
    innercontainer:{
        //display:'flex',
        flexDirection:'row',
        //alignContent:'space-between',
        columnGap:10,
        //bottom:100
    }
})

export default SplashScreen;