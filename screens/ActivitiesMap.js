import React, { Fragment, useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import MapView, { Marker, Circle } from "react-native-maps";
import MarkerCallout from "./MarkerCallout";
import PersonCallout from "./PersonCallout";
import Loading from "./Loading";
import personPin from "../assets/personpin.png";
import { FontAwesome5 } from "@expo/vector-icons";
import { getLocActivitiesUsers } from '../store/location'

export default function ActivitiesMap({ navigation, route }) {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);
  const places = useSelector((state) => state.places);
  const nearbyUsers = useSelector((state) => state.nearbyUsers);
  const auth = useSelector(state => state.auth)
  const { searchQuery, moodId } = route.params;

  const refreshLocation = () => {
    dispatch(getLocActivitiesUsers(searchQuery))
  };

  const locationButton = () => (
    <TouchableOpacity style={styles.icon} onPress={() => refreshLocation()}>
      <FontAwesome5 name="location-arrow" size={16} color="black" />
    </TouchableOpacity>
  );

  const setOptions = () =>
    navigation.setOptions({
      headerRight: () => locationButton(),
    });

  useEffect(() => {
    setOptions();
    if (!moodId || !searchQuery) {
      navigation.navigate('Select Mood')
    }
  }, []);

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
        {!nearbyUsers.length ? (
          <></>
        ) : (
          nearbyUsers.map((person) => {
            const {
              lat,
              long,
              displayName,
              phoneNumber,
              id,
              imageUrl,
            } = person;

            return (
              <Fragment key={id}>
                <Circle
                  center={{
                    latitude: +lat,
                    longitude: +long,
                  }}
                  radius={500}
                  fillColor='#00FF00'
                  strokeColor="#00ff00"
                ></Circle>
                <Marker
                  coordinate={{
                    latitude: +lat,
                    longitude: +long,
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
          })
        )}
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
