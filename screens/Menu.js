import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../store/auth";
import { Button } from "react-native-paper";
import {
  useFonts,
  PatrickHandSC_400Regular,
} from "@expo-google-fonts/patrick-hand-sc";
import AppLoading from "expo-app-loading";

export default function Menu({ navigation }) {
  const dispatch = useDispatch();
  let [fontsLoaded] = useFonts({
    PatrickHandSC_400Regular,
  });
  const auth = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logOut());
    navigation.navigate("Logged Out");
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return auth.id ? (
      <View style={styles.container}>
        <Button
          color="white"
          onPress={() => navigation.navigate("Edit Activities")}
          style={styles.btn}
        >
          <Text style={styles.text}>Edit Activities</Text>
        </Button>
        <Button color="white" onPress={handleLogout} style={styles.btn}>
          <Text style={styles.text}>Log Out</Text>
        </Button>

        <Button
          color="white"
          onPress={() => navigation.goBack()}
          style={styles.dismiss}
        >
          Dismiss
        </Button>
      </View>
    ) : (
      <View style={styles.container}>
        <Button
          color="white"
          onPress={() => navigation.navigate("Login")}
          style={styles.btn}
        >
          <Text style={styles.text}>Log in</Text>
        </Button>
        <Button
          color="white"
          onPress={() => navigation.navigate("Register")}
          style={styles.btn}
        >
          <Text style={styles.text}>Sign Up</Text>
        </Button>

        <Button
          color="white"
          onPress={() => navigation.goBack()}
          style={styles.dismiss}
        >
          <Text style={styles.dismissText}> Dismiss </Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f28482",
  },
  text: {
    fontSize: 40,
    fontFamily: "PatrickHandSC_400Regular",
  },
  btn: {
    marginTop: 20,
  },
  dismiss: {
    position: "absolute",
    bottom: 100,
  },
  dismissText: {
    fontFamily: "PatrickHandSC_400Regular",
    fontSize: 20,
  },
});
