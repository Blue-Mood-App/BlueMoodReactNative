import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View, Text, Switch } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setUpdatedConnect } from "../store/registration";
import { logOut } from "../store/auth";
import { Button } from "react-native-paper";
import {
  useFonts,
  PatrickHandSC_400Regular,
} from "@expo-google-fonts/patrick-hand-sc";
import AppLoading from "expo-app-loading";
import { setContactList } from "../store/registration";

export default function Menu({ navigation }) {
  const dispatch = useDispatch();
  let [fontsLoaded] = useFonts({
    PatrickHandSC_400Regular,
  });
  const auth = useSelector((state) => state.auth);
  const agreedToMeetState = auth.agreedToMeet;
  const [agreedToMeet, setAgreedToMeet] = useState(agreedToMeetState);
  const toggleSwitch = () => setAgreedToMeet((previousState) => !previousState);
  console.log("agreedToMeet before toggle", agreedToMeet);

  const handleLogout = () => {
    dispatch(logOut());
    navigation.navigate("Logged Out");
  };

  const handleAgreeUpdate = () => {
    dispatch(setUpdatedConnect(agreedToMeet));
    navigation.goBack();
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return auth.id ? (
      <View style={styles.container}>
        <Button
          color="white"
          onPress={() => navigation.navigate("Edit Activities")}
          style={styles.btn}
        >
          <Text style={styles.text}>Edit Activities</Text>
        </Button>

        <Button color="white" onPress={handleLogout} style={styles.btn}>
          <Text style={styles.text}>Log Out</Text>
        </Button>

        <View style={styles.connectContainer}>
          <Text style={styles.text}>Connect?</Text>
          <Switch
            trackColor={{ false: "#eafdcf", true: "#fffc99" }}
            thumbColor={agreedToMeet ? "#FA976B" : "#b1f8f2"}
            ios_backgroundColor="#94C7B8"
            onValueChange={toggleSwitch}
            value={agreedToMeet}
          />
        </View>

        <Button
          color="white"
          onPress={() => handleAgreeUpdate()}
          style={styles.dismiss}
        >
          Dismiss
        </Button>
      </View>
    ) : (
      <View style={styles.container}>
        <Button
          color="white"
          onPress={() => navigation.navigate("Login")}
          style={styles.btn}
        >
          <Text style={styles.text}>Log in</Text>
        </Button>
        <Button
          color="white"
          onPress={() => navigation.navigate("Register")}
          style={styles.btn}
        >
          <Text style={styles.text}>Sign Up</Text>
        </Button>

        <Button
          color="white"
          onPress={() => navigation.goBack()}
          style={styles.dismiss}
        >
          <Text style={styles.dismissText}>Dismiss</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5A5A3",
    marginBottom: -100,
  },
  text: {
    fontSize: 40,
    fontFamily: "PatrickHandSC_400Regular",
    color: "white",
  },
  btn: {
    marginTop: 20,
  },
  dismiss: {
    position: "absolute",
    bottom: 100,
  },
  dismissText: {
    fontFamily: "PatrickHandSC_400Regular",
    fontSize: 20,
  },
  // connectContainer: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
});
