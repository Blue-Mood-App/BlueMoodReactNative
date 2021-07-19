import React, { useState, useEffect } from "react";
import { Dimensions, Text, View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import SideSwipe from "react-native-sideswipe"; // 1.3.0
import LottieView from "lottie-react-native";
import octopus from "../assets/octopus.json";
import ActivityItem, { WIDTH } from "./ActivityItem";
import { AppLoading } from "expo";
import {
  useFonts,
  PatrickHandSC_400Regular,
} from "@expo-google-fonts/patrick-hand-sc";
import { fetchNearByUsers } from "../store/nearbyUsers";

const { width } = Dimensions.get("window");

export default function ActivityPage({ navigation }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNearByUsers());
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const activities = useSelector((state) => state.activities);
  const userInfo = useSelector((state) => state.auth);
  let [fontsLoaded] = useFonts({
    PatrickHandSC_400Regular,
  });

  return !activities.length || !fontsLoaded ? (
    <View style={styles.loading}>
      <View style={styles.lottieView}>
        <LottieView source={octopus} autoPlay loop></LottieView>
      </View>
      <Text style={styles.text}>Oops! Please edit your activities</Text>
      {Array.isArray(userInfo.contactList) && (
        <Text style={{ fontSize: 25, bottom: 100, position: "absolute" }}>
          Or contact a friend that fits your mood :{" "}
          {userInfo.contactList.map((el) => {
            return <Text>{el + " "}</Text>;
          })}{" "}
        </Text>
      )}
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
    backgroundColor: "#EBF0FE",
    borderTopColor: "#EBF0FE",
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
    bottom: 200,
    position: "absolute",
  },
  textAll: {
    fontSize: 35,
    fontFamily: "PatrickHandSC_400Regular",
    textAlign: "center",
    position: "absolute",
    marginLeft: 38,
    marginTop: 30,
  },
});
