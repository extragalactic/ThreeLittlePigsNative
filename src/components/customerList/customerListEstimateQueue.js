import React from 'react';
import DeviceInfo from 'react-native-device-info';
import { List, ListItem } from 'react-native-elements';
import { ScrollView, Text } from 'react-native';
import { Container, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { graphql, compose } from 'react-apollo';

import { MasterStyleSheet } from '../../style/MainStyles';
import CustomerDetailsIPadQueue from '../customerDetails/customerDetailsIPadQueue';
import { getMyCustomers, getQueue } from '../../graphql/queries';


const selectCustomer = (selection) => {
  Actions.customerDetails({ selection });
};


class _CustomerListEstimateQueue extends React.Component {
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
        <Container>
          <Content>
            <Grid>
              <Col style={MasterStyleSheet.ipadViewLeft}>
                <List >
                  {this.props.data.getQueue.map((customer, idx) => (
                    <ListItem
                      containerStyle={MasterStyleSheet.customersListItem}
                      key={idx}
                      title={customer.address}
                      subtitle={`${customer.firstName} ${customer.lastName}`}
                      onPress={this.setSelection.bind(this, customer.id)}
                    />),
              )}
                </List>
              </Col>
              <Col style={MasterStyleSheet.ipadViewRight}>
                <CustomerDetailsIPadQueue
                  myCustomers={this.props.data.getQueue}
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
          </Content>
        </Container>
      );
    }
    return (
      <ScrollView
        style={MasterStyleSheet.list}
      >
        <List >
          {this.props.data.getQueue.map((customer, idx) => (
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
const CustomerListEstimateQueue = compose(
  graphql(getQueue, {
    options: { pollInterval: 1000 },
  }),
)(_CustomerListEstimateQueue);

export default CustomerListEstimateQueue;