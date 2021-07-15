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
import AppLoading from "expo-app-loading";
import {
  useFonts,
  PatrickHandSC_400Regular,
} from "@expo-google-fonts/patrick-hand-sc";

const { width: screenWidth } = Dimensions.get("window");
const width = screenWidth - 25;
export const WIDTH = width + 16;

export default function ActivityItem(props) {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);
  let [fontsLoaded] = useFonts({
    PatrickHandSC_400Regular,
  });

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

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
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
        <TouchableWithoutFeedback onPress={onNavigate}>
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
            {name}
            {"\n"}
            <Text style={styles.clickText}>Click me!</Text>
          </Animated.Text>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
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
    shadowColor: "#525252",
    shadowOffset: {
      width: 10,
      height: 20,
    },
    shadowOpacity: 0.95,
    shadowRadius: 5.94,
  },
  image: {
    width: "100%",
    height: "100%",
    maxWidth: "100%",
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
    fontSize: 38,
    paddingBottom: 20,
    letterSpacing: 1.2,
    fontFamily: "PatrickHandSC_400Regular",
    textAlign: "center",
  },
  clickText: {
    fontFamily: "PatrickHandSC_400Regular",
    fontSize: 20,
  },
});
