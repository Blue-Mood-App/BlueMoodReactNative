import React, { useEffect } from "react";
import Register from "./Register";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getActivities, getMoods } from "../store/registration";
import ActivitySelector from "./ActivitySelector";

const RegisterActivities = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMoods());
    dispatch(getActivities());
  }, [dispatch]);

  const registration = useSelector((state) => state.registration);
  const { moods, activities } = registration;
  const selectedActivities = {};

  if (activities.length > 0) {
    activities.map((activity) => {
      selectedActivities[activity.id] = false;
    });
  }

  return (
    <SafeAreaView>
      <Text style={styles.text}>Tell us more about you...</Text>
      <ScrollView>
        {moods.map((mood) => {
          return (
            <View key={mood.id}>
              <Text style={styles.text}>{`when I am ${mood.name}...`}</Text>
              <ActivitySelector
                activities={activities}
                moodId={mood.id}
                selectedActivities={selectedActivities}
              />
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    padding: 10,
  },
});

export default RegisterActivities;
