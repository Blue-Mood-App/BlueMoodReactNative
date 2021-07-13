import React, { useEffect, useState } from "react";
import Register from "./Register";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  getActivitiesAndMoods,
  editMoodActivities,
  addUserActivities,
  clear,
} from "../store/sortedActivities";
import circle from "../assets/circle.png";
import SideSwipeCarousel from "./SideSwipe";

const EditMoods = ({ navigation }) => {
  const user = useSelector((state) => state.auth);
  const sortedActivities = useSelector((state) => state.sortedActivities);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActivitiesAndMoods(user.id));
    return () => dispatch(clear());
  }, []);

  // const handleClick = (element, currentActivity, queensAddress) => {
  //   dispatch(editMoodActivities(queensAddress));
  // };

  const handleSubmit = (userId) => {
    let currentActivities = [];
    sortedActivities.forEach((el) => {
      let trueCurrentActivities = el.filter((el) => {
        return el.currentActivity;
      });

      if (trueCurrentActivities[0]) {
        currentActivities.push(trueCurrentActivities);
      }
    });

    dispatch(addUserActivities(userId, currentActivities.flat()));
    navigation.navigate("Select Mood");
  };

  // const Item = (currentObj) => {
  //   const { allObj, currentActivity, queensAddress, id, name } = currentObj;

  //   return (
  //     <TouchableOpacity
  //       onPress={() => handleClick(allObj, currentActivity, queensAddress)}
  //       style={styles.container}
  //     >
  //       {currentActivity ? (
  //         <Image style={styles.selectedImage} source={circle} />
  //       ) : (
  //         <Image style={styles.image} source={circle} />
  //       )}
  //       <Text style={styles.text}>{name}</Text>
  //     </TouchableOpacity>
  //   );
  // };

  // const renderItem = (currObj) => {
  //   const { item } = currObj;
  //   return (
  //     <Item
  //       allObj={currObj}
  //       currentActivity={item.currentActivity}
  //       queensAddress={item.queensAddress}
  //       id={item.id}
  //       name={item.name}
  //       image={circle}
  //     />
  //   );
  // };

  return (
    <SafeAreaView>
      <Button title="Update" onPress={() => handleSubmit(user.id)} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {Array.isArray(sortedActivities) &&
          sortedActivities.map((el, idx) => {
            return (
              <View key={idx}>
                <Text style={styles.text1}>{`when I am ${el[0].mood}...`}</Text>
                <SideSwipeCarousel currentRow={el} />
                {/* <SideSwipe
                  index={index}
                  data={el}
                  renderItem={renderItem}
                  itemWidth={el.length * 10}
                  onIndexChange={(index) => setIndex(index)}
                /> */}
              </View>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text1: {
    fontSize: 17,
    padding: 10,
  },
  contentContainer: {
    paddingVertical: 20,
  },
});

export default EditMoods;
