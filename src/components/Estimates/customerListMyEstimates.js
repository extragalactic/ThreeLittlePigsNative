import React from 'react';
import DeviceInfo from 'react-native-device-info';
import { List, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { graphql, compose } from 'react-apollo';

import { MasterStyleSheet } from '../../style/MainStyles';
import CustomerDetailsIPadEstimator from '../Estimates/customerDetailsIPadEstimator';
import { getUserandCustomers } from '../../graphql/queries';
import {
   submitFollowup,
   getAppointmentsforDay,
   updateCustomer,
   addNotes,
   deleteAppointment } from '../../graphql/mutations';
const selectCustomer = (selection) => {
  Actions.customerDetailsEstimator({ selection });
};


class _CustomerListMyEstimates extends React.Component {
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
            <ScrollView>
              <List >
                {this.props.data.getMyCustomers.myestimates.map((customer, idx) => (
                  <ListItem
                    containerStyle={MasterStyleSheet.customersListItem}
                    key={idx}
                    title={customer.address}
                    subtitle={`${customer.firstName} ${customer.lastName}`}
                    onPress={this.setSelection.bind(this, customer.id)}
                  />),
              )}
              </List>
            </ScrollView>
          </Col>
          <Col style={MasterStyleSheet.ipadViewRight}>
            <CustomerDetailsIPadEstimator
              myCustomers={this.props.data.getMyCustomers}
              customerId={this.state.selection}
              selection={this.state.selection}
              user={this.props.user}
              acceptEstimate={this.props.acceptEstimate}
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
          {this.props.data.getMyCustomers.myestimates.map((customer, idx) => (
            <ListItem
              containerStyle={MasterStyleSheet.customersListItem}
              key={idx}
              title={customer.address}
              subtitle={`${customer.firstName} ${customer.lastName}`}
              onPress={selectCustomer.bind(this, customer.id)}
            />),
              )}
        </List>
      </ScrollView>
    );
  }
}

const CustomerListMyEstimates = compose(
  graphql(getUserandCustomers, {
    options: ({ id }) => ({ variables: { id }, pollInterval: 1000 }),
  }),
   graphql(submitFollowup, { name: 'submitFollowup' }),
   graphql(updateCustomer, { name: 'updateCustomer' }),
   graphql(getAppointmentsforDay, { name: 'getAppointmentsforDay' }),
   graphql(addNotes, { name: 'addNotes' }),
   graphql(deleteAppointment, { name: 'deleteAppointment' }),
)(_CustomerListMyEstimates);

export default CustomerListMyEstimates;
