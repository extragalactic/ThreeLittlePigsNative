import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
} from 'react-native';

import { graphql, compose } from 'react-apollo';

import {
  Tabs,
  Tab,
  Icon,
} from 'react-native-elements';

import Customers from '../containers/Customers';
import Surveys from '../containers/Surveys';
import Home from '../refactor/Home/Home';

let styles = {};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      loggedIn: false,
      selectedTab: 'home',
      customerSelection: '',
    };
    this.changeTab = this.changeTab.bind(this);
  }
  componentDidMount() {

  }
  changeTab(selectedTab) {
    this.setState({
      selectedTab,
    });
  }
  render() {
    const { selectedTab } = this.state;
    const { toggleSideMenu } = this.props;
    return (
      <Tabs>
        <Tab
          selectedTitleStyle={[styles.titleSelected, { marginTop: -3, marginBottom: 7 }]}
          selected={selectedTab === 'home'}
          title={selectedTab === 'home' ? 'HOME' : null}
          renderIcon={() => <Icon name="home" size={26} />}
          renderSelectedIcon={() => <Icon name="home" size={26} />}
          onPress={() => this.changeTab('home')}
        >
          <Home toggleSideMenu={toggleSideMenu} user={this.props.user} />
        </Tab>
        <Tab
          tabStyle={selectedTab !== 'customers' && { marginBottom: -6 }}
          titleStyle={[styles.titleStyle, { marginTop: -1 }]}
          selectedTitleStyle={[styles.titleSelected, { marginTop: -3, marginBottom: 7 }]}
          selected={selectedTab === 'customers'}
          title={selectedTab === 'customers' ? 'CUSTOMERS' : null}
          renderIcon={() => <Icon style={{ paddingBottom: 4 }} name="person" size={26} />}
          renderSelectedIcon={() => <Icon name="person" size={26} />}
          onPress={() => this.changeTab('customers')}
        >
          <Customers
            user={this.props.user}
            myCustomers={this.props.myCustomers}
            userID={this.props.userID}
            getCustomer={this.props.getCustomer}
            submitFollowup={this.props.submitFollowup}
            getAppointmentsforDay={this.props.getAppointmentsforDay}
            updateCustomer={this.props.updateCustomer}
            addNotes={this.props.addNotes}
            deleteAppointment={this.props.deleteAppointment}
            getUser={this.props.getUser}
            updateUser={this.props.updateUser}
            acceptEstimate={this.props.acceptEstimate}
            myEstimates={this.props.myEstimates}
          />
        </Tab>
        <Tab
          tabStyle={selectedTab !== 'search' && { marginBottom: -6 }}
          titleStyle={[styles.titleStyle, { marginTop: -1 }]}
          selectedTitleStyle={[styles.titleSelected, { marginTop: -3, marginBottom: 7 }]}
          selected={selectedTab === 'search'}
          title={selectedTab === 'search' ? 'SEARCH' : null}
          renderIcon={() => <Icon style={{ paddingBottom: 4 }} name="search" size={26} />}
          renderSelectedIcon={() => <Icon name="search" size={26} />}
          onPress={() => this.changeTab('search')}
        >
          <Surveys
            myCustomers={this.props.myCustomers}

          />
        </Tab>
        <Tab
          tabStyle={selectedTab !== 'logout' && { marginBottom: -6 }}
          titleStyle={[styles.titleStyle, { marginTop: -2 }]}
          selectedTitleStyle={[styles.titleSelected, { marginTop: -3, marginBottom: 7 }]}
          selected={selectedTab === 'logout'}
          title={selectedTab === 'logout' ? 'LOGOUT' : null}
          renderIcon={() => <Icon style={{ paddingBottom: 4 }} name="exit-to-app" size={26} />}
          renderSelectedIcon={() => <Icon name="exit-to-app" size={26} />}
          onPress={() => this.props.logout()}
        >
          Logout
        </Tab>
      </Tabs>
    );
  }
}

styles = StyleSheet.create({
  titleStyle: {
    ...Platform.select({
      ios: {
        fontFamily: 'Cochin',
      },
    }),
  },
});


export default Main;

