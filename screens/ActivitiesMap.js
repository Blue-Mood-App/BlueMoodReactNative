import React, { useCallback } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import MapView, { Callout, CalloutSubview, Marker } from "react-native-maps";
import MarkerCallout from "./MarkerCallout";
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import placeholder from "../assets/coffee.png";

export default function ActivitiesMap() {
  const location = useSelector((state) => state.location);
  const places = useSelector((state) => state.places);

  const handleDirectionsClick = async (link) => {
    Linking.openURL(link);
  };

  const handleDetailsClick = async (yelp) => {
    Linking.openURL(yelp);
  };

  return !places.businesses || !location ? (
    <Text>loading...</Text>
  ) : (
    <View style={styles.container}>
      <MapView
        provider="google"
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsPointsOfInterest={false}
      >
        {places.businesses.map((place) => {
          const lat = location.coords.latitude;
          const lng = location.coords.longitude;
          const { id, name, coordinates, image_url, url } = place;
          const destLat = coordinates.latitude
          const destLng = coordinates.longitude
          const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${lat}+${lng}&destination=${destLat}+${destLng}`;

          return (
            <Marker
              key={id}
              coordinate={{
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
              }}>
              <Callout
                tooltip
                style={styles.callout}
              >

              <View style={styles.calloutContainer}>
                <Text style={styles.calloutImgContainer}>
                  <Image
                    defaultSource={placeholder}
                    source={{uri: image_url ? image_url : null}}
                    style={styles.calloutImg}
                    resizeMethod="scale"
                    resizeMode="center"
                    />
                </Text>
                <Text style={styles.calloutTitle}>
                  {name}
                </Text>
                <CalloutSubview onPress={() => handleDirectionsClick(mapsUrl)}>
                  <Button style={{width: "45%", color: "#666"}} mode="text">
                    <FontAwesome5 name="directions" size={24} color="green" />
                  </Button>
                </CalloutSubview>
                <CalloutSubview onPress={() => handleDetailsClick(url)}>
                  <Button style={{width: "45%", color: "#666"}} mode="text">
                    <Ionicons name="information" size={24} color="green" />
                  </Button>
                </CalloutSubview>
              </View>

              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  callout: {
    height: 250,
    width: 150,
    margin: 0,
    padding: 0,
    overflow: "hidden",
  },
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
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  calloutContainer: {
    width: 150,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    overflow: "hidden",
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  calloutTitle: {
    fontSize: 10,
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
      marginBottom: 0,
      padding: 0,
      alignSelf: "flex-start",
      height: 150,
  },
  calloutImg: {
      width: 150,
      height: 150,
      resizeMode: "cover",
  }
});
