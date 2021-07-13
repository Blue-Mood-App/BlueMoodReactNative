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
import {
  getActivitiesAndMoods,
  editMoodActivities,
  addUserActivities,
  clear,
} from "../store/sortedActivities";
import SideSwipe from "react-native-sideswipe";
import circle from "../assets/circle.png";

const EditMoods = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const user = useSelector((state) => state.auth);
  const sortedActivities = useSelector((state) => state.sortedActivities);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActivitiesAndMoods(user.id));
    return () => dispatch(clear());
  }, []);

  const handleClick = (element, currentActivity, queensAddress) => {
    dispatch(editMoodActivities(queensAddress));
  };

  const handleSubmit = (userId) => {
    let currentActivities = [];
    sortedActivities.forEach((el) => {
      let trueCurrentActivities = el.filter((el) => {
        return el.currentActivity;
      });

      if (trueCurrentActivities[0]) {
        currentActivities.push(trueCurrentActivities);
      }
    });

    dispatch(addUserActivities(userId, currentActivities.flat()));
    navigation.navigate("Select Mood");
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
      <Button title="Update" onPress={() => handleSubmit(user.id)} />
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
