import React, { useState, useEffect } from "react";
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

  const handleLogout = () => {
    dispatch(setUpdatedConnect(agreedToMeet));
    dispatch(logOut());
    navigation.navigate("Logged Out");
  };

  const handleAgreeUpdate = () => {
    dispatch(setUpdatedConnect(agreedToMeet));
    navigation.goBack();
  };

  const handleNavActivities = () => {
    dispatch(setUpdatedConnect(agreedToMeet));
    navigation.navigate("Edit Activities");
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return auth.id ? (
      <View style={styles.container}>
        <Button color="white" onPress={handleNavActivities} style={styles.btn}>
          <Text style={styles.text}>Edit Activities</Text>
        </Button>

        <View style={styles.connectContainer}>
          <Text style={styles.text}>
            Connect?{" "}
            <Switch
              style={styles.connectContainer}
              trackColor={{ false: "#e63946", true: "#fff3b0" }}
              thumbColor={agreedToMeet ? "#fb8500" : "#ffe3e0"}
              ios_backgroundColor="#f07167"
              onValueChange={toggleSwitch}
              value={agreedToMeet}
            />
          </Text>
        </View>

        <Button color="white" onPress={handleLogout} style={styles.btn}>
          <Text style={styles.text}>Log Out</Text>
        </Button>

        <Button
          color="white"
          onPress={() => handleAgreeUpdate()}
          style={styles.dismiss}
        >
          <Text style={styles.dismissText}>Dismiss</Text>
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
    marginBottom: -40,
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
  connectContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
