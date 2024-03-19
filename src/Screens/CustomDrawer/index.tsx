import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, FlatList, } from 'react-native'
import React, { useState } from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { DrawerActions, NavigationProp, useNavigation } from '@react-navigation/native';
import home from '../../../img/home.png'
import profile from '../../../img/profile.png'
import help from '../../../img/help.png'
import faq from '../../../img/faq.png'
import logout from '../../../img/logout.png'
import star from '../../../img/star.png'
import Model from '../Model';
import { useDispatch } from 'react-redux';
import { visibleAction } from '../../Redux/actions';

const { width } = Dimensions.get('window');

const listArray = [
    { icon: home, title: 'Home' },
    { icon: profile, title: 'Profile' },
    { icon: help, title: 'Help' },
    { icon: faq, title: 'FAQ' },
    { icon: star, title: 'Reviews' },
]

const listArray1 = [
    { icon: logout, title: 'Logout' },

]
const CustomDrawer = (props: any) => {

    const navigation = useNavigation<StackNavigationProp<{ route: {} }>>();

    const [isClicked, setisClicked] = useState('Home');
    //const [modelvisible, setmodelvisible] = useState(false);
    const dispatch = useDispatch();

    const Item = ({ title, icon }: any) => (
        <View>
            <TouchableOpacity style={{ ...styles.item, backgroundColor: (title === isClicked) ? '#F6F6F6' : 'white' }} onPress={() => {
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
                    dispatch(visibleAction(true))
                    navigation.dispatch(DrawerActions.closeDrawer())
                }
            }}>
                <Image source={icon} style={{ height: 20, width: 20, marginLeft: '2%' }} tintColor='#ff5492' />
                <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>


        </View>
    );

    const renderItem = ({ item }:any) =>
        <Item title={item.title} icon={item.icon} />


    // const navigation = useNavigation<NavigationProp<any>>();
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 0.50 }}>
                <FlatList showsVerticalScrollIndicator={false}
                    data={listArray}
                    renderItem={renderItem} />
            </View>
            <View style={{ flex: 0.50 }}>
                <FlatList showsVerticalScrollIndicator={false}
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
        borderRadius: 15, alignItems:'center'
    },
    title: {
        fontSize: 17,
        marginLeft: 30,
        color: 'black',
        //fontWeight:'bold'
    },
});

export default CustomDrawer;