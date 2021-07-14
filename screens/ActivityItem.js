import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlaces } from "../store/places";
import hamburger from "../assets/Hamburger_icon.png";
import octopus from "../assets/octopus.json";
import LottieView from "lottie-react-native";
import animationPaths from "../scripts/animationPaths";

const { width: screenWidth } = Dimensions.get("window");
const width = screenWidth - 25;
export const WIDTH = width + 16;

export default function ActivityItem(props) {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);

  const [navigationAnimation, setNavigationAnimation] = useState(
    new Animated.Value(0)
  );

  const { searchQuery, name } = props.activity;

  const {
    animatedValue,
    //image,
    itemIndex,
    navigation,
  } = props;

  const onNavigate = () => {
    dispatch(fetchPlaces(searchQuery, location));
    navigation.navigate("Where to go");
    Animated.timing(navigationAnimation, {
      toValue: 1,
      duration: 350,
      useNativeDriver: false,
      easing: Easing.out(Easing.quad),
    }).start(() => {
      navigation.navigate("Where to go");
    });
    setTimeout(() => navigationAnimation.setValue(0));
  };

  return (
    <Animated.View style={styles.container}>
      <View style={styles.polaroidWrapper}>
        <View>
          <LottieView
            source={animationPaths[searchQuery]}
            autoPlay
            loop
            style={styles.image}
          ></LottieView>
        </View>
      </View>

      <TouchableWithoutFeedback style={styles.wrapper} onPress={onNavigate}>
        <Animated.Text
          style={[
            styles.title,
            {
              opacity: animatedValue.interpolate({
                inputRange: [itemIndex - 1, itemIndex, itemIndex + 1],
                outputRange: [0, 1, 0],
              }),
            },
          ]}
        >
          {name.toUpperCase()}
        </Animated.Text>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignSelf: "center",
    width: width,
    position: "relative",
    justifyContent: "space-around",
    overflow: "visible",
    backgroundColor: "#E5FFF9",
    marginRight: 16,
  },
  image: {
    width: "100%",
    height: "100%",
    maxWidth: 350,
    overflow: "hidden",
    justifyContent: "center",
  },
  polaroidWrapper: {
    flexDirection: "row",
    height: "70%",
    flexWrap: "wrap",
    overflow: "hidden",
    width: "100%",
    borderWidth: 20,
    borderBottomWidth: 100,
  },
  title: {
    position: "absolute",
    bottom: 0,
    color: "white",
    fontSize: 30,
    paddingBottom: 50,
    letterSpacing: 1.2,
  },
});
