import React, { Component } from 'react';
import { Text } from 'react-native';
import Auth0Lock from 'react-native-lock';
import store from 'react-native-simple-store';
import Config from 'react-native-config';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import codePush from 'react-native-code-push';
import OneSignal from 'react-native-onesignal';
import RNCalendarEvents from 'react-native-calendar-events';
import RNRestart from 'react-native-restart';
import { getUserandCustomers } from '../graphql/queries';
import { authInit, saveProfile, getUserID } from '../Realm/authRealm';

import {
   acceptEstimate,
   getCustomer,
   submitFollowup,
   getAppointmentsforDay,
   updateCustomer,
   addNotes,
   deleteAppointment,
   getUser,
  } from '../graphql/mutations';
import Main from './Main';

class _Root extends Component {
  static defaultProps = {
    profile: React.PropTypes.object,
    saveProfile: React.PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.lock = new Auth0Lock({ clientId: Config.AUTH0_ID, domain: Config.AUTH0_DOMAIN }, {});
  }
  componentDidMount() {
    if (!authInit()) {
      this.logIn();
    }
    this.props.saveProfile(getUserID());

    codePush.sync();
    OneSignal.configure({});
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('registered', this.onRegistered);
    OneSignal.addEventListener('ids', this.onIds);

    if (authInit()) {
      /*
      setTimeout(() => {
        OneSignal.sendTags({
          userid: this.props.data.user._id,
          username: `${this.props.data.user.firstName}${this.props.data.user.lastName}`,
          estimator: this.props.data.user.estimator,
          surveyor: this.props.data.user.surveyor,
        });
      }, 2000); */
    }
    RNCalendarEvents.authorizeEventStore()
     .then((status) => {
      // console.log(status);
     })
     .catch((error) => {
       console.error(error);
     });
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('registered', this.onRegistered);
    OneSignal.removeEventListener('ids', this.onIds);
  }
  onReceived = (notification) => {
  }

  onOpened = (openResult) => {
    const customer = openResult.notification.payload.additionalData.customer;
    const action = openResult.notification.payload.additionalData.actionSelected;
    if (action === 'id1') {
      this.props.acceptEstimate({
        variables: {
          custid: customer,
          userid: getUserID(),
        },
      });
    }
  }

  onRegistered = (notifData) => {
   // console.log("Device had been registered for push notifications!", notifData);
  }

  onIds = (device) => {
   // console.log('Device info: ', device);
  }

  logIn = () => {
   // console.log('logging in');
    this.lock.show({}, (err, profile, token) => {
      if (err) {
        console.error(err);
      } else {
        saveProfile(profile, token);
        RNRestart.Restart();
      }
    });
  };

  logOut = () => {
    this.logIn();
  };

  render() {
    if (authInit()) {
      return (
        <Main
          getCustomer={this.props.getCustomer}
          updateCustomer={this.props.updateCustomer}
          getUser={this.props.getUser}
          submitFollowup={this.props.submitFollowup}
          addNotes={this.props.addNotes}
          getAppointmentsforDay={this.props.getAppointmentsforDay}
          deleteAppointment={this.props.deleteAppointment}
          acceptEstimate={this.props.acceptEstimate}
          userID={this.props.profile}
        />
      );
    }
    return <Text> Spinner</Text>;
  }
}
const mapActionsToProps = dispatch => ({
  saveProfile(profile) {
    dispatch({ type: 'SAVE_PROFILE', payload: profile });
  },
});

const mapStateToProps = state => ({
  profile: state.profile,
});

let Root = compose(
  graphql(getUser, { name: 'getUser' }),
  graphql(acceptEstimate, { name: 'acceptEstimate' }),
  graphql(deleteAppointment, { name: 'deleteAppointment' }),
  graphql(getCustomer, { name: 'getCustomer' }),
  graphql(addNotes, { name: 'addNotes' }),
  graphql(updateCustomer, { name: 'updateCustomer' }),
  graphql(submitFollowup, { name: 'submitFollowup' }),
  graphql(getAppointmentsforDay, { name: 'getAppointmentsforDay' }),
  connect(mapStateToProps, mapActionsToProps),
)(_Root);

export default Root = codePush(Root);
