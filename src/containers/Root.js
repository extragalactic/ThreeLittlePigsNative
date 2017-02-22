import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import Auth0Lock from 'react-native-lock';
import store from 'react-native-simple-store';
import Config from 'react-native-config';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import codePush from 'react-native-code-push';
import OneSignal from 'react-native-onesignal';
import RNCalendarEvents from 'react-native-calendar-events';
import { getUserQuery, getMyCustomers } from '../graphql/queries';
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
import { isTokenExpired } from '../Utils/jwtHelper';

const window = Dimensions.get('window');

class _Root extends Component {
  static defaultProps = {
    profile: React.PropTypes.object,
    saveProfile: React.PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.lock = new Auth0Lock({ clientId: Config.AUTH0_ID, domain: Config.AUTH0_DOMAIN }, {});
    this.state = {
      user: {},
      newCustomers: [],
      followUp: [],
      onSite: [],
      surveyinProgress: [],
      surveyComplete: [],
      myEstimates: [],
      dimensions: window,
    };
  }

  componentDidMount() {
    console.log(this)
    this.props.data.refetch({
      options: {
        pollInterval: 1000,
      },
    });
    OneSignal.configure({});
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('registered', this.onRegistered);
    OneSignal.addEventListener('ids', this.onIds);
    this.props.getUser({
      variables: {
        id: '5852eb3ec6e9650100965f2e',
      },
    }).then((data) => {
      if (data.data.getUser.estimator) {
        OneSignal.sendTag('estimator', 'true');
      }
      this.setState({
        user: data.data.getUser,
      });

        const newCustomers = data.data.getUser.newCustomers.filter((customer) => {
          if (customer.status === 0) {
            return customer;
          }
        });
        const followUp = data.data.getUser.newCustomers.filter((customer) => {
          if (customer.status === 1) {
            return customer;
          }
        });
        const onSite = data.data.getUser.newCustomers.filter((customer) => {
          if (customer.status === 2) {
            return customer;
          }
        });
        const surveyinProgress = data.data.getUser.newCustomers.filter((customer) => {
          if (customer.status === 3) {
            return customer;
          }
        });
        const surveyComplete = data.data.getUser.newCustomers.filter((customer) => {
          if (customer.status === 4) {
            return customer;
          }
        });
        const myEstimates = data.data.getUser.estimates.filter((customer) => {
          if (customer.status === 6) {
            return customer;
          }
        });
        this.setState({ newCustomers });
        this.setState({ followUp });
        this.setState({ onSite });
        this.setState({ surveyinProgress });
        this.setState({ surveyComplete });
        this.setState({ myEstimates });
    
    });    /*
    this.loggedIn().then((result) => {
      if (result === false) {
        this.logIn();
      }
    });
      */
    RNCalendarEvents.authorizeEventStore()
     .then((status) => {
       console.log(status);
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
   // console.log("Notification received: ", notification);
  }

  onOpened = (openResult) => {
    const customer = openResult.notification.payload.additionalData.customer;
    const action = openResult.notification.payload.additionalData.actionSelected;
    // console.log(customer, action);

    if (action === 'id1') {
      this.props.acceptEstimate({
        variables: {
          custid: customer,
          userid: this.state.user._id,
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


  loggedIn = () => (
    store.get('token')
      .then((data) => {
        if (data === null) {
          return false;
        }
        const token = data.token.idToken;
        return !!token && !isTokenExpired(token);
      })
  );

  logIn = () => {
    this.lock.show({}, (err, profile, token) => {
      if (err) {
        console.error(err);
      } else {
        store.save('token', { token, profile });
        this.props.saveProfile(profile);
        this.props.data.refetch({
          id: profile.identities[0].userId,
        });
      }
    });
  };
  updateUser = (id) => {
    this.props.getUser({ variables: {
      id,
    } }).then((data) => {
      this.setState({
        user: data.data.getUser,
      });
    });
  }
  logOut = () => {
    store.delete('token');
    this.logIn();
  };

  render() {
    console.log(this.props.data.getMyCustomers)
    return (
      <Main
        logout={this.logOut}
        // profile={this.props.profile}
        updateUser={this.updateUser}
        getProfile={this.props.saveProfile}
        getCustomer={this.props.getCustomer}
        updateCustomer={this.props.updateCustomer}
        getUser={this.props.getUser}
        submitFollowup={this.props.submitFollowup}
        addNotes={this.props.addNotes}
        getAppointmentsforDay={this.props.getAppointmentsforDay}
        deleteAppointment={this.props.deleteAppointment}
        acceptEstimate={this.props.acceptEstimate}
        data={this.props.data}
        user={this.state.user}
        newCustomers={this.state.newCustomers}
        followUp={this.state.followUp}
        onSite={this.state.onSite}
        myEstimates={this.state.myEstimates}
        surveyinProgress={this.state.surveyinProgress}
        surveyComplete={this.state.surveyComplete}
        dimensions={this.state.dimensions}
        myCustomers={this.props.data.getMyCustomers}
      />
    );
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

const Root = compose(
  graphql(getUser, { name: 'getUser' }),
  graphql(acceptEstimate, { name: 'acceptEstimate' }),
  graphql(deleteAppointment, { name: 'deleteAppointment' }),
  graphql(getCustomer, { name: 'getCustomer' }),
  graphql(addNotes, { name: 'addNotes' }),
  graphql(updateCustomer, { name: 'updateCustomer' }),
  graphql(submitFollowup, { name: 'submitFollowup' }),
  graphql(getAppointmentsforDay, { name: 'getAppointmentsforDay' }),
  graphql(getUserQuery, { options: { pollInterval: 1000 } }),
  graphql(getMyCustomers, {
    options: ({ userId }) => ({ variables: { id: userId }, pollInterval: 1000 }),
  }),
  connect(mapStateToProps, mapActionsToProps),
)(_Root);

Root = codePush(Root);
export default Root;

/*
getMyCustomers
userId
*/
