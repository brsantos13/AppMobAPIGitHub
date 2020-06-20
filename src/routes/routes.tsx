import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import '../config/ReactotronConfig';

import Main from '../pages/Main';
import User from '../pages/User';
import PageWeb from '../pages/PageWeb';

// import { Container } from './styles';

const Stack = createStackNavigator();

const Route = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardStyle: {
            backgroundColor: '#f0f0f5',
          },
          headerStyle: {
            backgroundColor: '#7159c1',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#FFF',
          headerBackTitleVisible: false,
        }}>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: 'Usuarios',
          }}
        />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="PageWeb" component={PageWeb} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
