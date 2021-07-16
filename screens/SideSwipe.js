import React, { useEffect, useState } from "react";
import SideSwipe from "react-native-sideswipe";
import circle from "../assets/circle.png";
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { editMoodActivities } from "../store/sortedActivities";
import { useSelector, useDispatch } from "react-redux";
import {
  useFonts,
  OpenSansCondensed_300Light,
  OpenSansCondensed_700Bold,
} from "@expo-google-fonts/open-sans-condensed";
import AppLoading from "expo-app-loading";

export default function SideSwipeCarousel(props) {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  let [fontsLoaded] = useFonts({
    OpenSansCondensed_300Light,
    OpenSansCondensed_700Bold,
  });

  const handleClick = (element, currentActivity, queensAddress) => {
    if (props.buttonVal) {
      props.makeTrue();
    }
    dispatch(editMoodActivities(queensAddress));
  };

  const Item = (currentObj) => {
    const { allObj, currentActivity, queensAddress, id, name } = currentObj;

    let background;
    if (props.mood === "sad") {
      background = styles.blueBackground;
    } else if (props.mood === "happy") {
      background = styles.greenBackground;
    } else if (props.mood === "excited") {
      background = styles.yellowBackground;
    } else if (props.mood === "calm") {
      background = styles.lightblueBackground;
    } else {
      background = styles.redBackground;
    }
    return (
      <TouchableOpacity
        onPress={() => handleClick(allObj, currentActivity, queensAddress)}
        style={styles.container}
      >
        {currentActivity ? (
          <Image style={[styles.selectedImage, background]} />
        ) : (
          <Image style={styles.image} />
        )}
        <Text style={styles.text}>{name}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = (currObj) => {
    const { item } = currObj;
    return (
      <Item
        allObj={currObj}
        currentActivity={item.currentActivity}
        queensAddress={item.queensAddress}
        id={item.id}
        name={item.name}
      />
    );
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SideSwipe
        index={index}
        data={props.currentRow}
        renderItem={renderItem}
        itemWidth={props.currentRow.length * 10}
        onIndexChange={(index) => setIndex(index)}
      />
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 5,
    marginHorizontal: 14,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    width: 65,
    textAlign: "center",
    letterSpacing: 1.4,
    fontFamily: "OpenSansCondensed_300Light",
  },
  image: {
    width: 55,
    height: 55,
    borderWidth: 3,
    borderRadius: 32,
    borderColor: "gray",
  },
  selectedImage: {
    width: 55,
    height: 55,
    borderWidth: 3,
    borderRadius: 32,
  },

  blueBackground: {
    backgroundColor: "#3c91e6",
  },
  redBackground: {
    backgroundColor: "#F28482",
  },
  greenBackground: {
    backgroundColor: "#6eb29e",
  },
  yellowBackground: {
    backgroundColor: "#ffc15e",
  },
  lightblueBackground: {
    backgroundColor: "#E0FFFF",
  },
});
