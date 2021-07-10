import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import SideSwipe from "react-native-sideswipe";
import circle from "../assets/circle.png";
import { setFavActivity, deleteFavActivity } from "../store/registration";

const ActivitySelector = ({ activities, moodId }) => {
  const [index, setIndex] = useState(0);
  const [selectedActivities, setSelectedActivities] = useState({});
  const [allActivities, setAllActivities] = useState(activities);
  const [usersLoadedActivity, setUserLoadedActivity] = useState([]);

  //accessing user data
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id: userId } = user;

  const handleClick = (currentActivity, queensAddress) => {
    setAllActivities(activities);
    // console.log(allActivities, "in child component");
    // if (!selectedActivities[currentActivity]) {
    //   setSelectedActivities({ ...selectedActivities, [currentActivity]: true });
    //   dispatch(setFavActivity(currentActivity, userId, moodId));
    // } else {
    //   setSelectedActivities({
    //     ...selectedActivities,
    //     [currentActivity]: false,
    //   });
    //   //dispatch delete thunk
    //   dispatch(deleteFavActivity(currentActivity, userId, moodId));
    // }
  };

  const Item = ({ currentActivity, queensAddress, id, name }) => {
    return (
      <TouchableOpacity
        onPress={() => handleClick(currentActivity, queensAddress)}
        style={styles.container}
      >
        {currentActivity ? (
          <Image style={styles.selectedImage} source={circle} />
        ) : (
          <Image style={styles.image} source={circle} />
        )}
        <Text style={styles.text}>{name}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <Item
        currentActivity={item.currentActivity}
        queensAddress={item.queensAddress}
        id={item.id}
        name={item.name}
        image={circle}
      />
    );
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
    borderWidth: 5,
    borderRadius: 32,
    borderColor: "#8AB0AB",
  },
  selectedImage: {
    width: 55,
    height: 55,
    borderWidth: 5,
    borderRadius: 32,
    borderColor: "#EC7505",
  },
});

export default ActivitySelector;
