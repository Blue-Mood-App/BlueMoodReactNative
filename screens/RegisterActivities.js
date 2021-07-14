import React, { useEffect, useState } from "react";
import Register from "./Register";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getActivities, getMoods } from "../store/registration";
import ActivitySelector from "./ActivitySelector";
import {
  useFonts,
  OpenSansCondensed_300Light,
  OpenSansCondensed_700Bold,
} from "@expo-google-fonts/open-sans-condensed";
import { Button } from "react-native-paper";

const RegisterActivities = ({ navigation }) => {
  const dispatch = useDispatch();

  let [fontsLoaded] = useFonts({
    OpenSansCondensed_300Light,
    OpenSansCondensed_700Bold,
  });

  useEffect(() => {
    dispatch(getMoods());
    dispatch(getActivities());
  }, [dispatch]);

  const registration = useSelector((state) => state.registration);
  const { moods, activities } = registration;

  return (
    <SafeAreaView>
      {/* <Text style={styles.title}>Tell us more about you...</Text> */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Tell us more about you...</Text>
        {moods.map((mood) => {
          return (
            <View key={mood.id} style={styles.moodsSpacing}>
              <Text style={styles.text}>{`when I am ${mood.name}...`}</Text>
              <ActivitySelector
                moodName={mood.name}
                activities={activities}
                moodId={mood.id}
              />
            </View>
          );
        })}
        <View style={styles.buttonContainer}>
          <Button
            mode={"contained"}
            color="black"
            style={styles.btn}
            onPress={() => navigation.navigate("User Contacts")}
          >
            Next
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1.3,
    marginBottom: 8,
    padding: 10,
    fontFamily: "OpenSansCondensed_700Bold",
  },
  title: {
    textAlign: "center",
    paddingTop: 7,
    fontSize: 20,
    // fontFamily: "OpenSansCondensed_700Bold",
  },
  contentContainer: {
    paddingVertical: 20,
  },
  moodsSpacing: {
    marginBottom: -13,
  },

  btn: {
    marginTop: 20,
    marginVertical: 8,
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderRadius: 25,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
  },
});

export default RegisterActivities;
