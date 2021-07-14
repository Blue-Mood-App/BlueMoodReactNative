import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, Modal, ScrollView } from "react-native";
import { Button, TextInput, RadioButton, Text } from "react-native-paper";
import { FormBuilder } from "react-native-paper-form-builder";
import { useForm } from "react-hook-form";
import { setContactList } from "../store/registration";
import { Feather } from "@expo/vector-icons";

export default function UserContacts({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const [agreedToMeet, setAgreedToMeet] = useState(false);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id: userId } = user;

  //contacts
  const { control, setFocus, handleSubmit } = useForm({
    defaultValues: {
      contactOne: "",
      contactTwo: "",
      contactThree: "",
    },
    mode: "onChange",
  });

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.container}>
          <Text style={styles.text}>
            {modalText === "contacts"
              ? "Having a tough day and feel like chatting with your loved ones? Share the names of your favorite people, and we'll make sure to remind you to contact them when life is being unfair to you."
              : "Hey! Why not join our connect program? Our connect program will connect you with other Blue Mood users who want to make new friends just like you. We will suggest users living in the same area as you, and you can then start a chat with them."}
          </Text>
          <Button onPress={() => setModalVisible(!modalVisible)}>Close </Button>
        </View>
      </Modal>
      <ScrollView
        contentContainerStyle={styles.scrollViewStyle}
        vertical={true}
      >
        <Text style={styles.titleText}>
          Would you like to share your contacts?{" "}
          <Feather
            name="info"
            size={18}
            color="black"
            style={styles.infoIcon}
            onPress={() => (setModalVisible(true), setModalText("contacts"))}
          />
        </Text>

        <FormBuilder
          control={control}
          setFocus={setFocus}
          formConfigArray={[
            {
              type: "text",
              name: "contactOne",

              textInputProps: {
                label: "Contact Name",
              },
            },
            {
              type: "text",
              name: "contactTwo",

              textInputProps: {
                label: "Contact Name",
              },
            },
            {
              type: "text",
              name: "contactThree",

              textInputProps: {
                label: "Contact Name",
              },
            },
          ]}
        />
        <View>
          <Text style={styles.titleText}>
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
          <RadioButton.Item label="Of course" value="true" />
          <RadioButton.Item label="Not now" value="false" />
        </RadioButton.Group>
        <Button
          style={styles.btn}
          onPress={handleSubmit((data) => {
            const { contactOne, contactTwo, contactThree } = data;
            dispatch(
              setContactList(
                agreedToMeet,
                [contactOne, contactTwo, contactThree],
                userId
              )
            );
            navigation.navigate("Home");
          })}
        >
          Submit
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 18,
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
    marginTop: 20,
  },
});
