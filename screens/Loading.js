import React from "react";
import eye from "../assets/eye.json";
import LottieView from "lottie-react-native";
import { StyleSheet, Text, View } from "react-native";

export default function Loading() {
  return (
    <View style={styles.container}>
      <LottieView style={styles.eye} source={eye} autoPlay loop></LottieView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f28482",
  },
  eye: {
    width: 100,
  },
});
