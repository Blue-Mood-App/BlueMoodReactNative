import React, { useEffect } from "react";
import Register from "./Register";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getActivities, getMoods } from "../store/registration";

const RegisterActivities = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMoods());
    dispatch(getActivities())
  }, [dispatch]);

  const registration = useSelector((state) => state.registration);
  const { moods, activities } = registration

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tell us more about you...</Text>
      {moods.map(mood => {
        return (
          <Text>{mood.id}</Text>
        )
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 16,
  },
  text: {
    fontSize: 23,
  },
});

export default RegisterActivities;
