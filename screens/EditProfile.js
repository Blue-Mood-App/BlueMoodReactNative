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
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getActivities, getMoods } from "../store/registration";
import EditActivities from "./EditActivities.js";
import { fetchUserActivities } from "../store/userActivities";

const RegisterActivities = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMoods());
    dispatch(getActivities());
    dispatch(fetchUserActivities(4));
  }, [dispatch]);

  const registration = useSelector((state) => state.registration);
  const userActiv = useSelector((state) => state.userActivities);
  const { moods, activities } = registration;

  const sortUserActivities = (moodId) => {
    let newArr = [];
    let newArr2 = [];
    if (userActiv[0]) {
      for (let z = 0; z < userActiv.length; z++) {
        if (userActiv[z].moodId === moodId) {
          newArr.push(userActiv[z]);
        }
      }

      for (let z = 0; z < newArr.length; z++) {
        for (let j = 0; j < activities.length; j++) {
          if (activities[j].id === newArr[z].activityId) {
            if (!newArr2.includes(activities[j])) {
              let newActivity = { ...activities[j] };
              newActivity.currentActivity = true;
              newArr2.push(newActivity);
            }
          }
        }
      }

      for (let m = 0; m < activities.length; m++) {
        if (!newArr2.includes(activities[m])) {
          let newActivity = { ...activities[m] };
          newActivity.currentActivity = false;
          newArr2.push(newActivity);
        }
      }
    }

    return newArr2;
  };

  return (
    <SafeAreaView>
      <Text style={styles.title}>Tell us more about you...</Text>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {moods.map((mood) => {
          let result = sortUserActivities(mood.id);
          //console.log(result, "in parent");
          return (
            <View key={mood.id}>
              <Text style={styles.text}>{`when I am ${mood.name}...`}</Text>
              <EditActivities activities={result} moodId={mood.id} />
            </View>
          );
        })}
        <Button title="Next" onPress={() => navigation.navigate("Home")} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
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
});

export default RegisterActivities;
