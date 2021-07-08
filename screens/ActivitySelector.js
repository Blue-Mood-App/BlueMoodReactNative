import React, { useEffect, useState } from "react";
import Register from "./Register";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SectionList,
  Image,
  Dimensions,
} from "react-native";
import SideSwipe from "react-native-sideswipe";
import circle from "../assets/circle.png";

const ActivitySelector = ({ activities }) => {
  const [index, setIndex] = useState(0);

  const Item = ({ name }) => {
    return (
      <TouchableOpacity style={styles.container}>
        <Image style={styles.image} source={circle} />
        <Text style={styles.text}>{name}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => {
    return <Item name={item.name} image={circle} />;
  };

  return (
    <SideSwipe
      index={index}
      data={activities}
      renderItem={renderItem}
      itemWidth={activities.length * 10}
      onIndexChange={(index) => ({ setIndex: index })}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    padding: 16,
    margin: 6,
  },
  text: {
    fontSize: 13,
    width: 60,
    textAlign: "center",
  },
  image: {
    width: 55,
    height: 55,
    borderWidth: 2,
    borderRadius: 32,
    borderColor: "#8AB0AB",
  },
});

export default ActivitySelector;

{
  /* <FlatList
data={activities}
renderItem={renderItem}
keyExtractor={(item) => item.id}
/> */
}
