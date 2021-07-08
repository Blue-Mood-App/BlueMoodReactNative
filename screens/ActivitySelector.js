import React, { useEffect } from "react";
import Register from "./Register";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SectionList,
} from "react-native";

const ActivitySelector = ({ activities }) => {
  const Item = ({ name }) => {
    return (
      <TouchableOpacity>
        <Text style={styles.text}>{name}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => {
    // console.log(item);
    return <Item name={item.name} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={activities}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    padding: 16,
  },
  text: {
    fontSize: 12,
  },
});

export default ActivitySelector;
