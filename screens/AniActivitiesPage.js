import React, { useState } from "react";
import { Dimensions, Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import SideSwipe from "react-native-sideswipe"; // 1.3.0
import LottieView from "lottie-react-native";
import octopus from "../assets/octopus.json";
import ActivityItem, { WIDTH } from "./ActivityItem";
import { AppLoading } from "expo";
import {
  useFonts,
  PatrickHandSC_400Regular,
} from "@expo-google-fonts/patrick-hand-sc";

const { width } = Dimensions.get("window");

export default function ActivityPage({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activities = useSelector((state) => state.activities);
  let [fontsLoaded] = useFonts({
    PatrickHandSC_400Regular,
  });

  return !activities.length ? (
    <View style={styles.loading}>
      <View style={styles.lottieView}>
        <LottieView source={octopus} autoPlay loop></LottieView>
      </View>
      <Text style={styles.text}>Oops! Please edit your activities</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.textAll}>Choose Your Adventure </Text>
      <SideSwipe
        data={activities}
        style={{ flex: 1, width }}
        itemWidth={WIDTH}
        threshold={WIDTH / 4}
        extractKey={(item) => item.activity.id.toString()}
        contentOffset={13}
        useNativeDriver={false}
        onIndexChange={(index) => setCurrentIndex(index)}
        renderItem={({ item, ...rest }) => (
          <ActivityItem {...rest} {...item} navigation={navigation} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f0eb",
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  tagline: {
    margin: 24,
    fontSize: 32,
    fontFamily: "light",
    color: "black",
    letterSpacing: 1.2,
  },
  title: {
    margin: 24,
    fontSize: 32,
    fontFamily: "regular",
    color: "black",
    letterSpacing: 1.2,
  },
  lottieView: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F6F3F5",
  },
  text: {
    fontSize: 25,
    paddingBottom: 200,
    position: "absolute",
  },
  textAll: {
    fontSize: 35,
    fontFamily: "PatrickHandSC_400Regular",
    textAlign: "center",
    position: "absolute",
    marginLeft: 50,
    marginTop: 30,
  },
});
