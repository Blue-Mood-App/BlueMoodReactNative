import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import SideSwipe from "react-native-sideswipe";
import circle from "../assets/circle.png";
import { setFavActivity } from "../store/registration";

const ActivitySelector = ({ activities, moodId, selectedActivities }) => {
  const [index, setIndex] = useState(0);
  const [activityObj, setActivityObj] = useState({});

  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id: userId } = user;

  const handleClick = (activityId) => {
    // console.log(
    //   "activity0",
    //   activityId,
    //   "selectedActivity",
    //   selectedActivities[activityId]
    // );
    if (!selectedActivities[activityId]) {
      dispatch(setFavActivity(activityId, userId, moodId));
      selectedActivities[activityId] = true;
      // setActivityObj({});
      // console.log(
      //   "activity1",
      //   activityId,
      //   "selectedActivity",
      //   selectedActivities[activityId]
      // );
    } else {
      selectedActivities[activityId] = false;
      // setActivityObj({});
      // console.log(
      //   "activity2",
      //   activityId,
      //   "selectedActivity",
      //   selectedActivities[activityId]
      // );

      //dispatch the delete route
    }
  };

  const Item = ({ id, name }) => {
    return (
      <TouchableOpacity
        onPress={() => handleClick(id)}
        style={styles.container}
      >
        {selectedActivities[id] ? (
          <Image style={styles.selectedImage} source={circle} />
        ) : (
          <Image style={styles.image} source={circle} />
        )}
        <Text style={styles.text}>{name}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => {
    return <Item id={item.id} name={item.name} image={circle} />;
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
    backgroundColor: "transparent",
    padding: 16,
    margin: 6,
  },
  text: {
    fontSize: 13,
    width: 60,
    textAlign: "center",
  },
  image: {
    width: 55,
    height: 55,
    borderWidth: 2,
    borderRadius: 32,
    borderColor: "#8AB0AB",
  },
  selectedImage: {
    width: 55,
    height: 55,
    borderWidth: 2,
    borderRadius: 32,
    borderColor: "#EC7505",
  },
});

export default ActivitySelector;
