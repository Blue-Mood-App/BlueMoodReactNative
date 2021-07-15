import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import * as Linking from "expo-linking";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import placeholder from "../assets/placeholder.png";
import { FontAwesome5 } from "@expo/vector-icons";
import { Callout, CalloutSubview } from "react-native-maps";

export default function MarkerCallout(props) {
  const { detailsUrl, name, imageUrl, mapsUrl } = props;

  const handleDirectionsClick = async (link) => {
    Linking.openURL(link);
  };

  const handleDetailsClick = async (yelp) => {
    Linking.openURL(yelp);
  };

  return (
    <Callout tooltip style={styles.callout}>
      <View style={styles.calloutContainer}>
        <Text style={styles.calloutImgContainer}>
          <Image
            defaultSource={placeholder}
            source={{ uri: imageUrl ? imageUrl : null }}
            style={styles.calloutImg}
            resizeMethod="scale"
          />
        </Text>
        <Text style={styles.calloutTitle}>{name}</Text>
        <CalloutSubview onPress={() => handleDirectionsClick(detailsUrl)}>
          <Button mode="text">
            <Ionicons name="information-circle" size={24} color="#4D4DFF" />
          </Button>
        </CalloutSubview>
        <CalloutSubview onPress={() => handleDetailsClick(mapsUrl)}>
          <Button mode="text">
            <FontAwesome5 name="directions" size={21} color="#4D4DFF" />
          </Button>
        </CalloutSubview>
      </View>
    </Callout>
  );
}

const styles = StyleSheet.create({
  calloutContainer: {
    width: 150,
    flexDirection: "row",
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
    fontSize: 13,
    color: "#333333",
    flexBasis: "100%",
    marginBottom: 8,
  },
  calloutTxt: {
    fontSize: 10,
    color: "#999999",
    flexBasis: "100%",
  },
  calloutImgContainer: {
    marginTop: 0,
    marginBottom: 8,
    padding: 0,
    alignSelf: "flex-start",
    height: 150,
    width: 125,
    backgroundColor: "#EAEAEA",
    borderRadius: 13,
    overflow: "hidden",
  },
  calloutImg: {
    width: 125,
    height: 150,
    borderRadius: 13,
  },
  calloutIcons: {
    color: "#666",
    width: "45%",
  },
});
