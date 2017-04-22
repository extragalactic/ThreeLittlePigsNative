import React from 'react';
import { View, ScrollView } from 'react-native';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { SearchBar, Button, List, ListItem } from 'react-native-elements';
import { Col, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import { MasterStyleSheet } from '../../style/MainStyles';
import CustomerDetailsContainer from '../../refactor/CustomerDetails/CustomerDetailsContainer';
import searchStyles from '../Style/searchStyle';
import { searchCustomer } from '../../graphql/mutations';

class _SearchContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      customers: [],
    };
  }

  componentWillUnmount() {
    this.props.saveCustomer('');
  }

  onSearchInputChange = (searchTerm) => {
    this.props.searchCustomer({
      variables: {
        searchTerm,
      },
    })
    .then((customers) => {
      this.setState({
        customers: customers.data.searchCustomer,
      });
    });
  }
  selectCustomer = (selection) => {
    this.props.saveCustomer(selection);
    Actions.customerDetailsContainer({ params: { type: 'search', customerId: selection, userid: this.props.id } });
  };

  render() {
    if (DeviceInfo.isTablet()) {
      return (
        <Grid>
          <Col style={MasterStyleSheet.ipadViewLeft}>
            <SearchBar
              containerStyle={{
                marginTop: 15,
              }}
              lightTheme
              onChangeText={text => this.onSearchInputChange(text)}
              placeholder="Type Here..."
            />

            <List>
              {this.state.customers ?
                this.state.customers.map((customer, idx) => (
                  <ListItem
                    containerStyle={searchStyles.customersListItem}
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
              params={{
                customerId: this.props.currentCustomer,
                type: 'search' }} // params
              userid={this.props.id}
            />
          </Col>
        </Grid>
      );
    }
    return (
      <View
        style={searchStyles.standardView}
      >
        <SearchBar
          lightTheme
          onChangeText={text => this.onSearchInputChange(text)}
          placeholder="Type Here..."
        />

        <ScrollView
          style={MasterStyleSheet.list}
        >
          <List >
            {this.state.customers ?
            this.state.customers.map((customer, idx) => (
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
      </View>
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

const SearchContainer = compose(
  graphql(searchCustomer, { name: 'searchCustomer' }),
  connect(mapStateToProps, mapActionsToProps),
)(_SearchContainer);

export default SearchContainer;


/*

  <SearchBar
          lightTheme
          onChangeText={text => this.onSearchInputChange(text)}
          placeholder='Type Here...'
        />

        <Button
          title={'test'}
          onPress={() => console.log(this)}
        />

*/
