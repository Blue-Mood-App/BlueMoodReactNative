import React, { useState } from "react";
import { Dimensions, Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Constants } from "expo";
// import { Connect, query } from 'urql'; // 0.1.0
import SideSwipe from "react-native-sideswipe"; // 1.3.0

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

  return !activities.length ? <Text>loading...</Text> : (
    <View style={styles.container}>
      <SideSwipe
        data={activities}
        style={{ flex: 1, width }}
        itemWidth={WIDTH}
        threshold={WIDTH / 4}
        extractKey={(item) => item.activity.id.toString()}
        contentOffset={24}
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
    paddingTop: 5,
    backgroundColor: "white",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});
