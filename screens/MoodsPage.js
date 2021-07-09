import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { fetchActivity } from "../store/activities";
import { useSelector, useDispatch } from "react-redux";
import { getLocation } from "../store/location";


export default function MoodsPage() {
  const dispatch = useDispatch();
  const handleSubmit = (val) => {
    dispatch(fetchActivity(val));
  };

  useEffect(() => {
    dispatch(getLocation())

  }, [])



  return (
    <View style={styles.center}>
      <TouchableOpacity
        style={styles.btnSpacing}
        onPress={() => handleSubmit(1)}
      >
        <Text>Angry</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnSpacing}
        onPress={() => handleSubmit(2)}
      >
        <Text>Sad</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnSpacing}
        onPress={() => handleSubmit(3)}
      >
        <Text>Calm</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnSpacing}
        onPress={() => handleSubmit(4)}
      >
        <Text>Happy</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnSpacing}
        onPress={() => handleSubmit(5)}
      >
        <Text>Excited</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnSpacing: {
    marginBottom: 10,
  },
  center: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
