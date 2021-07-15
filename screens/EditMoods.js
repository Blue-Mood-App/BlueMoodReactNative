import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  getActivitiesAndMoods,
  addUserActivities,
  clear,
} from "../store/sortedActivities";
import circle from "../assets/circle.png";
import SideSwipeCarousel from "./SideSwipe";
import {
  useFonts,
  OpenSansCondensed_300Light,
  OpenSansCondensed_700Bold,
} from "@expo-google-fonts/open-sans-condensed";
import { Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
const { height } = Dimensions.get("window");

const EditMoods = ({ navigation }) => {
  const user = useSelector((state) => state.auth);
  const sortedActivities = useSelector((state) => state.sortedActivities);
  const dispatch = useDispatch();

  let [fontsLoaded] = useFonts({
    OpenSansCondensed_300Light,
    OpenSansCondensed_700Bold,
  });
  useEffect(() => {
    dispatch(getActivitiesAndMoods(user.id));
    return () => dispatch(clear());
  }, []);

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

  return (
    <SafeAreaView>
      <LinearGradient
        start={{ x: 1.4, y: 0.3 }}
        end={{ x: 0.2, y: 0.4 }}
        colors={["#fcd29f", "#fffae2"]}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {Array.isArray(sortedActivities) &&
            sortedActivities.map((el, idx) => {
              return (
                <View key={idx}>
                  <Text
                    style={styles.text1}
                  >{`when I am ${el[0].mood}...`}</Text>
                  <SideSwipeCarousel mood={el[0].mood} currentRow={el} />
                </View>
              );
            })}
          <View style={styles.buttonContainer}>
            <Button
              mode={"contained"}
              color="black"
              style={styles.btn}
              onPress={() => handleSubmit(user.id)}
            >
              Update
            </Button>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text1: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1.3,
    marginBottom: 8,
    padding: 5,
    fontFamily: "OpenSansCondensed_700Bold",
  },
  title: {
    textAlign: "center",
    paddingTop: 7,
    fontSize: 20,
    // fontFamily: "OpenSansCondensed_700Bold",
  },
  contentContainer: {
    paddingVertical: 15,
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
    shadowColor: "#525252",
    shadowOffset: {
      width: 7,
      height: 7,
    },
    shadowOpacity: 0.85,
    shadowRadius: 3.94,
  },
  background: {
    paddingLeft: 10,
    paddingRight: 15,
    borderRadius: 5,
    height: height,
  },
});

export default EditMoods;
