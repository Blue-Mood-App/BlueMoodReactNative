import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import MarkerCallout from "./MarkerCallout";

export default function ActivitiesMap() {
  const location = useSelector((state) => state.location);
  const places = useSelector((state) => state.places);

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
              <MarkerCallout name={name} imageUrl={image_url} mapsUrl={mapsUrl} detailsUrl={url} />
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
});
