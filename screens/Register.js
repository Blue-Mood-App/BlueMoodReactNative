import React from "react";
import { useDispatch } from "react-redux";
import { FormBuilder } from "react-native-paper-form-builder";
import { useForm } from "react-hook-form";
import { Alert, StyleSheet, Text, View, Dimensions } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { authenticateRegister } from "../store/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  useFonts,
  PatrickHandSC_400Regular,
} from "@expo-google-fonts/patrick-hand-sc";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import octopus from "../assets/octopus2.json";

const { height } = Dimensions.get("window");

export default function Register({ navigation }) {
  const [fontsLoaded] = useFonts({
    PatrickHandSC_400Regular,
  });

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
    <KeyboardAwareScrollView style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 2.4 }}
        colors={["#f19c79", "#fff3b0"]}
        style={styles.background}
      >
        <View style={styles.lottieContainer}>
          <LottieView
            source={octopus}
            autoPlay
            loop
            style={styles.image}
          ></LottieView>
        </View>
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
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewStyle: {
    flex: 1,
    paddingHorizontal: 5,
    paddingTop: 5,
    justifyContent: "flex-start",
  },
  text: {
    fontSize: 56,
    textAlign: "center",
    // marginTop: "20%",
    // marginBottom: 20,
    fontFamily: "PatrickHandSC_400Regular",
  },
  btn: {
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 18,
    borderRadius: 25,
    // marginHorizontal: "auto",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    shadowColor: "#525252",
    shadowOffset: {
      width: 7,
      height: 7,
    },
    shadowOpacity: 0.85,
    shadowRadius: 3.94,
  },
  background: {
    paddingLeft: 15,
    paddingRight: 15,
    height: height,
  },
  image: {
    marginTop: -80,
  },
  lottieContainer: {
    flex: 1,
    marginBottom: -382,
  },
});
