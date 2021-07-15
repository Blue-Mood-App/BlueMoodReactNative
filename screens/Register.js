import React from "react";
import { useDispatch } from "react-redux";
import { FormBuilder } from "react-native-paper-form-builder";
import { useForm } from "react-hook-form";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { authenticateRegister } from "../store/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  useFonts,
  PatrickHandSC_400Regular,
} from "@expo-google-fonts/patrick-hand-sc";
import AppLoading from "expo-app-loading";

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
  const [fontsLoaded] = useFonts({
    PatrickHandSC_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <Text style={styles.text}>Register</Text>
        <View style={styles.scrollViewStyle}>
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
          <View style={styles.buttonContainer}>
            <Button
              mode={"contained"}
              color="black"
              onPress={handleSubmit((data) => {
                const {
                  firstName,
                  lastName,
                  email,
                  password,
                  confirmPassword,
                } = data;
                if (password === confirmPassword) {
                  dispatch(
                    authenticateRegister(firstName, lastName, email, password)
                  );
                  navigation.navigate("Register Activities");
                  Alert.alert(
                    `Hi ${firstName},`,
                    "please help us personalize your profile and give you exactly what you need to perfect your day!"
                  );
                } else {
                  alert("Password doesn't match");
                }
              })}
              style={styles.btn}
            >
              Next
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
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
    marginTop: "20%",
    fontWeight: "700",
  },
  btn: {
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 18,
    borderRadius: 25,
    marginHorizontal: "auto",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
  },
});
