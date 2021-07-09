import React from "react";
import "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ActivitiesMap from "./screens/ActivitiesMap";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import MoodsPage from "./screens/MoodsPage";
import ActivitiesPage from "./screens/ActivitiesPage";
import store from "./store";
import { Provider } from "react-redux";
import Hamburger from "./screens/Navbar";
import RegisterActivities from "./screens/RegisterActivities";
import UserContacts from "./screens/UserContacts";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <Hamburger style={styles.container} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Where to go" component={ActivitiesMap} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Select Mood" component={MoodsPage} />
          <Stack.Screen
            name="Register Activities"
            component={RegisterActivities}
          />
          <Stack.Screen name="Select Activity" component={ActivitiesPage} />
          <Stack.Screen name="User Contacts" component={UserContacts} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 23,
    left: 100,
  },
});
