import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import SideSwipe from "react-native-sideswipe";
import { setFavActivity, deleteFavActivity } from "../store/registration";
import {
  useFonts,
  OpenSansCondensed_300Light,
  OpenSansCondensed_700Bold,
} from "@expo-google-fonts/open-sans-condensed";

const ActivitySelector = ({ activities, moodId, moodName }) => {
  let [fontsLoaded] = useFonts({
    OpenSansCondensed_300Light,
    OpenSansCondensed_700Bold,
  });

  const [index, setIndex] = useState(0);
  const [selectedActivities, setSelectedActivities] = useState({});

  let background;
  if (moodName === "sad") {
    background = styles.blueBackground;
  } else if (moodName === "happy") {
    background = styles.greenBackground;
  } else if (moodName === "excited") {
    background = styles.yellowBackground;
  } else if (moodName === "calm") {
    background = styles.lightblueBackground;
  } else {
    background = styles.redBackground;
  }

  //accessing user data
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id: userId } = user;

  const handleClick = (activityId) => {
    if (!selectedActivities[activityId]) {
      setSelectedActivities({ ...selectedActivities, [activityId]: true });
      dispatch(setFavActivity(activityId, userId, moodId));
    } else {
      setSelectedActivities({ ...selectedActivities, [activityId]: false });
      dispatch(deleteFavActivity(activityId, userId, moodId));
    }
  };

  const Item = ({ id, name }) => {
    if (moodId)
      return (
        <TouchableOpacity
          onPress={() => handleClick(id)}
          style={styles.container}
        >
          {selectedActivities[id] ? (
            <Image style={[styles.selectedImage, background]} />
          ) : (
            <Image style={styles.image} />
          )}
          <Text style={styles.text}>{name}</Text>
        </TouchableOpacity>
      );
  };

  const renderItem = ({ item }) => {
    return <Item id={item.id} mood={item.moodId} name={item.name} />;
  };

  return (
    <SideSwipe
      index={index}
      data={activities}
      renderItem={renderItem}
      itemWidth={activities.length * 10}
      onIndexChange={(index) => setIndex(index)}
    />
  );
};

const styles = StyleSheet.create({
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

export default ActivitySelector;
