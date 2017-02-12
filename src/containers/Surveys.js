import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    width: 300,
  },
});

class Surveys extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Surveys </Text>
      </View>
    );
  }
}

export default Surveys;
