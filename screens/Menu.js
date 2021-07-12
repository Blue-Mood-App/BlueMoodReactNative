import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, View, Text, Button } from "react-native";
import { fetchActivity } from "../store/activities";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../store/auth";

export default function Menu({ navigation }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logOut());
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text> Profile </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text> Log Out </Text>
        </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text> Log In </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text> Sign Up </Text>
      </TouchableOpacity>

      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 23,
    padding: 20,
  },
});