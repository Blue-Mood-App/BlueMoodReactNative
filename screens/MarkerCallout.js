import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as Linking from 'expo-linking';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import placeholder from "../assets/coffee.png";
import { FontAwesome5 } from '@expo/vector-icons';
import { Callout, CalloutSubview } from 'react-native-maps';

export default function MarkerCallout(props) {
    const { detailsUrl, name, imageUrl, mapsUrl } = props;

    const handleDirectionsClick = async (link) => {
      Linking.openURL(link);
    };
  
    const handleDetailsClick = async (yelp) => {
      Linking.openURL(yelp);
    };

    return (
    <Callout
      tooltip
      style={styles.callout}
    >
      <View style={styles.calloutContainer}>
        <Text style={styles.calloutImgContainer}>
          <Image
            defaultSource={placeholder}
            source={{uri: imageUrl }}
            style={styles.calloutImg}
            resizeMethod="scale"
          />
        </Text>
        <Text style={styles.calloutTitle}>
          {name}
        </Text>
        <CalloutSubview onPress={() => handleDirectionsClick(mapsUrl)}>
          <Button mode="text">
            <Ionicons name="information-circle" size={24} color="#4D4DFF" />
          </Button>
        </CalloutSubview>
        <CalloutSubview onPress={() => handleDetailsClick(detailsUrl)}>
          <Button mode="text">
            <FontAwesome5 name="directions" size={21} color="#4D4DFF" />
          </Button>
        </CalloutSubview>
      </View>
    </Callout>
    )
};

const styles = StyleSheet.create({
  calloutContainer: {
    width: 150,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    overflow: "hidden",
    backgroundColor: '#FEFCFD',
    borderRadius: 13,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderColor: "#F0F0F0",
    borderWidth: 3,
  },
  calloutImgContainer: {
    marginTop: 0,
    marginBottom: 8,
    padding: 0,
    alignSelf: "flex-start",
    height: 150,
    width: "100%",
    backgroundColor: "#EAEAEA",
  },
  calloutImg: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
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
    calloutIcons: {
      color: "#666",
      width: "45%",
    },
  });