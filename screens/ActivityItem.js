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
import octopus from "../assets/octopus.json";
import LottieView from "lottie-react-native"
import animationPaths from "../scripts/animationPaths";

const { width: screenWidth } = Dimensions.get("window");
const width = screenWidth - 25;
export const WIDTH = width + 16;

export default function ActivityItem(props) {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);
  // state = {
  //   navigationAnimation: new Animated.Value(0),
  // };

  const [navigationAnimation, setNavigationAnimation] = useState(
    new Animated.Value(0)
  );

  // componentWillMount = () => {
  //   Image.prefetch(this.props.image);
  // };
  const { searchQuery, name } = props.activity;


  const {
    animatedValue,
    //image,
    itemIndex,
    navigation,
  } = props;

  const onNavigate = () => {
    //dispatch(fetchPlaces(searchQuery, location));
    //navigation.navigate("Where to go");
    console.log(name);

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
    <Animated.View style={styles.container}>
      <View style={styles.lottieView}>
        <LottieView source={animationPaths[searchQuery]} autoPlay loop></LottieView>
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
    width: width,
    justifyContent: "space-around",
    overflow: "visible",
    alignItems: "flex-start",
    marginRight: 16,
  },
  image: {
    width: width - 25,
    height: width - 25,
    marginBottom: 36,
  },

  title: {
    fontSize: 32,
    letterSpacing: 1.2,
    color: "black",
    backgroundColor: "transparent",
    alignSelf: "center",
    paddingRight: 24,
  },
  lottieView: {
    width: "100%",
    height: "100%",
  },
});
