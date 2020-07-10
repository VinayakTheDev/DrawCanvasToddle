/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
 Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { enableScreens } from 'react-native-screens';
import ToddleNavigator from './Navigation/ToddleNavigation';
const win = Dimensions.get('window');
const App = () => {
  Icon.loadFont();
  enableScreens();
  return (
    <ToddleNavigator/>
  )

}



export default App