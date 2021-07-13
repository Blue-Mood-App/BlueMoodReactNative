import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { authenticateLogin } from "../store/auth";
import { useDispatch } from "react-redux";
import Hamburger from "./Navbar";

export default function Home({ navigation }) {
  const dispatch = useDispatch();

  return (
    <View style={styles.homeContainer}>
      <Text>Welcome to BlueMood</Text>

      <Button
        title="Log In"
        onPress={() => navigation.navigate("Login")}
      ></Button>
      <Button
        title="Try It Out"
        onPress={() => navigation.navigate("Select Mood")}
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
