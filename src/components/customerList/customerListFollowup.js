import React from 'react';
import DeviceInfo from 'react-native-device-info';
import { List, ListItem } from 'react-native-elements';
import { ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { graphql, compose } from 'react-apollo';

import { MasterStyleSheet } from '../../style/MainStyles';
import CustomerDetailsIPadSurveyor from '../customerDetails/customerDetailsIPadSurveyor';
import { getUserandCustomers } from '../../graphql/queries';
import {
   submitFollowup,
   getAppointmentsforDay,
   updateCustomer,
   addNotes,
   deleteAppointment } from '../../graphql/mutations';

const selectCustomer = (selection) => {
  Actions.customerDetails({ selection });
};


class _CustomerListFollowup extends React.Component {
  constructor() {
    super();
    this.state = {
      selection: '',
    };
  }

  setSelection = (selection) => {
    this.setState({ selection });
  }
  render() {
    if (DeviceInfo.isTablet()) {
      return (
        <Grid>
          <Col style={MasterStyleSheet.ipadViewLeft}>
            <List >
              {this.props.data.getMyCustomers.followup.map((customer, idx) => (
                <ListItem
                  containerStyle={MasterStyleSheet.customersListItem}
                  key={idx}
                  title={customer.address}
                  subtitle={`${customer.firstName} ${customer.lastName}`}
                  onPress={() => this.setSelection(customer.id)}
                />),
              )}
            </List>
          </Col>
          <Col style={MasterStyleSheet.ipadViewRight}>
            <CustomerDetailsIPadSurveyor
              myCustomers={this.props.data.getMyCustomers}
              customerId={this.state.selection}
              user={this.props.data.user}
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
          {this.props.data.getMyCustomers.followup.map((customer, idx) => (
            <ListItem
              containerStyle={MasterStyleSheet.customersListItem}
              key={idx}
              title={customer.address}
              subtitle={`${customer.firstName} ${customer.lastName}`}
              onPress={() => selectCustomer(customer.id)}
            />),
              )}
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

const CustomerListFollowup = compose(
  graphql(getUserandCustomers, {
    options: ({ id }) => ({ variables: { id }, pollInterval: 1000 }),
  }),
   graphql(submitFollowup, { name: 'submitFollowup' }),
   graphql(updateCustomer, { name: 'updateCustomer' }),
   graphql(getAppointmentsforDay, { name: 'getAppointmentsforDay' }),
   graphql(addNotes, { name: 'addNotes' }),
   graphql(deleteAppointment, { name: 'deleteAppointment' }),
   connect(null, mapActionsToProps),
)(_CustomerListFollowup);

export default CustomerListFollowup;



