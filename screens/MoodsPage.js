import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, View, Text, Image } from "react-native";
import { fetchActivity } from "../store/activities";
import { useSelector, useDispatch } from "react-redux";
import { getLocation } from "../store/location";
import excited from '../assets/icons/excited.png'
import happy from '../assets/icons/happy.png'
import calm from '../assets/icons/calm.png'
import sad from '../assets/icons/sad.png'
import depressed from '../assets/icons/depressed.png'


export default function MoodsPage({navigation}) {
  const dispatch = useDispatch();
  const handleSubmit = (val) => {
    dispatch(fetchActivity(val));
    navigation.navigate('Select Activity Ani')
  };

  useEffect(() => {
    dispatch(getLocation())

  }, [])



  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btnSpacing}
        onPress={() => handleSubmit(1)}
      >
        <Image style={styles.icon} source={depressed} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnSpacing}
        onPress={() => handleSubmit(2)}
      >
      <Image style={styles.icon} source={sad} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnSpacing}
        onPress={() => handleSubmit(3)}
      >
      <Image style={styles.icon} source={calm} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnSpacing}
        onPress={() => handleSubmit(4)}
      >
      <Image style={styles.icon} source={happy} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnSpacing}
        onPress={() => handleSubmit(5)}
      >
      <Image style={styles.icon} source={excited} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnSpacing: {
    marginBottom: 20,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: 'lightgreen'
  },
  icon: {
    height: 100,
    width: 100,
  }
});
