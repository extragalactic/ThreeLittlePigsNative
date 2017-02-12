import React from 'react';

import { StyleSheet, View, Text } from 'react-native';

const BrickcountInput = () => (
 <View style={styles.container}>
 <Text> Brick Count</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    margin: 20,
  },
});

export default BrickcountInput;

