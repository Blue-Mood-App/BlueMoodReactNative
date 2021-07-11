import React, { useEffect, useState } from "react";
import Register from "./Register";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Button,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getActivities, getMoods } from "../store/registration";
import EditActivities from "./EditActivities.js";
import { fetchUserActivities } from "../store/userActivities";
import { setSortedActivities } from "../store/sortedActivities";
import { getActivitiesAndMoods } from "../store/sortedActivities";
import SideSwipe from "react-native-sideswipe";
import circle from "../assets/circle.png";
import { setFavActivity, deleteFavActivity } from "../store/registration";

const EditMoods = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActivitiesAndMoods(4));
  }, [dispatch]);

  const sortedActivities = useSelector((state) => state.sortedActivities);
  const clickedActivities = [];

  const handleClick = (element, currentActivity, queensAddress) => {
    console.log(element["item"]);
  };

  const Item = (currentObj) => {
    const { allObj, currentActivity, queensAddress, id, name } = currentObj;

    return (
      <TouchableOpacity
        onPress={() => handleClick(allObj, currentActivity, queensAddress)}
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

  const renderItem = (currObj) => {
    const { item } = currObj;
    return (
      <Item
        allObj={currObj}
        currentActivity={item.currentActivity}
        queensAddress={item.queensAddress}
        id={item.id}
        name={item.name}
        image={circle}
      />
    );
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {Array.isArray(sortedActivities) &&
          sortedActivities.map((el, idx) => {
            return (
              <View key={idx}>
                <Text style={styles.text1}>{`when I am ${el[0].mood}...`}</Text>
                <SideSwipe
                  index={index}
                  data={el}
                  renderItem={renderItem}
                  itemWidth={el.length * 10}
                  onIndexChange={(index) => setIndex(index)}
                />
              </View>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text1: {
    fontSize: 17,
    padding: 10,
  },
  title: {
    textAlign: "center",
    paddingTop: 15,
    fontSize: 20,
  },
  contentContainer: {
    paddingVertical: 20,
  },
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

export default EditMoods;
