import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import SplashScreen from './src/Screens/SplashScreen';
import Navigation from './src/Navigation/index'
import { NavigationContainer } from '@react-navigation/native';
import { Wrapper } from './src/Context/Wrapper';
import { Provider } from 'react-redux';
import store from './src/Redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {

  const [isloaded, setIsLoaded] = useState(false);
  const [isOnboarding, setisOnboarding] = useState<boolean>(false);

  setInterval(() => {
    setIsLoaded(true)
  }, 2500);

  useEffect(() => {
    AsyncStorage.getItem("city").then((value: any) => {
      console.log("valuevalue : ", value);
      
      if (value === null) {
        setisOnboarding(true)
      }
    })
  }, [])

  return (
    <Provider store={store}>
      {/* <Wrapper> */}
      <NavigationContainer>
        {isloaded ? <Navigation isOnboarding={isOnboarding} /> : <SplashScreen />}
      </NavigationContainer>
      {/* </Wrapper> */}
    </Provider>
  );
};

export default App;
