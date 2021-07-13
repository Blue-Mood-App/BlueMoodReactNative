import React from "react";
import { useDispatch } from "react-redux";
import { FormBuilder } from "react-native-paper-form-builder";
import { useForm } from "react-hook-form";
import { Alert, StyleSheet, Text, ScrollView, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { authenticateRegister } from "../store/auth";

export default function Register({ navigation }) {
  const { control, setFocus, handleSubmit } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <Text style={styles.text}>Register</Text>
        <FormBuilder
          control={control}
          setFocus={setFocus}
          formConfigArray={[
            {
              type: "text",
              name: "firstName",

              rules: {
                required: {
                  value: true,
                  message: "First name is required",
                },
              },
              textInputProps: {
                label: "First Name",
                left: <TextInput.Icon name={"account"} />,
              },
            },
            {
              type: "text",
              name: "lastName",

              rules: {
                required: {
                  value: true,
                  message: "Last name is required",
                },
              },
              textInputProps: {
                label: "Last Name",
                left: <TextInput.Icon name={"account"} />,
              },
            },
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
            {
              type: "password",
              name: "confirmPassword",

              rules: {
                required: {
                  value: true,
                  message: "Please confirm your password",
                },
              },
              textInputProps: {
                label: "Confirm password",
                left: <TextInput.Icon name={"lock"} />,
              },
            },
          ]}
        />
        <Button
          mode={"contained"}
          onPress={handleSubmit((data) => {
            const { firstName, lastName, email, password, confirmPassword } =
              data;
            if (password === confirmPassword) {
              dispatch(
                authenticateRegister(firstName, lastName, email, password)
              );
              navigation.navigate("Register Activities");
              Alert.alert(
                `Hi ${firstName},`,
                "please help us personalize your profile anWd give you exactly what you need to perfect your day!"
              );
            } else {
              alert("Password doesn't match");
            }
          })}
          style={styles.btn}
        >
          Next
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewStyle: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
  },
  text: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 32,
    fontWeight: "700",
  },
  btn: {
    marginVertical: 8,
  },
});
