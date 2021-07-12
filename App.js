import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-native-gesture-handler";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Button,
} from "react-native";
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
import RegisterActivities from "./screens/RegisterActivities";
import UserContacts from "./screens/UserContacts";
import hamburger from "./assets/Hamburger_icon.png";
import AniActivitiesPage from "./screens/AniActivitiesPage";
import Menu from "./screens/Menu";
import { me } from "./store/auth";


const Stack = createStackNavigator();
const RootStack = createStackNavigator();

const Main = ({ navigation }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
    return () => {
    };
  }, []);

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("MyModal")}>
              <Image style={styles.icon} source={hamburger} />
            </TouchableOpacity>
          ),
        }}
        component={Home}
      />
      <Stack.Screen name="Where to go" component={ActivitiesMap} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        name="Select Mood"
        component={MoodsPage}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("MyModal")}>
              <Image style={styles.icon} source={hamburger} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="Register Activities" component={RegisterActivities} />
      <Stack.Screen name="Select Activity" component={ActivitiesPage} />
      <Stack.Screen name="Select Activity Ani" component={AniActivitiesPage} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator mode="modal" headerMode="none">
          <RootStack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          />
          <RootStack.Screen name="MyModal" component={Menu} />
        </RootStack.Navigator>
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
  icon: {
    width: 25,
    height: 25,
  },
});
