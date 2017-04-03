import React, { Component } from 'react';
import Auth0Lock from 'react-native-lock';
import Config from 'react-native-config';
import { connect } from 'react-redux';
import { authInit, saveProfile, getUserID } from '../../Realm/authRealm';

import LoggedIn from './LoggedIn';
import NoLogin from './NoLogin';

class _Home extends Component {
  static defaultProps = {
    profile: React.PropTypes.object,
    saveProfile: React.PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
    };
    this.lock = new Auth0Lock({ clientId: Config.AUTH0_ID, domain: Config.AUTH0_DOMAIN }, {});
  }
  componentDidMount() {
  }
  render() {
    console.log(getUserID())
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
