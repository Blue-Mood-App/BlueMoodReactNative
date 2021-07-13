import React, { useEffect, useState } from "react";
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
import LottieView from "lottie-react-native";
import octopus from "../assets/octopus.json";

const { width: screenWidth } = Dimensions.get("window");
const width = screenWidth - 25;
export const WIDTH = width + 16;

export default function Animations(props) {
  // console.log(props);
  // const location = useSelector((state) => state.location);
  // const { searchQuery, name } = props.activity;
  // const { animatedValue, itemIndex, navigation } = props; //Took image out from deconstruction,
  // const [navigationAnimation, setNavigationAnimation] = useState(
  //   new Animated.Value(0)
  // );
  const name = "Larry";
  const onNavigate = () => {
    dispatch(fetchPlaces(searchQuery, location));
    navigation.navigate("Where to go");

    // Animated.timing(navigationAnimation, {
    //   toValue: 1,
    //   duration: 350,
    //   useNativeDriver: false,
    //   easing: Easing.out(Easing.quad),
    // }).start(() => {
    //   navigation.navigate("Where to go")
    //   });
    //   setTimeout(() => navigationAnimation.setValue(0));
  };

  return (
    <View style={styles.container}>
      <View style={styles.lottieView}>
        <LottieView source={octopus} autoPlay loop></LottieView>
      </View>
      <Animated.View>
        <TouchableWithoutFeedback onPress={onNavigate}>
          <Animated.Text style= {styles.text}>{name.toUpperCase()} </Animated.Text>
        </TouchableWithoutFeedback>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  lottieView: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FED",
  },
  text: {
    width: "50%",
    height: "50%",
  },
});
