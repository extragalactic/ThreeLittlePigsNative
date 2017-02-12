import React from 'react';
import { Card, Button } from 'react-native-elements';
import { Text, StyleSheet, View } from 'react-native';

const buttonStyle = {
  borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 2,
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

const CustomerCardPricing = ({ customer }) => (
  <Card title={'Estimates'}
    containerStyle={styles.container}
  >
    <View style={{width: 260, borderColor: 'gray', borderWidth: 1}}>
      <Button
        icon={{ name: 'attach-money' }}
        backgroundColor="#03A9F4"
        buttonStyle={buttonStyle}
        title="Add Item"
      />
      <Button
        icon={{ name: 'description' }}
        backgroundColor="#03A9F4"
        buttonStyle={buttonStyle}
        title="Estimate"
      />
    </View>
  </Card>
);

export default CustomerCardPricing;

