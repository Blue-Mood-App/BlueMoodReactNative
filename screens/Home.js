import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Home({ navigation }) {

  return (
    <View style={styles.homeContainer}>
      <Text>Welcome to BlueMood</Text>
      <Button
        title="Go to Activities Map Demo"
        onPress={() => navigation.navigate("Where to go")}
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
