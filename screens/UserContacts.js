import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Modal,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import { Button, RadioButton, Text } from "react-native-paper";
import { FormBuilder } from "react-native-paper-form-builder";
import { useForm } from "react-hook-form";
import { setContactList } from "../store/registration";
import { Feather } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo-linear-gradient";

const { height } = Dimensions.get("window");

export default function UserContacts({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const [agreedToMeet, setAgreedToMeet] = useState(false);
  const [displayName, onChangeDisplayName] = React.useState("");
  const [phoneNumber, onChangePhoneNumber] = React.useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const { id: userId } = user;

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^\+?[0-9]{1,3}?[0-9]{9,15}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.container}>
          <Text style={styles.text}>
            {modalText === "contacts" &&
              "Hey! Why not join our connect program? Our connect program will connect you with other Blue Mood users who want to make new friends just like you. We will suggest users living in the same area as you, and you can then start a chat with them."}
          </Text>
          <Button onPress={() => setModalVisible(!modalVisible)}>Close </Button>
        </View>
      </Modal>
      <LinearGradient
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.9, y: 2.4 }}
        colors={["#f19c79", "#f5ee9e", "#fff"]}
        style={{ flex: 1, backgroundColor: "#f19c79" }}
      >
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <LinearGradient
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.9, y: 2.4 }}
            colors={["#f19c79", "#f5ee9e", "#fff"]}
            style={styles.background}
          >
            <View style={styles.textContainer}>
              <View>
                <Text
                  style={styles.titleText}
                  onPress={() => (
                    setModalVisible(true), setModalText("permission")
                  )}
                >
                  Would you like to connect with other members near you?{" "}
                  <Feather
                    name="info"
                    size={20}
                    color="black"
                    onPress={() => (
                      setModalVisible(true), setModalText("permission")
                    )}
                  />
                </Text>
              </View>
              <RadioButton.Group
                onValueChange={(value) => setAgreedToMeet(value)}
                value={agreedToMeet}
              >
                <RadioButton.Item label="Of course" value={true} />
                <RadioButton.Item label="Not now" value={false} />
              </RadioButton.Group>
              {agreedToMeet && (
                <View>
                  <Text style={styles.titleText}>
                    If yes, share your preferred name
                  </Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeDisplayName}
                    value={displayName}
                    placeholder="Display Name"
                  />
                  <Text style={styles.titleText}>
                    share your preferred phone number
                  </Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangePhoneNumber}
                    value={phoneNumber}
                    placeholder="1111111111"
                    keyboardType="numeric"
                  />
                </View>
              )}
              <View style={styles.buttonContainer}>
                <Button
                  style={styles.btn}
                  mode={"contained"}
                  color="black"
                  onPress={() => {
                    if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
                      alert("error, phone number is invalid");
                      return;
                    }

                    dispatch(
                      setContactList(
                        agreedToMeet,
                        displayName,
                        phoneNumber,
                        userId
                      )
                    );
                    navigation.navigate("Select Mood");
                  }}
                >
                  Submit
                </Button>
              </View>
            </View>
          </LinearGradient>
        </KeyboardAwareScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
    padding: 15,
    justifyContent: "flex-start",
  },
  titleText: {
    fontSize: 18,
    paddingVertical: 15,
    marginTop: 5,
  },
  fieldButton: {
    fontSize: 16,
    color: "#40E0D0",
    textAlign: "center",
  },
  btn: {
    marginBottom: 10,
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
    shadowRadius: 3.94,
  },
  background: {
    paddingLeft: 15,
    paddingRight: 15,
    height: height,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
