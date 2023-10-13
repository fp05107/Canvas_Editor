import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screens/Splash';
import MyProjects from '../screens/MyProjects';
import Home from '../screens/Home';
import CreateCanvas from '../screens/CreateCanvas';
import Canvas from '../screens/MyCanvas';
import MyCanvas from '../screens/MyCanvas';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MyCanvas"
          options={{headerShown: false}}
          component={MyCanvas}
        />

        <Stack.Screen name="Splash" options={{headerShown: false}}>
          {props => <Splash />}
        </Stack.Screen>
        <Stack.Screen name="MyProjects" options={{headerShown: false}}>
          {props => <MyProjects />}
        </Stack.Screen>
        <Stack.Screen name="Home" options={{headerShown: false}}>
          {props => <Home />}
        </Stack.Screen>
        <Stack.Screen name="CreateCanvas" options={{headerShown: false}}>
          {props => <CreateCanvas />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
