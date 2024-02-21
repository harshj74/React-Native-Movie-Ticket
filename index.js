/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore'

firestore().settings({
    persistence:false
})
AppRegistry.registerComponent(appName, () => App);
