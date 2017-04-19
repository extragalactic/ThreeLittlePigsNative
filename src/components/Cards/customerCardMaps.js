import React from 'react';
import { Card, Button } from 'react-native-elements';
import MapView from 'react-native-maps';
import { MasterStyleSheet } from '../../style/MainStyles';

const defaultMarker = {
  longitude: -122.4324,
  latitude: 37.78825,
};

const CustomerCardMaps = ({ customer, getDirections, gotoStreetView }) => (
  <Card
    title={customer.address ? `${customer.address}` : 'Address'}
    containerStyle={MasterStyleSheet.cardStyle}
  >
    <MapView
      style={MasterStyleSheet.customerCardMap}
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
      buttonStyle={MasterStyleSheet.mainButtonStyle}
      title="Get Directions"
      onPress={getDirections}
    />
    <Button
      icon={{ name: 'location-city' }}
      backgroundColor="#03A9F4"
      buttonStyle={MasterStyleSheet.mainButtonStyle}
      title="Street View"
      onPress={gotoStreetView}
    />    
  </Card>
);

export default CustomerCardMaps;
