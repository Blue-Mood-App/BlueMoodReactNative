import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
} from "react-native";
import { fetchActivity } from "../store/activities";
import { useSelector, useDispatch } from "react-redux";
import { getLocation } from "../store/location";
import excited from "../assets/icons/excited.png";
import happy from "../assets/icons/happy.png";
import calm from "../assets/icons/calm.png";
import sad from "../assets/icons/sad.png";
import depressed from "../assets/icons/depressed.png";
import LottieView from "lottie-react-native";
import excitedFace from "../assets/excitedFace.json";
import content from "../assets/content.json";
import sadFace from "../assets/sadFace.json";
import happyFace from "../assets/happy.json";
import irritated from "../assets/irritated.json";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFonts,
  PatrickHandSC_400Regular,
} from "@expo-google-fonts/patrick-hand-sc";

const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");

export default function MoodsPage({ navigation }) {
  let [fontsLoaded] = useFonts({
    PatrickHandSC_400Regular,
  });
  const dispatch = useDispatch();
  const handleSubmit = (val) => {
    dispatch(fetchActivity(val));
    navigation.navigate("Select Activity");
  };

  useEffect(() => {
    dispatch(getLocation());
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0.9, y: 0 }}
        end={{ x: 2.4, y: 0.5 }}
        colors={["#bdb2ff", "#80ffdb"]}
        style={styles.background}
      >
        <Text style={styles.text}>How you feeling today?</Text>
        <TouchableOpacity
          style={styles.btnSpacing}
          onPress={() => handleSubmit(1)}
        >
          <LottieView
            style={styles.icon}
            source={irritated}
            autoPlay
            loop
          ></LottieView>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnSpacing}
          onPress={() => handleSubmit(2)}
        >
          <LottieView
            style={styles.icon}
            source={sadFace}
            autoPlay
            loop
          ></LottieView>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnSpacing}
          onPress={() => handleSubmit(3)}
        >
          <LottieView
            style={styles.icon}
            source={content}
            autoPlay
            loop
          ></LottieView>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnSpacing}
          onPress={() => handleSubmit(4)}
        >
          <LottieView
            style={styles.icon}
            source={happyFace}
            autoPlay
            loop
          ></LottieView>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnSpacing}
          onPress={() => handleSubmit(5)}
        >
          <LottieView
            style={styles.icon}
            source={excitedFace}
            autoPlay
            loop
          ></LottieView>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  btnSpacing: {
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#E2F2CE",
  },
  text: {
    textAlign: "center",
    fontFamily: "PatrickHandSC_400Regular",
    fontSize: 38,
    paddingTop: 10,
  },
  icon: {
    height: 100,
    marginTop: 10,
    alignSelf: "center",
    shadowColor: "#525252",
    shadowOffset: {
      width: 5,
      height: 7,
    },
    shadowOpacity: 0.95,
    shadowRadius: 5.94,
  },
  background: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    height: height,
    width: width,
  },
});
