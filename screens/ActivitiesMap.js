import React, { Fragment, useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import MapView, { Marker, Circle } from "react-native-maps";
import MarkerCallout from "./MarkerCallout";
import PersonCallout from "./PersonCallout";
import Loading from "./Loading";
import personPin from "../assets/personpin.png";
import { FontAwesome5 } from "@expo/vector-icons";

const people = [
  {
    id: 1,
    displayName: "james",
    lat: 30.309254,
    long: -97.694816,
    phoneNumber: "13435552323",
    imageUrl: null,
  },
  {
    id: 2,
    displayName: "Kyle",
    lat: 30.329706,
    long: -97.691989,
    phoneNumber: "13435552323",
    imageUrl: null,
  },
  {
    id: 3,
    displayName: "Steve",
    lat: 30.272404,
    long: -97.741538,
    phoneNumber: "13435552323",
    imageUrl: null,
  },
];

export default function ActivitiesMap({ navigation }) {
  const location = useSelector((state) => state.location);
  const places = useSelector((state) => state.places);

  const refreshLocation = () => {
    console.log("location pressed");
  };

  const locationButton = () => (
    <TouchableOpacity style={styles.icon} onPress={() => refreshLocation()}>
      <FontAwesome5 name="location-arrow" size={16} color="black" />
    </TouchableOpacity>
  );

  const setOptions = () => navigation.setOptions({
    headerRight: () => locationButton(),
  });

  useEffect(() => {
    setOptions()
  }, [])

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
          const { lat, long, displayName, phoneNumber, id, imageUrl } = person;

          return (
            <Fragment key={id}>
              <Circle
                center={{
                  latitude: lat,
                  longitude: long,
                }}
                radius={300}
                fillColor="rgba(144,238,144, .5)"
                strokeColor="#00ff00"
              ></Circle>
              <Marker
                coordinate={{
                  latitude: lat,
                  longitude: long,
                }}
                icon={personPin}
              >
                <PersonCallout
                  displayName={displayName}
                  imageUrl={imageUrl}
                  phoneNumber={phoneNumber}
                />
              </Marker>
            </Fragment>
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
  icon: {
    marginRight: 30,
  },
});
