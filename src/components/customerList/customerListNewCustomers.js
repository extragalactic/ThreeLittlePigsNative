import React from 'react';
import DeviceInfo from 'react-native-device-info';
import { List, ListItem } from 'react-native-elements';
import { ScrollView, Text } from 'react-native';
import { Container, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';

import { MasterStyleSheet } from '../../style/MainStyles';
import CustomerDetailsIPadSurveyor from '../customerDetails/customerDetailsIPadSurveyor';

const selectCustomer = (selection) => {
  Actions.customerDetails({ selection });
};


class CustomerListNewCustomers extends React.Component {
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
                <List 
              
                >
                  {this.props.newCustomers.map((customer, idx) => (
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
                <CustomerDetailsIPadSurveyor
                  customerId={this.state.selection}
                  user={this.props.user}
                  submitFollowup={this.props.submitFollowup}
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
          {this.props.newCustomers.map((customer, idx) => (
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
export default CustomerListNewCustomers;
