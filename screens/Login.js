import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, StyleSheet, Text, View, Dimensions } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { FormBuilder } from "react-native-paper-form-builder";
import { useForm } from "react-hook-form";
import { authenticateLogin } from "../store/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import clouds from "../assets/clouds.json";
import {
  useFonts,
  PatrickHandSC_400Regular,
} from "@expo-google-fonts/patrick-hand-sc";
import AppLoading from "expo-app-loading";
const { height } = Dimensions.get("window");

export default function Login({ navigation }) {
  const [fontsLoaded] = useFonts({
    PatrickHandSC_400Regular,
  });

  const { control, setFocus, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getLocation());
  // }, []);

  // dispatch(getLocation());
  //let location = useSelector((state) => state.location);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <LinearGradient
        start={{ x: 0.9, y: 0.9 }}
        end={{ x: 1.2, y: 0.5 }}
        colors={["#EAF9D9", "#8EDCE6"]}
        style={{ flex: 1, backgroundColor: "#EAF9D9" }}
      >
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
        >
          <LinearGradient
            start={{ x: 0.9, y: 0.9 }}
            end={{ x: 1.2, y: 0.5 }}
            colors={["#EAF9D9", "#8EDCE6"]}
            style={styles.background}
          >
            <View style={styles.lottieContainer}>
              <LottieView
                source={clouds}
                autoPlay
                loop
                style={styles.image}
              ></LottieView>
            </View>
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
                    dispatch(authenticateLogin(email, password, navigation));
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
          </LinearGradient>
        </KeyboardAwareScrollView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewStyle: {
    flex: 1,
    display: "flex",
    paddingVertical: 5,
    justifyContent: "flex-start",
  },
  text: {
    fontSize: 62,
    textAlign: "center",
    marginBottom: 10,
    marginTop: 5,
    paddingHorizontal: 65,
    fontFamily: "PatrickHandSC_400Regular",
  },
  txtFirst: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 8,
    marginTop: 8,
    color: "#666",
  },
  txtRegister: {
    fontSize: 16.5,
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
    shadowColor: "#525252",
    shadowOffset: {
      width: 7,
      height: 7,
    },
    shadowOpacity: 0.85,
    shadowRadius: 5.94,
  },
  background: {
    paddingLeft: 15,
    paddingRight: 15,
    height: height,
  },
  image: {
    marginTop: -38,
  },
  lottieContainer: {
    flex: 1,
    marginBottom: -310,
  },
});
