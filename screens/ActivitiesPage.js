import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  FlatList,
} from "react-native";
import { fetchPlaces } from "../store/places";
import { useSelector, useDispatch } from "react-redux";

export default function ActivityPage() {
  const location = useSelector((state) => state.location);

  const handleSubmit = (searchQuery) => {
    dispatch(fetchPlaces(searchQuery, location));
  };

  const Item = ({ name, searchQuery }) => {
    return (
      <TouchableOpacity onPress={() => handleSubmit(searchQuery)}>
        <Text style={styles.title}>{name}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <Item name={item.activity.name} searchQuery={item.activity.searchQuery} />
    );
  };

  const activities = useSelector((state) => state.activities);

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <FlatList
        data={activities}
        renderItem={renderItem}
        keyExtractor={(item) => item.activity.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  btnSpacing: {
    marginBottom: 10,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  item: {},
  title: {
    color: "red",
  },
});

// activities.map(activity => {
//   const { name, id } = activity.activity

//   return (
//     <Text style={styles.title} key={id}>{name}</Text>
//   )

// })
