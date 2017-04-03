import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Spinner from 'react-native-spinkit';
import Auth0Lock from 'react-native-lock';
import Config from 'react-native-config';
import RNRestart from 'react-native-restart';
import { connect } from 'react-redux';
import { saveProfile } from '../../Realm/authRealm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
});

class _NoLogin extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
    this.lock = new Auth0Lock({ clientId: Config.AUTH0_ID, domain: Config.AUTH0_DOMAIN }, {});
  }
  componentDidMount() {
    this.lock.show({}, (err, profile, token) => {
      if (err) {
        console.error(err);
      }
     // console.log(profile);
      saveProfile(profile, token);
      RNRestart.Restart();
    });
  }
  render() {
    return (
      <View
        style={styles.container}
      >
        <Spinner />
        <Text>Not Logged In</Text>
      </View>
    );
  }
}

const mapActionsToProps = dispatch => ({
  saveProfile(profile) {
    dispatch({ type: 'SAVE_PROFILE', payload: profile });
  },
});

const NoLogin = connect(null, mapActionsToProps)(_NoLogin);

export default NoLogin;
