import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  WebView,
  NativeModules,
} from 'react-native';

import { Col, Row, Grid } from 'react-native-easy-grid';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    width: 300,
  },
});

class Surveys extends Component {
  componentDidMount() {
  }

  render() {
    return (
    <Text> test</Text>
    );
  }
}

export default Surveys;
