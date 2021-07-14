import React from "react";
import { useDispatch } from "react-redux";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { FormBuilder } from "react-native-paper-form-builder";
import { useForm } from "react-hook-form";
import { authenticateLogin } from "../store/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Login({ navigation }) {
  const { control, setFocus, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const dispatch = useDispatch();

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Text style={styles.text}>Sign in</Text>
      <View style={styles.scrollViewStyle}>
        <FormBuilder
          control={control}
          setFocus={setFocus}
          formConfigArray={[
            {
              type: "email",
              name: "email",

              rules: {
                required: {
                  value: true,
                  message: "Email is required",
                },
              },
              textInputProps: {
                label: "Email",
                left: <TextInput.Icon name={"email"} />,
              },
            },
            {
              type: "password",
              name: "password",

              rules: {
                required: {
                  value: true,
                  message: "Password is required",
                },
              },
              textInputProps: {
                label: "Password",
                left: <TextInput.Icon name={"lock"} />,
              },
            },
          ]}
        />
        <View style={styles.buttonContainer}>
          <Button
            mode={"contained"}
            color="black"
            onPress={handleSubmit((data) => {
              const { email, password } = data;
              dispatch(authenticateLogin(email, password));
              navigation.navigate("Select Mood");
            })}
            style={styles.btn}
          >
            Login
          </Button>
        </View>
        <Text style={styles.txtFirst}>First Time?</Text>
        <Text
          style={styles.txtRegister}
          onPress={() => navigation.navigate("Register")}
        >
          Register
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewStyle: {
    flex: 1,
    padding: 18,
    justifyContent: "center",
  },
  text: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 32,
    marginTop: "30%",
    fontWeight: "700",
  },
  txtFirst: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 8,
    marginTop: 8,
    color: "#666",
  },
  txtRegister: {
    fontSize: 15,
    textAlign: "center",
    color: "#3369ea",
  },
  btn: {
    marginVertical: 8,
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderRadius: 25,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
  },
});
