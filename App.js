import React from 'react';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ActivitiesMap from './screens/ActivitiesMap';
import Home from './screens/Home';
import Login from "./screens/Login";
import Register from "./screens/Register";
import store from './store';
import { Provider } from 'react-redux';


const Stack = createStackNavigator()

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Where to go" component={ActivitiesMap} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}