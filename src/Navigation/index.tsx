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
import Model from '../Screens/Model';
import Details from '../Screens/Details';
import Theaters from '../Screens/Theaters';
import { cinemasData, moviesData } from '../Firebase/firebase';
import { useDispatch } from 'react-redux';
import { cinemaAction, cityAction, movieAction } from '../Redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTab from '../BottomTab';
import Otp from '../Screens/Otp';
import ForgotPassword from '../Screens/ForgotPassword';
import CreateNewPassword from '../Screens/CreateNewPassword';
import PasswordChanged from '../Screens/PasswordChanged';
import ManageTheater from '../Screens/ManageTheater';
import Payment from '../Payment';

const Stack = createNativeStackNavigator();

const Navigation = (props: any) => {
    const dispatch = useDispatch();
    const [val, setval] = useState();

    useEffect(() => {
        cinemasData().then((res) => {
            //console.log(JSON.stringify(res));
            dispatch(cinemaAction((res)))
        })

        moviesData().then((res) => {
            //console.log(JSON.stringify(res));
            dispatch(movieAction((res)))
        })
        
        AsyncStorage.getItem("city").then((value: any) => {
            console.log(value)
            dispatch(cityAction(value))
        })
    }, [])

    AsyncStorage.getItem('loggedin').then((value: any) => {
        console.log(value);
        setval(value)
    })

    console.log("isOnboarding =>", props.isOnboarding);

    return (
        <Stack.Navigator initialRouteName={props.isOnboarding ?'Onboard': val=== '' ? 'Login' : 'BottomTab' }>
        {/* <Stack.Navigator initialRouteName={props.isOnboarding ? 'Onboard' : 'Login'}> */}
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
                name="Details"
                component={Details}
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
                name="Theaters"
                component={Theaters}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="BottomTab"
                component={BottomTab}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Otp"
                component={Otp}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CreateNewPassword"
                component={CreateNewPassword}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PasswordChanged"
                component={PasswordChanged}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ManageTheater"
                component={ManageTheater}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>

    );
}

export default Navigation;