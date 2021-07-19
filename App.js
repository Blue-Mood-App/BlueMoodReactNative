import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-native-gesture-handler";
import { StyleSheet, TouchableOpacity, Dimensions, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ActivitiesMap from "./screens/ActivitiesMap";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import MoodsPage from "./screens/MoodsPage";
import LoggedOut from "./screens/LoggedOut";
import store from "./store";
import { Provider } from "react-redux";
import RegisterActivities from "./screens/RegisterActivities";
import EditMoods from "./screens/EditMoods";
import UserContacts from "./screens/UserContacts";
import UpdatedMeet from "./screens/UpdatedMeet";
import { AntDesign, Feather } from "@expo/vector-icons";
import AniActivitiesPage from "./screens/AniActivitiesPage";
import Menu from "./screens/Menu";
import Contacts from "./screens/Contacts";
import { me } from "./store/auth";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  OpenSansCondensed_300Light,
  OpenSansCondensed_700Bold,
} from "@expo-google-fonts/open-sans-condensed";
import { PatrickHandSC_400Regular } from "@expo-google-fonts/patrick-hand-sc";
import AppLoading from "expo-app-loading";
//import * as Font from "expo-font";

const { width } = Dimensions.get("window");

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

const Main = ({ navigation }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const menuButton = () => (
    <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
      <Feather style={styles.icon} name="menu" size={30} color="white" />
    </TouchableOpacity>
  );

  useEffect(() => {
    dispatch(me());

    return () => {};
  }, []);

  return (
    <Stack.Navigator>
      {!auth.id ? (
        <Stack.Screen
          name="Home"
          options={{
            title: null,
            headerStyle: {
              shadowColor: "transparent",
              backgroundColor: "#3C91E6",
            },
            headerRight: () => menuButton(),
            headerLeft: false,
          }}
          component={Home}
        />
      ) : (
        <></>
      )}
      <Stack.Screen
        name="Select Mood"
        component={MoodsPage}
        options={{
          title: "",
          headerStyle: {
            shadowColor: "#bdb2ff",
            backgroundColor: "#bdb2ff",
          },
          headerRight: () => menuButton(),
          headerLeft: false,
        }}
      />
      <Stack.Screen
        name="Map"
        component={ActivitiesMap}
        options={{
          title: null,
          headerStyle: {
            shadowColor: "transparent",
            backgroundColor: "#f28482",
          },
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <AntDesign
              name="arrowleft"
              style={{ marginLeft: 20 }}
              size={30}
              color="black"
            />
          ),
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: null,
          headerStyle: {
            shadowColor: "transparent",
            backgroundColor: "#8edce6",
          },
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: null,
          headerStyle: {
            shadowColor: "transparent",
            backgroundColor: "#f19c79",
          },
        }}
      />
      <Stack.Screen
        name="Register Activities"
        component={RegisterActivities}
        options={{
          title: null,
          headerStyle: {
            shadowColor: "transparent",
            backgroundColor: "#fcd29f",
          },
        }}
      />
      <Stack.Screen
        name="User Contacts"
        component={UserContacts}
        options={{
          title: null,
          headerStyle: {
            shadowColor: "transparent",
            backgroundColor: "#f19c79",
          },
        }}
      />
      <Stack.Screen
        name="Select Activity"
        component={AniActivitiesPage}
        options={{
          title: null,
          headerStyle: {
            shadowColor: "transparent",
            backgroundColor: "#EBF0FE",
          },
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <AntDesign
              name="arrowleft"
              style={{ marginLeft: 20 }}
              size={30}
              color="black"
            />
          ),
        }}
      />
      <Stack.Screen
        name="Edit Activities"
        component={EditMoods}
        options={{
          title: null,
          headerStyle: {
            shadowColor: "transparent",
            backgroundColor: "#fcd29f",
          },
        }}
      />

      {/* <Stack.Screen
        name="Connect"
        component={UpdatedMeet}
        options={{
          title: null,
          headerStyle: {
            shadowColor: "transparent",
            backgroundColor: "#fcd29f",
          },
        }}
      /> */}
      <Stack.Screen name="Contacts page" component={Contacts} />
    </Stack.Navigator>
  );
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  let [fontsLoaded] = useFonts({
    OpenSansCondensed_300Light,
    OpenSansCondensed_700Bold,
    PatrickHandSC_400Regular,
  });

  const prepare = async () => {
    try {
      // Keep the splash screen visible while we fetch resources
      await SplashScreen.preventAutoHideAsync();
      // Pre-load fonts, make any API calls you need to do here
      //await Font.loadAsync(Entypo.font);
      // Artificially delay for two seconds to simulate a slow loading
      // experience. Please remove this if you copy and paste the code!
    } catch (e) {
      console.warn(e);
    } finally {
      // Tell the application to render
      setAppIsReady(true);
    }
  };

  useEffect(() => {
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          {/* <View onLayout={onLayoutRootView}> */}
          <RootStack.Navigator mode="modal" headerMode="none">
            <RootStack.Screen
              name="Main"
              component={Main}
              options={{ headerShown: false }}
            />
            <RootStack.Screen name="Menu" component={Menu} />
            <RootStack.Screen name="Logged Out" component={LoggedOut} />
          </RootStack.Navigator>
          {/* </View> */}
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 23,
    left: 100,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 40,
  },
});
