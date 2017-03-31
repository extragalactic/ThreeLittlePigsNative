import React from 'react';
import DeviceInfo from 'react-native-device-info';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { ScrollView, Text } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';

import { MasterStyleSheet } from '../../style/MainStyles';
import CustomerDetailsIPadSurveyor from '../customerDetails/customerDetailsIPadSurveyor';
import { getUserandCustomers } from '../../graphql/queries';
import {
   submitFollowup,
   getAppointmentsforDay,
   updateCustomer,
   addNotes,
   deleteAppointment } from '../../graphql/mutations';

class _CustomerListNewCustomers extends React.Component {
  static defaultProps = {
    currentCustomer: React.PropTypes.object,
    saveCustomer: React.PropTypes.func,
  }
  constructor() {
    super();
    this.state = {
      selection: '',
    };
  }

  setSelection = (selection) => {
    console.log(selection);
    this.setState({ selection });
    //this.props.saveCustomer(selection);
  }

  selectCustomer = (selection) => {
   // this.props.saveCustomer(selection);
    Actions.customerDetails({ selection });
  };

  render() {
    console.log('newcustomer', this.props)
    if (DeviceInfo.isTablet()) {
      return (
        <Grid>
          <Col style={MasterStyleSheet.ipadViewLeft}>
            <List>
              {this.props.data.getMyCustomers ? this.props.data.getMyCustomers.newcustomers.map((customer, idx) => (
                <ListItem
                  containerStyle={MasterStyleSheet.customersListItem}
                  key={idx}
                  title={customer.address}
                  subtitle={`${customer.firstName} ${customer.lastName}`}
                  onPress={() => this.setSelection(customer.id)}

                />),
              ) : null }
            </List>
          </Col>
          <Col style={MasterStyleSheet.ipadViewRight}>
            <CustomerDetailsIPadSurveyor
              myCustomers={this.props.data.getMyCustomers}
              customerId={this.state.selection}
              user={this.props.data.user}
              userid={this.props.id}
              submitFollowup={this.props.submitFollowup}
              updateCustomer={this.props.updateCustomer}
              getAppointmentsforDay={this.props.getAppointmentsforDay}
              addNotes={this.props.addNotes}
              updateUser={this.props.updateUser}
              deleteAppointment={this.props.deleteAppointment}
            />
          </Col>
        </Grid>
      );
    }
    return (
      <ScrollView
        style={MasterStyleSheet.list}
      >
        <List >
          {this.props.data.getMyCustomers ? this.props.data.getMyCustomers.newcustomers.map((customer, idx) => (
            <ListItem
              containerStyle={MasterStyleSheet.customersListItem}
              key={idx}
              title={customer.address}
              subtitle={`${customer.firstName} ${customer.lastName}`}
              onPress={() => this.selectCustomer(customer.id)}
            />),
              ) : null}
        </List>
      </ScrollView>
    );
  }
}

const mapActionsToProps = dispatch => ({
  saveCustomer(currentCustomer) {
    dispatch({ type: 'SAVE_CUSTOMER', payload: currentCustomer });
  },
});

const CustomerListNewCustomers = compose(
  graphql(getUserandCustomers, {
    options: ({ id }) => ({ variables: { id }, pollInterval: 1000 }),
  }),
   graphql(submitFollowup, { name: 'submitFollowup' }),
   graphql(updateCustomer, { name: 'updateCustomer' }),
   graphql(getAppointmentsforDay, { name: 'getAppointmentsforDay' }),
   graphql(addNotes, { name: 'addNotes' }),
   graphql(deleteAppointment, { name: 'deleteAppointment' }),
   connect(null, mapActionsToProps),
)(_CustomerListNewCustomers);

export default CustomerListNewCustomers;
