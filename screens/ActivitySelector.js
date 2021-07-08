import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import SideSwipe from "react-native-sideswipe";
import circle from "../assets/circle.png";
import { setFavActivity } from "../store/registration"

const ActivitySelector = ({ activities, moodId }) => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(false)

  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const { id: userId } = user;

  const handleClick = actionId => {
    console.log("Selected variable =>", selected, "Current Action ID => ",  actionId)
    if (!selected && actionId) {
      console.log("Selected variable in condition =>", selected, "Current Action ID in condition => ",  actionId)
      setSelected(true);
      //dispatch(setFavActivity(actionId, userId, moodId));
      
    } else {
      setSelected(false);
    }
  };

  const Item = ({ id, name }) => {
    return (
      <TouchableOpacity onPress={() => handleClick(id)} style={styles.container}>
        <Image style={styles.image} source={circle} />
        <Text style={styles.text}>{name}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => {
    return <Item id={item.id} name={item.name} image={circle} />;
  };

  return (
    <SideSwipe
      index={index}
      data={activities}
      renderItem={renderItem}
      itemWidth={activities.length * 10}
      onIndexChange={(index) => setIndex(index) }
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
