import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";

export default function LoggedOut({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        color="white"
        onPress={() => navigation.navigate("Home")}
        style={styles.btn}
      >
        <Text style={styles.text}>goodbye for now</Text>
      </Button>
      <Button
        color="white"
        onPress={() => navigation.navigate("Home")}
        style={styles.dismiss}
      >
        Dismiss
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F28482",
  },
  text: {
    fontSize: 40,
    color: "white",
  },
  btn: {
    marginTop: 20,
  },
  dismiss: {
    position: "absolute",
    bottom: 100,
  },
});
