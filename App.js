import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Woooo!!! We have a map and a marker!</Text>
      <MapView style={styles.map} initialRegion={
        {
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
      }
      >
        <Marker key={1} coordinate={{latitude: 37.78825, longitude: -122.4324}} description="A Demo Marker" />
      </MapView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 23,
    marginHorizontal: 13,
    marginBottom: 30,
  },
  map: {
    width: "100%",
    height: "50%",
  }
});
