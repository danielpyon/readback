import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LibraryScreen from './components/LibraryScreen';
import BookScreen from './components/BookScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Library">
        <Stack.Screen
          name="Library"
          component={ LibraryScreen }
          options={{ title: "Library" }}
        />
        <Stack.Screen
          name="Book"
          component={ BookScreen }
          options={{
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
