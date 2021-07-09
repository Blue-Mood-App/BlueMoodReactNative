import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, StyleSheet, Text, TextInput, View, Modal } from "react-native";

export default function UserContacts({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.container}>
          <Text>{modalText === "contacts" ? "hello" : "world"}</Text>
          <Button
            title="Close"
            onPress={() => setModalVisible(!modalVisible)}
          />
        </View>
      </Modal>
      <View>
        <Text>Would you like to share your contacts?</Text>
        <Button
          title="?"
          onPress={() => (setModalVisible(true), setModalText("contacts"))}
        />
        <Text>Contact 1:</Text>
        <TextInput
          placeholder="full name"
          //   onChangeText={(evt) => setfirstName(evt)}
        ></TextInput>
        <Text>Contact 2:</Text>
        <TextInput
          placeholder="full name"
          //   onChangeText={(evt) => setfirstName(evt)}
        ></TextInput>
        <Text>Contact 3:</Text>
        <TextInput
          placeholder="full name"
          //   onChangeText={(evt) => setfirstName(evt)}
        ></TextInput>
      </View>

      <View>
        <Text>Would you like to connect with other members near you?</Text>
        <Button
          title="?"
          onPress={() => (setModalVisible(true), setModalText("permission"))}
        />
        <Text style={styles.fieldButton}> Of course</Text>
        <Text style={styles.fieldButton}> Not now </Text>
      </View>
      <Button title="Submit" style={styles.btn} />
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
  fieldButton: {
    fontSize: 16,
    color: "#40E0D0",
    textAlign: "center",
  },
  btn: {
    marginTop: 20,
  },
});
