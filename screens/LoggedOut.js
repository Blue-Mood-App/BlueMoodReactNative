import React from "react";
import { TouchableOpacity, StyleSheet, View, Text, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../store/auth";

export default function LoggedOut({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>You are now logged out!</Text>
      <Button onPress={() => navigation.navigate("Home")} title="Dismiss" />
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 23,
    padding: 20,
  },
});
