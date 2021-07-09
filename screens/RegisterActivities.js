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
import ActivitySelector from "./ActivitySelector";

const RegisterActivities = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMoods());
    dispatch(getActivities());
  }, [dispatch]);

  const registration = useSelector((state) => state.registration);
  const { moods, activities } = registration;

  return (
    <SafeAreaView>
      <Text style={styles.title}>Tell us more about you...</Text>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {moods.map((mood) => {
          return (
            <View key={mood.id}>
              <Text style={styles.text}>{`when I am ${mood.name}...`}</Text>
              <ActivitySelector activities={activities} moodId={mood.id} />
            </View>
          );
        })}
        <Button title="Next" onPress={() => navigation.navigate("User Contacts")} />
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
