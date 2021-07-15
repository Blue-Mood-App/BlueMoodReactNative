import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { authenticateLogin } from "../store/auth";
import { useDispatch } from "react-redux";
import { Button } from "react-native-paper";
import {
  useFonts,
  PatrickHandSC_400Regular,
} from "@expo-google-fonts/patrick-hand-sc";
import AppLoading from "expo-app-loading";

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  let [fontsLoaded] = useFonts({
    PatrickHandSC_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Button
          color="white"
          onPress={() => navigation.navigate("Login")}
          style={styles.login}
        >
          <Text style={styles.text}>Log In</Text>
        </Button>

        {/* <Button
          color="white"
          onPress={() => navigation.navigate("Contacts page")}
          style={styles.contacts}
        >
          <Text style={styles.text}>Contact</Text>
        </Button> */}
        <Button
          color="white"
          onPress={() => navigation.navigate("Select Mood")}
          style={styles.try}
        >
          <Text style={styles.text}>Try It Out</Text>
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
    backgroundColor: "#3c91e6",
  },
  text: {
    fontSize: 40,
    fontFamily: "PatrickHandSC_400Regular",
  },
  login: {
    position: "absolute",
    bottom: 160,
  },
  contacts: {
    position: "absolute",
    bottom: 300,
  },
  try: {
    position: "absolute",
    bottom: 100,
  },
});
