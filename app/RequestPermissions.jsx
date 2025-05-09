import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01, // Zoom level
        longitudeDelta: 0.01, // Zoom level
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GPS Location</Text>
      {errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : location ? (
        <MapView
          style={styles.map}
          initialRegion={location}
          showsUserLocation={true} // Highlight user's location
        >
          <Marker coordinate={location} title="You are here" />
        </MapView>
      ) : (
        <Text style={styles.text}>Fetching location...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
  error: {
    fontSize: 18,
    color: 'red',
    marginVertical: 10,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.8,
  },
});
