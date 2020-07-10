
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ChoosePhotoScreen from '../Screens/ChoosePhotoScreen';
import CanvasDrawScreen from '../Screens/CanvasDrawSceen';


const Stack = createStackNavigator();

const ToddleNavigator = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
          name="ChoosePhotoScreen"
          component={ChoosePhotoScreen} />
        <Stack.Screen 
            name="CanvasDrawScreen"
            component={CanvasDrawScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default ToddleNavigator;
