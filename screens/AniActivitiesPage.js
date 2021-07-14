import React, { useState } from "react";
import { Dimensions, Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Constants } from "expo";
// import { Connect, query } from 'urql'; // 0.1.0
import SideSwipe from "react-native-sideswipe"; // 1.3.0
import LottieView from "lottie-react-native";
import octopus from "../assets/octopus.json";
import ActivityItem, { WIDTH } from "./ActivityItem";

const { width } = Dimensions.get("window");

// const QUERY = `
//   query($first: Int!) {
//     pokemons(first: $first) {
//       id
//       name
//       image
//       classification
//       maxHP
//       maxCP
//     }
//   }
// `;

export default function ActivityPage({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activities = useSelector((state) => state.activities);

  return !activities.length ? (
    <View style={styles.loading}>
      <View style={styles.lottieView}>
        <LottieView source={octopus} autoPlay loop></LottieView>
      </View>
      <Text style={styles.text}>Oops! Please edit your activities</Text>
    </View>
  ) : (
    <View style={styles.container}>
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
    backgroundColor: "#EDDBD4",
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
});
