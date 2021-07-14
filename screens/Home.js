import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { authenticateLogin } from "../store/auth";
import { useDispatch } from "react-redux";
import { Button } from "react-native-paper";

export default function Home({ navigation }) {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Button
        color="white"
        onPress={() => navigation.navigate("Login")}
        style={styles.login}
      >
        <Text style={styles.text}>Log In</Text>
      </Button>
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



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#3c91e6'
  },
  text: {
    fontSize: 40,
  },
  login: {
    position:'absolute',
    bottom: 160
  },
  try: {
    position:'absolute',
    bottom: 100
  }
});
