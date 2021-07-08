import React from "react";
import { Alert, Dimensions, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import MapView, { Callout, Marker } from "react-native-maps";
import MarkerCallout from "./MarkerCallout";

export default function ActivitiesMap() {
  const location = useSelector((state) => state.location);
  const places = useSelector((state) => state.places);

  console.log(places, "in component");

  return (
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
          const { id, name, coordinates, image_url, distance, url } = place;
          return (
            <Marker
              key={id}
              coordinate={{ latitude: coordinates.latitude, longitude: coordinates.longitude }}
            >
              <Callout
                style={styles.callout}
                onPress={() => Alert.alert("Pending feature")}
              >
                <MarkerCallout name={name} imageUrl={image_url} url={url} cat="Coffee Shop" />
              </Callout>
            </Marker>
          );
        })}


      </MapView>
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
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  callout: {
    height: 250,
    width: 150,
    margin: 0,
    padding: 0,
    overflow: "hidden",
  },
});
