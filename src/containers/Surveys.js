import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  WebView,
  NativeModules,
} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    width: 300,
  },
});

class Surveys extends Component {
  componentDidMount() {
    console.log(NativeModules);
  }

  render() {
    return (
      <WebView
        source={{ uri: 'https://tlpm.ca/documents/JohnFritzEstimate.pdf' }}
      />
    );
  }
}

export default Surveys;
