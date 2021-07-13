import React, { useEffect, useState } from "react";
import SideSwipe from "react-native-sideswipe";
import circle from "../assets/circle.png";
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { editMoodActivities } from "../store/sortedActivities";
import { useSelector, useDispatch } from "react-redux";

export default function SideSwipeCarousel(props) {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();

  const handleClick = (element, currentActivity, queensAddress) => {
    dispatch(editMoodActivities(queensAddress));
  };

  const Item = (currentObj) => {
    const { allObj, currentActivity, queensAddress, id, name } = currentObj;

    return (
      <TouchableOpacity
        onPress={() => handleClick(allObj, currentActivity, queensAddress)}
        style={styles.container}
      >
        {currentActivity ? (
          <Image style={styles.selectedImage} source={circle} />
        ) : (
          <Image style={styles.image} source={circle} />
        )}
        <Text style={styles.text}>{name}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = (currObj) => {
    const { item } = currObj;
    return (
      <Item
        allObj={currObj}
        currentActivity={item.currentActivity}
        queensAddress={item.queensAddress}
        id={item.id}
        name={item.name}
        image={circle}
      />
    );
  };
  return (
    <SideSwipe
      index={index}
      data={props.currentRow}
      renderItem={renderItem}
      itemWidth={props.currentRow.length * 10}
      onIndexChange={(index) => setIndex(index)}
    />
  );
}

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
    borderWidth: 5,
    borderRadius: 32,
    borderColor: "#8AB0AB",
  },
  selectedImage: {
    width: 55,
    height: 55,
    borderWidth: 5,
    borderRadius: 32,
    borderColor: "#EC7505",
  },
});
