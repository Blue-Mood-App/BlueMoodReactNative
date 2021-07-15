import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Button,
} from "react-native";
import * as Contacts from "expo-contacts";
import * as Linking from "expo-linking";

export default function Contact() {
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });

        if (data.length > 0) {
          const contact = data[20];
          console.log(contact);
        }
      }
    })();
  }, []);

  const makeCall = () => {
    Linking.openURL("tel:+17184314309");
  };
  return <Button title="call" onPress={makeCall} />;
}
