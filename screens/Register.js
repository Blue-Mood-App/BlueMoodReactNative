import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { authenticateRegister } from "../store/auth";

export default function Register({ navigation }) {
  const dispatch = useDispatch();

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (password === confirmPassword) {
      dispatch(authenticateRegister(firstName, lastName, email, password));
      navigation.navigate("Register Activities");
      Alert.alert(
        "Hi there,",
        "please help us personalize your profile and give you exactly what you need to perfect your day!"
      );
    } else {
      alert("Password doesn't match");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Register</Text>
      <View>
        <TextInput
          placeholder="First Name"
          onChangeText={(evt) => setfirstName(evt)}
        ></TextInput>
        <TextInput
          placeholder="Last Name"
          onChangeText={(evt) => setlastName(evt)}
        ></TextInput>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          textContentType="emailAddress"
          onChangeText={(evt) => setEmail(evt)}
        ></TextInput>
        <TextInput
          placeholder="Password"
          textContentType="password"
          autoCapitalize="none"
          onChangeText={(evt) => setPassword(evt)}
        ></TextInput>
        <TextInput
          placeholder="Confirm Password"
          textContentType="password"
          autoCapitalize="none"
          onChangeText={(evt) => setConfirmPassword(evt)}
        ></TextInput>

        <Button
          title="Next"
          onPress={() => handleSubmit()}
          style={styles.btn}
        ></Button>
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
