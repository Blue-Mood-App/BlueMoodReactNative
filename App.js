import React from 'react';
import 'react-native-gesture-handler'
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ActivitiesMap from './screens/ActivitiesMap';
import Home from './screens/Home';
import { Provider } from 'react-redux';
import store from './store'

const Stack = createStackNavigator()

export default function App() {

  return (
    <NavigationContainer>
    <Provider store={store}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Where to go" component={ActivitiesMap} />
      </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 23,
    marginHorizontal: 13,
    marginBottom: 30,
  },
});
