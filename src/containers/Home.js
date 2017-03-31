import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Auth0Lock from 'react-native-lock';
import Config from 'react-native-config';
import Spinner from 'react-native-spinkit';
import { connect } from 'react-redux';
import { MasterStyleSheet } from '../style/MainStyles';
import { authInit, saveProfile, getUserID } from '../Realm/authRealm';

import LoggedIn from '../refactor/Home/LoggedIn';
import NoLogin from '../refactor/Home/NoLogin'; 


class _Home extends Component {
  static defaultProps = {
    profile: React.PropTypes.object,
    saveProfile: React.PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.lock = new Auth0Lock({ clientId: Config.AUTH0_ID, domain: Config.AUTH0_DOMAIN }, {});
  }
  componentDidMount() {
    if (authInit()) {
       this.props.saveProfile(getUserID());
    }
  }
  render() {
    if (authInit()) {
      return (
        <LoggedIn />
      );
    }
    return (
      <NoLogin />
    );
  }
}

const mapActionsToProps = dispatch => ({
  saveProfile(profile) {
    dispatch({ type: 'SAVE_PROFILE', payload: profile });
  },
});

const Home = connect(null, mapActionsToProps)(_Home);

export default Home;
