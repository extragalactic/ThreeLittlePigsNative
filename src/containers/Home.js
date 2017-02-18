import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import Spinner from 'react-native-spinkit';

import { MasterStyleSheet } from '../style/MainStyles';

class Home extends Component {
  render() {
    if (!this.props.user) {
      return (
        <View style={MasterStyleSheet.container}>
          <Spinner
            type={'9CubeGrid'}
          />
        </View>
      );
    }
    return (
      <View style={MasterStyleSheet.container}>
        <Text>
          Hi! {this.props.user.firstName}
        </Text>
      </View>
    );
  }
}

export default Home;
