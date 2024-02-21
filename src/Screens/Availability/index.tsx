import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Availability = (props) => {
    return (
        <View style={styles.mainview}>
            <View style={{ ...styles.iv, backgroundColor: props.color, }}/>
            <Text style={styles.text}>{props.name}</Text>
            
        </View>
    )
}

export default Availability

const styles = StyleSheet.create({
    mainview: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    iv: {
        height: 20,
        width: 20,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5
    },
    text: {
        color: 'grey',
        fontWeight: '400',
        fontSize: 12
    }
})