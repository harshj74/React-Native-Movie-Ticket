import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, FlatList, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { DrawerActions, NavigationProp, useNavigation } from '@react-navigation/native';
import home from '../../../img/home.png'
import profile from '../../../img/profile.png'
import help from '../../../img/help.png'
import faq from '../../../img/faq.png'
import logout from '../../../img/logout.png'
import reviews from '../../../img/reviews.png'

const { width } = Dimensions.get('window');

const listArray = [
    { icon: home, title: 'Home' },
    { icon: profile, title: 'Profile' },
    { icon: help, title: 'Help' },
    { icon: faq, title: 'FAQ' },
    { icon: reviews, title: 'Reviews' },
]

const listArray1 = [
    { icon: logout, title: 'Logout' },

]
const CustomDrawer = (props: any) => {

    const navigation = useNavigation<NavigationProp<any>>();

    const [isClicked, setisClicked] = useState('Home');

    const Item = ({ title, icon }: any) => (
        <View >
            <TouchableOpacity style={{ ...styles.item, backgroundColor: (title === isClicked) ? 'pink' : 'white' }} onPress={() => {
                if (title === "Home") {
                    navigation.dispatch(DrawerActions.jumpTo('Home'))
                    setisClicked('Home');
                } else if (title === "Profile") {
                    navigation.dispatch(DrawerActions.jumpTo('Profile'))
                    setisClicked('Profile');
                } else if (title === "Help") {
                    navigation.dispatch(DrawerActions.jumpTo('Help'))
                    setisClicked('Help');
                } else if (title === "FAQ") {
                    navigation.dispatch(DrawerActions.jumpTo('FAQ'))
                    setisClicked('FAQ');
                } else if (title === "Reviews") {
                    navigation.dispatch(DrawerActions.jumpTo('Reviews'))
                    setisClicked('Reviews')
                } else {
                    navigation.navigate('Login')
                }
            }}>
                <Image source={icon} style={{ height: 25, width: 25, marginLeft: '2%' }} />
                <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>
        </View>
    );

    const renderItem = ({ item }) =>
        <Item title={item.title} icon={item.icon} />


    // const navigation = useNavigation<NavigationProp<any>>();
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 0.50 }}>
                <FlatList
                    data={listArray}
                    renderItem={renderItem} />
            </View>
            <View style={{ flex: 0.50 }}>
                <FlatList
                    data={listArray1}
                    renderItem={renderItem} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        marginTop: 20,
        paddingVertical: 10,
        marginVertical: 0,
        marginHorizontal: 15,
        flexDirection: 'row',
        borderWidth: 1,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#E1E1E1',
        borderRadius: 15
    },
    title: {
        fontSize: 20,
        marginLeft: 30,
        color: 'black',
        //fontWeight:'bold'
    },
});

export default CustomDrawer;