import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";
import {
  useFonts,
  PatrickHandSC_400Regular,
} from "@expo-google-fonts/patrick-hand-sc";
import AppLoading from "expo-app-loading";

export default function LoggedOut({ navigation }) {
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
          <Text style={styles.dismissText}>Dismiss</Text>
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
    backgroundColor: "#F28482",
  },
  text: {
    fontSize: 40,
    fontFamily: "PatrickHandSC_400Regular",
    color: "white",
  },
  btn: {
    marginTop: 20,
  },
  dismiss: {
    position: "absolute",
    fontFamily: "PatrickHandSC_400Regular",
    bottom: 100,
  },
  dismissText: {
    fontFamily: "PatrickHandSC_400Regular",
    fontSize: 20,
  },
});
