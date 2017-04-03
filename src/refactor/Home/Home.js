import React, { Component, PropTypes } from 'react';
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
  }
  componentDidMount() {
  }
  render() {
    if (authInit()) {
      return (
        <LoggedIn
          id={this.props.id}
        />
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
