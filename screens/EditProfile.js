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
import { setSortedActivities } from "../store/sortedActivities";

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
    let activitiesArr = [];

    for (let i = 0; i < activities.length; i++) {
      let newObj = { ...activities[i] };
      newObj.currentActivity = false;
      newObj.queensAddress = `${newObj["id"]}-${moodId}`;
      activitiesArr.push(newObj);
    }
    if (userActiv[0]) {
      for (let z = 0; z < userActiv.length; z++) {
        if (userActiv[z].moodId === moodId) {
          newArr.push(userActiv[z]);
        }
      }

      for (let z = 0; z < newArr.length; z++) {
        for (let j = 0; j < activitiesArr.length; j++) {
          if (activitiesArr[j].id === newArr[z].activityId) {
            if (!newArr2.includes(activitiesArr[j])) {
              activitiesArr[j].currentActivity = true;
              newArr2.push(activitiesArr[j]);
            }
          }
        }
      }

      for (let m = 0; m < activitiesArr.length; m++) {
        if (!newArr2.includes(activitiesArr[m])) {
          activitiesArr[m].currentActivity = false;
          newArr2.push(activitiesArr[m]);
        }
      }
    }

    return newArr2;
  };

  let sortedActivities = [];
  return (
    <SafeAreaView>
      <Text style={styles.title}>Tell us more about you...</Text>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {moods.map((mood) => {
          let result = sortUserActivities(mood.id);
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
