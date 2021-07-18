import React from "react";
import { Dimensions, StyleSheet, Text, View, Image } from "react-native";
import { useSelector } from "react-redux";
import MapView, { Marker, Circle } from "react-native-maps";
import MarkerCallout from "./MarkerCallout";
import Loading from "./Loading";
import personPin from "../assets/personpin.png";

const people = [
  {
    id: 1,
    firstName: "james",
    latitude: 30.309254,
    longitude: -97.694816,
    phoneNumber: "343-555-2323",
  },
  {
    id: 2,
    firstName: "Kyle",
    latitude: 30.329706,
    longitude: -97.691989,
    phoneNumber: "343-555-2323",
  },
  {
    id: 3,
    firstName: "Steve",
    latitude: 30.272404,
    longitude: -97.741538,
    phoneNumber: "343-555-2323",
  },
];

export default function ActivitiesMap() {
  const location = useSelector((state) => state.location);
  const places = useSelector((state) => state.places);

  return !places.businesses || !location ? (
    <Loading />
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
          const destLat = coordinates.latitude;
          const destLng = coordinates.longitude;
          const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${lat}+${lng}&destination=${destLat}+${destLng}`;

          return (
            <Marker
              key={id}
              coordinate={{
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
              }}
            >
              <MarkerCallout
                name={name}
                imageUrl={image_url}
                mapsUrl={mapsUrl}
                detailsUrl={url}
              />
            </Marker>
          );
        })}
        {people.map((person) => {
          const {
            latitude: destLat,
            longitude: destLng,
            firstName,
            phoneNumber,
            id,
          } = person;
          const lat = location.coords.latitude;
          const lng = location.coords.longitude;
          const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${lat}+${lng}&destination=${destLat}+${destLng}`;

          return (
            <>
            <Circle key={"c" + id}
            center={{
              latitude: destLat,
              longitude: destLng,
            }}
            radius={300}
            fillColor='rgba(144,238,144, .5)'
            strokeColor="#00ff00"
            >
            </Circle>
            <Marker key={'m' + id}
              coordinate={{
                latitude: destLat,
                longitude: destLng,
              }}
              icon={personPin}
            >
              {/*<MarkerCallout
              name={firstName}
              mapsUrl={mapsUrl}
              phoneNumber={phoneNumber}
          />*/}
            </Marker>
            </>
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
