import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import LottieView from "lottie-react-native"
import animationPaths from "../scripts/animationPaths";
import octopus from "../assets/octopus.json";

const { width: screenWidth } = Dimensions.get("window");
const width = screenWidth - 25;
export const WIDTH = width + 16;

// export default function ActivityItem(props) {
//  const dispatch = useDispatch();
//   const location = useSelector((state) => state.location);
//   // state = {
//   //   navigationAnimation: new Animated.Value(0),
//   // };

//   const [navigationAnimation, setNavigationAnimation] = useState(
//     new Animated.Value(0)
//   );

//   // componentWillMount = () => {
//   //   Image.prefetch(this.props.image);
//   // };
//   const { searchQuery, name } = props.activity;


//   const {
//     animatedValue,
//     //image,
//     itemIndex,
//     navigation,
//   } = props;

//   const onNavigate = () => {
//     //dispatch(fetchPlaces(searchQuery, location));
//     //navigation.navigate("Where to go");
//     console.log(name);

//     // Animated.timing(navigationAnimation, {
//     //   toValue: 1,
//     //   duration: 350,
//     //   useNativeDriver: false,
//     //   easing: Easing.out(Easing.quad),
//     // }).start(() => {
//     //   navigation.navigate("Where to go")
//     //   });
//     //   setTimeout(() => navigationAnimation.setValue(0));
//   };

//   return (
//     <Animated.View style={styles.container}>
//       <View style={styles.lottieView}>
//         <LottieView source={animationPaths[searchQuery]} autoPlay loop style={styles.image}></LottieView>
//       </View>
//       <TouchableWithoutFeedback style={styles.wrapper} onPress={onNavigate}>
//         <Animated.Text
//           style={[
//             styles.title,
//             {
//               opacity: animatedValue.interpolate({
//                 inputRange: [itemIndex - 1, itemIndex, itemIndex + 1],
//                 outputRange: [0, 1, 0],
//               }),
//             },
//           ]}
//         >
//           {name.toUpperCase()}
//         </Animated.Text>
//       </TouchableWithoutFeedback>
//     </Animated.View>
//   );
// }

// Polaroid View Start
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default function PolaroidAnimation(props) {
  const activities = useSelector((state) => state.activities);
  
  const Animations = () => {
    return activities?.map((item) => {
      const { activity } = item;
      const { searchQuery, id } = activity;
      return (
        <Animated.View key={id} style={styles.polaroidAnimatedContainer}>
          <LottieView source={animationPaths[searchQuery]} autoPlay loop style={styles.image}></LottieView>
        </Animated.View>
      )
    })
  }

  return (
    <View style={styles.polaroidContainer}>
      <View style={styles.polaroidImg} />
      <View style={styles.polaroidContainer}>
        <Animations />
      </View>
      <View style={styles.polaroidImg}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: width,
    justifyContent: "space-around",
    overflow: "visible",
    alignItems: "flex-start",
    backgroundColor: "#E5FFF9",
    marginRight: 16,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
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
  polaroidContainer: {
    flex: 1
  },
  polaroidImg: {
    height: 60,
  },
  polaroidAnimatedContainer: {
    height: SCREEN_HEIGHT - 120,
    width: SCREEN_WIDTH,
    padding: 10,
    backgroundColor: "#FED",
    justifyContent: "center",
    alignContent: "center",
  },
});
