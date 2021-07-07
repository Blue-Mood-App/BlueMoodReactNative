import React, { useEffect } from "react";
import Register from "./Register";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getActivities, getMoods } from "../store/registration";

const RegisterActivities = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("running use effect");
    dispatch(getMoods());
    const state = useSelector((state) => state.registration);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tell us more about you...</Text>
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
