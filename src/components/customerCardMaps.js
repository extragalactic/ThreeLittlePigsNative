import React from 'react';
import { Card, Button } from 'react-native-elements';
import { Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const buttonStyle = {
borderRadius: 15, marginLeft: 0, marginRight: 0, marginTop: 5,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    height: 200,
  },
});

const defaultMarker = {
  longitude: -122.4324,
  latitude: 37.78825,
};

const CustomerCardMaps = ({ customer, getDirections }) => (
  <Card title={customer.address ? `${customer.address}` : 'Address'}
    containerStyle={styles.container}
  >
    <MapView
      style={styles.map}
      mapType={'hybrid'}
      showsUserLocation
      showsCompass
      scrollEnabled={false}
      region={{
        latitude: customer.coordinates ? parseFloat(customer.coordinates.latitude) : 37.78825,
        longitude: customer.coordinates ? parseFloat(customer.coordinates.longitude) : -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    >
      <MapView.Marker
        coordinate={customer.coordinates ? {
          longitude: parseFloat(customer.coordinates.longitude),
          latitude: parseFloat(customer.coordinates.latitude) } : defaultMarker}
        title={`${customer.firstName} ${customer.lastName}`}
      />
    </MapView>
    <Button
      icon={{ name: 'directions' }}
      backgroundColor="#03A9F4"
      buttonStyle={buttonStyle}
      title="Get Directions"
      onPress={getDirections}
    />
  </Card>
);


export default CustomerCardMaps;

