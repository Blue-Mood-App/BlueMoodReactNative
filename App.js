import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import MarkerCallout from './MarkerCallout';

export default function App() {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Woooo!!! We have a map and a marker!</Text>
      <MapView style={styles.map} initialRegion={
        {
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0090,
          longitudeDelta: 0.0089,
        }
      }
      >
        <Marker 
          key={1}
          coordinate={{latitude: 37.78979, longitude: -122.43371}}
        >
          <Callout>
            <MarkerCallout title="Peet's Coffee" cat="Coffee Shop" />
          </Callout>
        </Marker>
        <Marker 
          key={2}
          coordinate={{latitude: 37.78944, longitude: -122.43402}}
        >
          <Callout>
            <MarkerCallout title="Jane on Fillmore" cat="Coffee Shop" />
          </Callout>
        </Marker>
        <Marker 
          key={3}
          coordinate={{latitude: 37.79036, longitude: -122.43348}}
        >
          <Callout>
            <MarkerCallout title="Starbucks" cat="Coffee Shop" />
          </Callout>
        </Marker>
        <Marker 
          key={4}
          coordinate={{latitude: 37.78874, longitude: -122.43420}}
        >
          <Callout>
            <MarkerCallout title="Starbucks" cat="Coffee Shop" />
          </Callout>
        </Marker>
        <Marker 
          key={5}
          coordinate={{latitude: 37.78796, longitude: -122.43339}}
        >
          <Callout>
            <MarkerCallout title="La boulangerie de San Francisco" cat="Coffee Shop" />
          </Callout>
        </Marker>
        <Marker 
          key={6}
          coordinate={{latitude: 37.78744, longitude: -122.43315}}
        >
          <Callout>
            <MarkerCallout title="Compton's Coffee House" cat="Coffee Shop" />
          </Callout>
        </Marker>
        <Marker 
          key={7}
          coordinate={{latitude: 37.78560, longitude: -122.43485}}
        >
          <Callout>
            <MarkerCallout title="Cafe Murano" cat="Coffee Shop" />
          </Callout>
        </Marker>
        <Marker 
          key={8}
          coordinate={{latitude: 37.78582, longitude: -122.43120}}
        >
          <Callout>
            <MarkerCallout title="Crown & Crumpet Tea Salon" cat="Coffee Shop" />
          </Callout>
        </Marker>
        <Marker 
          key={9}
          coordinate={{latitude: 37.78538, longitude: -122.42980}}
        >
          <Callout>
            <MarkerCallout title="Cafe Hana" cat="Coffee Shop" />
          </Callout>
        </Marker>
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
