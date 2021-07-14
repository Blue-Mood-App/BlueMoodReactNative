import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../store/auth";
import { Button } from "react-native-paper";

export default function Menu({ navigation }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logOut());
    navigation.navigate("Logged Out");
  };

  return auth.id ? (
    <View style={styles.container}>
      <Button color='white' onPress={() => navigation.navigate("Profile")} style={styles.btn}>
      <Text style={styles.text}>Profile</Text>
      </Button>
      <Button color='white' onPress={handleLogout} style={styles.btn}>
      <Text style={styles.text}>Log Out</Text>
      </Button>

      <Button color='white' onPress={() => navigation.goBack()} style={styles.dismiss}>
        Dismiss
      </Button>
    </View>
  ) : (
    <View style={styles.container}>
      <Button  color='white' onPress={() => navigation.navigate("Login")} style={styles.btn}>
      <Text style={styles.text}>Log in</Text>
      </Button>
      <Button color='white'
        onPress={() => navigation.navigate("Register")}
        style={styles.btn}
      >
      <Text style={styles.text}>Sign Up</Text>
      </Button>

      <Button color='white'  onPress={() => navigation.goBack()} style={styles.dismiss}>
        Dismiss
      </Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#f28482'
  },
  text: {
    fontSize: 40,
  },
  btn: {
    marginTop: 20,
  },
  dismiss: {
    position:'absolute',
    bottom: 100
  }
});
