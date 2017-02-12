import React from 'react';
import { View, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

const selectCustomer = (selection) => {
  Actions.customerDetails({ selection });
};

const CustomerListNewCustomers = ({ newCustomers }) => (
  <View style={{top: 15}}>
     <List containerStyle={{ marginTop: 65 }}>
      {newCustomers.map((customer, idx) => (
        <ListItem
          containerStyle={{height: 80, borderTopWidth: 2, borderBottomWidth: 1 }}
          key={idx}
          title={customer.address}
          subtitle={`${customer.firstName} ${customer.lastName}`}
          onPress={selectCustomer.bind(this, customer.id)}
        />),
            )}
    </List>
  </View>
    );

export default CustomerListNewCustomers;
