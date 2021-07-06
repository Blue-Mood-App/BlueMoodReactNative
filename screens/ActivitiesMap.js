import React from 'react';
import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import MarkerCallout from './MarkerCallout';

export default function ActivitiesMap() {

  return (
    <View style={styles.container}>
      <MapView provider="google" 
        style={styles.map} 
        initialRegion={
          {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0090,
            longitudeDelta: 0.0089,
          }
        }
        showsPointsOfInterest={false}
      >
        <Marker 
          key={1}
          coordinate={{latitude: 37.78979, longitude: -122.43371}}
        >
          <Callout style={styles.callout} onPress={() => Alert.alert('Pending feature')}>
            <MarkerCallout title="Peet's Coffee" cat="Coffee Shop" />
          </Callout>
        </Marker>
        <Marker 
          key={2}
          coordinate={{latitude: 37.78944, longitude: -122.43402}}
        >
          <Callout style={styles.callout} onPress={() => Alert.alert('Pending feature')}>
            <MarkerCallout title="Jane on Fillmore" cat="Coffee Shop" />
          </Callout>
        </Marker>
        <Marker 
          key={3}
          coordinate={{latitude: 37.79036, longitude: -122.43348}}
        >
          <Callout style={styles.callout} onPress={() => Alert.alert('Pending feature')}>
            <MarkerCallout title="Starbucks" cat="Coffee Shop" />
          </Callout>
        </Marker>
        <Marker 
          key={4}
          coordinate={{latitude: 37.78874, longitude: -122.43420}}
        >
          <Callout style={styles.callout} onPress={() => Alert.alert('Pending feature')}>
            <MarkerCallout title="Starbucks" cat="Coffee Shop" />
          </Callout>
        </Marker>
        <Marker 
          key={5}
          coordinate={{latitude: 37.78796, longitude: -122.43339}}
        >
          <Callout style={styles.callout} onPress={() => Alert.alert('Pending feature')}>
            <MarkerCallout title="La boulangerie de San Francisco" cat="Coffee Shop" />
          </Callout>
        </Marker>
        <Marker 
          key={6}
          coordinate={{latitude: 37.78744, longitude: -122.43315}}
        >
          <Callout style={styles.callout} onPress={() => Alert.alert('Pending feature')}>
            <MarkerCallout title="Compton's Coffee House" cat="Coffee Shop" />
          </Callout>
        </Marker>
        <Marker 
          key={7}
          coordinate={{latitude: 37.78560, longitude: -122.43485}}
        >
          <Callout style={styles.callout} onPress={() => Alert.alert('Pending feature')}>
            <MarkerCallout title="Cafe Murano" cat="Coffee Shop" />
          </Callout>
        </Marker>
        <Marker 
          key={8}
          coordinate={{latitude: 37.78582, longitude: -122.43120}}
        >
          <Callout style={styles.callout} onPress={() => Alert.alert('Pending feature')}>
            <MarkerCallout title="Crown & Crumpet Tea Salon" cat="Coffee Shop" />
          </Callout>
        </Marker>
        <Marker 
          key={9}
          coordinate={{latitude: 37.78538, longitude: -122.42980}}
        >
          <Callout style={styles.callout} onPress={() => Alert.alert('Pending feature')}>
            <MarkerCallout title="Cafe Hana" cat="Coffee Shop" />
          </Callout>
        </Marker>
      </MapView>
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  callout: {
    height: 250,
    width: 150,
    margin: 0,
    padding: 0,
    overflow: "hidden",
  },
});
