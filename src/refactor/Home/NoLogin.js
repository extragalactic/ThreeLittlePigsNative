import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Spinner from 'react-native-spinkit';
import Auth0Lock from 'react-native-lock';
import Config from 'react-native-config';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import RNRestart from 'react-native-restart';
import { saveProfile } from '../LocalStore/StoreCreds';
import { MasterStyleSheet } from '../../style/MainStyles';

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
   
  }
  logIn = () => {
    this.lock.show({}, (err, profile, token) => {
      if (err) {
        console.error(err);
      }
      saveProfile(token.idToken, profile.identities[0].userId);
    });
  };

  render() {
    return (
      <View
        style={styles.container}
      >
        <Button
          icon={{ name: 'lock-outline' }}
          backgroundColor="#03A9F4"
          title="Login"
          buttonStyle={MasterStyleSheet.mainButtonStyle}
          onPress={() => this.logIn()}
        />
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
