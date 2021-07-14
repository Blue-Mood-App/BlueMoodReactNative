import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, View, Text, Image } from "react-native";
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

export default function MoodsPage({ navigation }) {
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
    </View>
  );
}

const styles = StyleSheet.create({
  btnSpacing: {
    marginBottom: 20,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "lightgreen",
  },
  icon: {
    height: 100,
    width: 100,
  },
});
