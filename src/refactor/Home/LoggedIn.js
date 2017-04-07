import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { graphql, compose } from 'react-apollo';
import codePush from 'react-native-code-push';
import OneSignal from 'react-native-onesignal';
import RNCalendarEvents from 'react-native-calendar-events';
import UserHome from './UserHome';
import { acceptEstimate } from '../../graphql/mutations';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
});

class _LoggedIn extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }
  componentDidMount() {
    // codePush.sync();
    OneSignal.configure({});
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('registered', this.onRegistered);
    OneSignal.addEventListener('ids', this.onIds);
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
  }

  onOpened = (openResult) => {
    const customer = openResult.notification.payload.additionalData.customer;
    const action = openResult.notification.payload.additionalData.actionSelected;
    if (action === 'id1') {
      this.props.acceptEstimate({
        variables: {
          custid: customer,
          userid: 'getUserID()',
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
  render() {
    return (
      <UserHome
        id={this.props.profile}
      />
    );
  }
}
const mapStateToProps = state => ({
  profile: state.profile,
});

const LoggedIn = compose(
  connect(mapStateToProps, null),
  graphql(acceptEstimate, { name: 'acceptEstimate' }),
)(_LoggedIn);

export default LoggedIn;

