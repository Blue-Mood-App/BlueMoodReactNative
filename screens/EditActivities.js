import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import SideSwipe from "react-native-sideswipe";
import circle from "../assets/circle.png";
import { setFavActivity, deleteFavActivity } from "../store/registration";

const ActivitySelector = ({ activities, moodId }) => {
  const [index, setIndex] = useState(0);
  const [selectedActivities, setSelectedActivities] = useState({});
  const [usersLoadedActivity, setUserLoadedActivity] = useState([]);

  useEffect(() => {
    let newArr = activities.filter((el) => {
      return el.currentActivity;
    }, []);

    if (newArr[0]) {
      setLoadedActivitiesColor(newArr);
    }
    //console.log(activities, "in new child");
  });

  //accessing user data
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id: userId } = user;

  const setLoadedActivitiesColor = (arr) => {
    arr.forEach((el) => {
      console.log(el);
      // if (!selectedActivities[el.id]) {
      //   setSelectedActivities({ ...selectedActivities, [el.id]: true });
      //   dispatch(setFavActivity(el.id, userId, moodId));
      // } else {
      //   setSelectedActivities({ ...selectedActivities, [el.id]: false });
      //   dispatch(deleteFavActivity(el.id, userId, moodId));
      // }
    });
  };

  const handleClick = (activityId) => {
    console.log("hi");
    if (!selectedActivities[activityId]) {
      setSelectedActivities({ ...selectedActivities, [activityId]: true });

      dispatch(setFavActivity(activityId, userId, moodId));
    } else {
      setSelectedActivities({ ...selectedActivities, [activityId]: false });
      //dispatch delete thunk
      dispatch(deleteFavActivity(activityId, userId, moodId));
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

  //console.log(selectedActivities, "current state");
  //console.log(usersLoadedActivity, "in child");
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
