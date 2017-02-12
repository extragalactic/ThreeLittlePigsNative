import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import Spinner from 'react-native-spinkit';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

class Home extends Component {

  render() {
    console.log('HOME', this.props);

    if (!this.props.user) {
      return (
        <View style={styles.container}>
          <Spinner
            type={'9CubeGrid'}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>
          Hi! {this.props.user.firstName}
          </Text>
        </View>
      );
    }
  }
}

export default Home;
