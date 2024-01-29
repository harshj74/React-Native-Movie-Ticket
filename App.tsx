import 'react-native-gesture-handler'
import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import SplashScreen from './src/Screens/SplashScreen';
import Navigation from './src/Navigation/index'
import { NavigationContainer } from '@react-navigation/native';

const App = () => {

  const [isloaded, setIsLoaded] = useState(false);

  setInterval(() => {
    setIsLoaded(true)
  }, 2000);

  return (
    <>
      <NavigationContainer>
        {isloaded ? <Navigation  /> : <SplashScreen />}
      </NavigationContainer>
    </>
  );
};

export default App;
