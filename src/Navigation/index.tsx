import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboard from '../Screens/Onboard';
import Signup from '../Screens/Signup';
import Login from '../Screens/Login';
import Home from '../Screens/Home';
import { useEffect, useState } from 'react';
import Language from '../Screens/Language';
import SelectCity from '../Screens/SelectCity';
import MyDrawer from '../Screens/MyDrawer';
import Profile from '../Screens/Profile';
import FAQ from '../Screens/FAQ';
import Help from '../Screens/Help';
import Header from '../Screens/Header';
import Reviews from '../Screens/Reviews';

const Stack = createNativeStackNavigator();

const Navigation = () => {

    return (
        <Stack.Navigator initialRouteName='MyDrawer'>
            <Stack.Screen
                name="MyDrawer"
                component={MyDrawer}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Onboard"
                component={Onboard}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Signup"
                component={Signup}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Language"
                component={Language}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SelectCity"
                component={SelectCity}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Help"
                component={Help}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="FAQ"
                component={FAQ}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Reviews"
                component={Reviews}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Header"
                component={Header}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>

    );
}

export default Navigation;