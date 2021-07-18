import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import * as Linking from "expo-linking";
import { Button } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import person from "../assets/person.jpg";
import { useSelector } from "react-redux";
import { Callout, CalloutSubview } from "react-native-maps";

export default function PersonCallout(props) {
  const { imageUrl, displayName, phoneNumber } = props;
  const auth = useSelector((state) => state.auth);
  console.log(auth)

  const handleTextLink = async (phoneNumber) => {
    Linking.openURL(
      `https://wa.me/${phoneNumber}?text=Hey!%20my%20name%20is%20${auth.displayName},%20I%20found%20you%20by%20using%20Blue%20Mood.%20Would%20gityou%20like%20to%20meet%20up?`
    );
  };

  return (
    <Callout tooltip style={styles.callout}>
      <View style={styles.calloutContainer}>
        <Text style={styles.calloutImgContainer}>
          <Image
            defaultSource={person}
            source={{ uri: imageUrl ? imageUrl : null }}
            style={styles.calloutImg}
            resizeMethod="scale"
          />
        </Text>
        <Text style={styles.calloutTitle}>{displayName}</Text>
        <CalloutSubview onPress={() => handleTextLink(phoneNumber)}>
          <Button mode="text">
            <AntDesign name="message1" size={24} color="black" />
          </Button>
        </CalloutSubview>
      </View>
    </Callout>
  );
}

const styles = StyleSheet.create({
  calloutContainer: {
    width: 150,
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    overflow: "hidden",
    backgroundColor: "#FEFCFD",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderColor: "#F0F0F0",
    borderRadius: 13,
    borderWidth: 3,
  },
  calloutTitle: {
    fontSize: 18,
    flexBasis: "100%",
    color: "#333333",
    marginBottom: 8,
  },
  calloutImgContainer: {
    marginTop: 0,
    marginBottom: 8,
    padding: 0,
    alignSelf: "flex-start",
    height: 150,
    width: 120,
    backgroundColor: "#EAEAEA",
    borderRadius: 13,
    overflow: "hidden",
  },
  calloutImg: {
    width: 120,
    height: 150,
    borderRadius: 13,
  },
  calloutIcons: {
    color: "#666",
    width: "45%",
  },
});
