import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { authenticateLogin } from "../store";

export default function Login({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // console.log("Email => ", email, "Pwrd => ", password)
    dispatch(authenticateLogin(email, password));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login</Text>
      <View>
        <TextInput
          placeholder="Email"
          onChangeText={(evt) => setEmail(evt)}
        ></TextInput>
        <TextInput
          placeholder="password"
          onChangeText={(evt) => setPassword(evt)}
        ></TextInput>
        <Button
          title="Submit"
          onPress={() => handleSubmit()}
          style={styles.btn}
        ></Button>
        <Text>first time?</Text>
        <Text onPress={() => navigation.navigate("Register")}>Register</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 23,
    marginHorizontal: 13,
    marginBottom: 30,
  },
  btn: {
    marginVertical: 8,
  },
});
