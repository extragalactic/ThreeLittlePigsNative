import React, { Component } from 'react';
import Auth0Lock from 'react-native-lock';
import store from 'react-native-simple-store';
import Config from 'react-native-config';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import codePush from 'react-native-code-push';

import { getUserQuery } from '../graphql/queries';
import RNCalendarEvents from '../../node_modules/react-native-calendar-events/index.ios';

import {
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
    };
  }

  componentDidMount() {
   codePush.sync();
    this.props.getUser({
      variables : {
        id: '5852eb3ec6e9650100965f2e',
      },
    }).then((data) => {
      console.log('USER', data)
      this.setState({
        user: data.data.getUser
      });
        const newCustomers = data.data.getUser.newCustomers.filter((customer) => {
          if(customer.status === 0){
            return customer;
          }
        })
       const followUp = data.data.getUser.newCustomers.filter((customer) => {
          if(customer.status === 1 ){
            return customer;
          }
        })
       const onSite = data.data.getUser.newCustomers.filter((customer) => {
          if(customer.status === 2 ){
            return customer;
          }
        })
         const surveyinProgress = data.data.getUser.newCustomers.filter((customer) => {
          if(customer.status === 3 ){
            return customer;
          }
        })
        this.setState({newCustomers})
        this.setState({followUp})
        this.setState({onSite})
        this.setState({surveyinProgress})

    });    /*
    this.loggedIn().then((result) => {
      if (result === false) {
        this.logIn();
      }
    });
      */
    RNCalendarEvents.authorizeEventStore()
     .then(status => {
       console.log(status);
     })
     .catch(error => {
      console.error(error);
     });

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
    console.log(id)
    this.props.getUser({variables: {
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

  render() {  console.log(Config)
    return (
      <Main
        logout={this.logOut}
        //profile={this.props.profile}
        updateUser={this.updateUser}
        getProfile={this.props.saveProfile}
        getCustomer={this.props.getCustomer}
        updateCustomer={this.props.updateCustomer}
        getUser={this.props.getUser}
        submitFollowup={this.props.submitFollowup}
        addNotes={this.props.addNotes}
        getAppointmentsforDay={this.props.getAppointmentsforDay}
        deleteAppointment={this.props.deleteAppointment}
        data={this.props.data}
        user={this.state.user}
        newCustomers={this.state.newCustomers}
        followUp={this.state.followUp}
        onSite={this.state.onSite}
        surveyinProgress={this.state.surveyinProgress}
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
  graphql(deleteAppointment, { name: 'deleteAppointment' }),
  graphql(getCustomer, { name: 'getCustomer' }),
  graphql(addNotes, { name: 'addNotes' }),
  graphql(updateCustomer, { name: 'updateCustomer' }),
  graphql(submitFollowup, { name: 'submitFollowup' }),
  graphql(getAppointmentsforDay, { name: 'getAppointmentsforDay' }),
  graphql(getUserQuery, { options: { pollInterval: 1000 } }),
  connect(mapStateToProps, mapActionsToProps),
)(_Root);

Root = codePush(Root);
export default Root;

