import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { Button } from "react-native-paper";
import LottieView from "lottie-react-native";
import eye from "../assets/eye.json";

export default function Home({ navigation }) {
  const dispatch = useDispatch();

  return (
    <View  style={styles.container}>
    <LottieView style={styles.eye} source={eye} autoPlay loop></LottieView>
     <Text style={[styles.title, {top: 80} ]}>Blue</Text>
       <Text style={[styles.title, {top: 290} ]}>Mood</Text>

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
    backgroundColor: "#3c91e6",
  },
  text: {
    fontSize: 40,
  },
  eye: {
    position: 'absolute',
    top: -80
  },
  title: {
    position: "absolute",
    fontSize: 60,
    color: '#fff'
  },
  login: {
    position: "absolute",
    bottom: 160,
  },
  try: {
    position: "absolute",
    bottom: 100,
  },

});
