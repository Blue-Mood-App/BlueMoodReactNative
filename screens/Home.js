import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { authenticateLogin } from "../store/auth";
import { useDispatch } from "react-redux";
import Hamburger from "./Navbar.js";

export default function Home({ navigation }) {
  const dispatch = useDispatch();

  return (
    <View style={styles.homeContainer}>
    <Hamburger />
      <Text>Welcome to BlueMood</Text>
      <Button
        title="Go to Activities Map Demo"
        onPress={() => navigation.navigate("Where to go")}
        style={styles.btn}
      ></Button>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Login")}
        style={styles.btn}
      ></Button>
      <Button
        title="Test auth"
        onPress={() =>
          dispatch(authenticateLogin("yagna@email.com", "abc", "login"))
        }
      ></Button>
      <Button
        title="Select Mood"
        onPress={() => navigation.navigate("Select Mood")}
      ></Button>
      <Button
        title="Go to Register Activities"
        onPress={() => navigation.navigate("Register Activities")}
        ></Button>
      <Button
        title="Select Activity"
        onPress={() => navigation.navigate("Select Activity")}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    marginVertical: 8,
  },
});
