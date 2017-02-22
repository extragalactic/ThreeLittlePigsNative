import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  WebView,
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
      <WebView
        source={{uri: 'https://tlpm.ca/photoedit'}}
        style={{marginTop: 20}}
      />
    );
  }
}

export default Surveys;
