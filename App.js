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
import LoggedOut from "./screens/LoggedOut";
import store from "./store";
import { Provider } from "react-redux";
import Hamburger from "./screens/Navbar";
import RegisterActivities from "./screens/RegisterActivities";
import EditProfile from "./screens/EditProfile";
import EditMoods from "./screens/EditMoods";
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

  console.log(auth)

  return (
  <Stack.Navigator>
 { !auth.id ? (
      <Stack.Screen
        name="Home"
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
              <Image style={styles.icon} source={hamburger} />
            </TouchableOpacity>
          ),
        }}
        component={Home}
      /> ) : <></>}
      <Stack.Screen
        name="Select Mood"
        component={MoodsPage}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
              <Image style={styles.icon} source={hamburger} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="Where to go" component={ActivitiesMap} />
      { auth.id ? (
        <Stack.Screen
          name="Home"
          options={{
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                <Image style={styles.icon} source={hamburger} />
              </TouchableOpacity>
            ),
          }}
          component={Home}
        /> ) : <></>}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Register Activities" component={RegisterActivities} />
      <Stack.Screen name="User Contacts" component={UserContacts} />
      <Stack.Screen name="Select Activity" component={ActivitiesPage} />
      <Stack.Screen name="Select Activity Ani" component={AniActivitiesPage} />
      <Stack.Screen name="Select Activity" component={ActivitiesPage} />
      <Stack.Screen name="Profile" component={EditMoods} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <Hamburger style={styles.container} />
      <NavigationContainer>
        <RootStack.Navigator mode="modal" headerMode="none">
          <RootStack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          />
          <RootStack.Screen name="Menu" component={Menu} />
          <RootStack.Screen name="Logged Out" component={LoggedOut} />
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
