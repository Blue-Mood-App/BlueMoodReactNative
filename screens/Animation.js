import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlaces } from "../store/places";
import hamburger from "../assets/Hamburger_icon.png";
import Animation from 'lottie-react-native';
import octopus from "../assets/octopus.json";

const { width: screenWidth } = Dimensions.get("window");
const width = screenWidth - 25;
export const WIDTH = width + 16;

export default function Animations() {
    const location = useSelector((state) => state.location);
//const { searchQuery, name } = props.activity;
//const { animatedValue, itemIndex, navigation } = props; //Took image out from deconstruction,

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
        <View style={{display: "flex", justifyContent: "center"}}>
            <Animation source={octopus} loop={true} />
        </View>
    )
}