import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { authenticate } from "../store/auth"
import { useDispatch } from "react-redux";

export default function Home({ navigation }) {
  const dispatch = useDispatch()

  return (
    <View style={styles.homeContainer}>
      <Text>Welcome to BlueMood</Text>
      <Button
        title="Go to Activities Map Demo"
        onPress={() => navigation.navigate("Where to go")}
      ></Button>
      <Button
        title="Test auth"
        onPress={() => dispatch(authenticate('kyle@email.com', 'abc', 'login'))}
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
});
