import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});


class Pricing extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
        Pricing
         </Text>
      </View>
    );
  }
}

export default Pricing;
