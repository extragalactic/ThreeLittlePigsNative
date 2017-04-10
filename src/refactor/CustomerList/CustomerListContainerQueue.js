import React from 'react';
import DeviceInfo from 'react-native-device-info';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { ScrollView } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { MasterStyleSheet } from '../../style/MainStyles';
import CustomerDetailsContainer from '../../refactor/CustomerDetails/CustomerDetailsContainer';
import { getUserandCustomers, getQueue } from '../../graphql/queries';

class _CustomerListContainerQueue extends React.Component {
  static propTypes = {
    getMyCustomers: React.PropTypes.object,
    data: React.PropTypes.object,
    params: React.PropTypes.object,
    saveCustomer: React.PropTypes.func,
    id: React.PropTypes.string,
  }
  componentWillUnmount() {
    this.props.saveCustomer('');
  }
  setSelection = (selection) => {
    this.setState({ selection });
  }

  selectCustomer = (selection) => {
    this.props.saveCustomer(selection);
    Actions.customerDetailsContainer({ params: {
      customerId: selection,
      userid: this.props.id,
      type: 'queue',
    } });
  };
  render() {
    console.log('q', this)
    if (DeviceInfo.isTablet()) {
      return (
        <Grid>
          <Col style={MasterStyleSheet.ipadViewLeft}>
            <List>
              {this.props.data.getQueue ?
                this.props.data.getQueue.map((customer, idx) => (
                  <ListItem
                    containerStyle={MasterStyleSheet.customersListItem}
                    key={idx}
                    title={customer.address}
                    subtitle={`${customer.firstName} ${customer.lastName}`}
                    onPress={() => this.props.saveCustomer(customer.id)}
                  />),
              ) : null }
            </List>
          </Col>
          <Col style={MasterStyleSheet.ipadViewRight}>
            <CustomerDetailsContainer
              params={{ customerId: this.props.currentCustomer, type: 'queue' }} //params
              userid={this.props.id}
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
          {this.props.data.getQueue ?
            this.props.data.getQueue.map((customer, idx) => (
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

const mapStateToProps = state => ({
  currentCustomer: state.currentCustomer,
});

const mapActionsToProps = dispatch => ({
  saveCustomer(currentCustomer) {
    dispatch({ type: 'SAVE_CUSTOMER', payload: currentCustomer });
  },
});

const CustomerListContainerQueue = compose(
  graphql(getUserandCustomers, {
    options: ({ params }) => ({ variables: { id: params.id }, pollInterval: 2000 }),
  }),
   graphql(getQueue, {
     options: { pollInterval: 1000 },
    }),
   connect(mapStateToProps, mapActionsToProps),
)(_CustomerListContainerQueue);

export default CustomerListContainerQueue;
