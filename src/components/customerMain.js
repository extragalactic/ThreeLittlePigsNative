import React from 'react';
import { View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import { MasterStyleSheet } from '../style/MainStyles';

const selectNewCustomer = () => {
  Actions.customerListNewCustomers();
};

const selectFollowUp = () => {
  Actions.customerListFollowUp();
};

const selectOnsite = () => {
  Actions.customerListOnsite();
};

const selectSurveyinProgress = () => {
  Actions.customerListsurveyinProgress();
};

const selectSurveyComplete = () => {
  Actions.customerListsurveyComplete();
};

const selectEstimateQueue = () => {
  Actions.customerListQueue();
};

const selectMyEstimates = () => {
  Actions.customerListMyEstimates();
};

const CustomerMain = ({ user, newCustomers, followUp, onSite, surveyinProgress, surveyComplete, myEstimates, myCustomers }) => (
  <View style={MasterStyleSheet.mainListView}>
    <List>
      <ListItem
        hideChevron
        title={'New Customers'}
        badge={{ value: myCustomers.newcustomers.length, badgeTextStyle: { color: 'lightblue' }, badgeContainerStyle: { marginTop: -1 } }}
        onPress={selectNewCustomer}
        containerStyle={MasterStyleSheet.mainList}
      />
      <ListItem
        hideChevron
        title='Customers to followup'
        badge={{ value: myCustomers.followup.length, badgeTextStyle: { color: 'lightblue' }, badgeContainerStyle: { marginTop: -1 } }}
        onPress={selectFollowUp}
        containerStyle={MasterStyleSheet.mainList}     
      />
      <ListItem
        hideChevron	
        title='Onsite Appointments'
        badge={{ value: myCustomers.onsite.length, badgeTextStyle: { color: 'lightblue' }, badgeContainerStyle: { marginTop: -1 } }}
        onPress={selectOnsite}
        containerStyle={MasterStyleSheet.mainList}     
      />
      <ListItem
        hideChevron
        title='Survey in progress'
        badge={{ value: myCustomers.inprogress.length, badgeTextStyle: { color: 'lightblue' }, badgeContainerStyle: { marginTop: -1 } }}
        onPress={selectSurveyinProgress}
        containerStyle={MasterStyleSheet.mainList}     
      />
      <ListItem
        hideChevron	
        title='Survey complete'
        badge={{ value: myCustomers.surveycomplete.length, badgeTextStyle: { color: 'lightblue' }, badgeContainerStyle: { marginTop: -1 } }}
        containerStyle={MasterStyleSheet.mainList}
        onPress={selectSurveyComplete}
      />
      <ListItem
        hideChevron	
        title='Estimate Queue'
        badge={{ value: 0, badgeTextStyle: { color: 'lightblue' }, badgeContainerStyle: { marginTop: -1 } }}
        containerStyle={MasterStyleSheet.mainList}
        onPress={selectEstimateQueue}
      />
      <ListItem
        hideChevron
        title='My Estimates'
        badge={{ value: myCustomers.myestimates.length, badgeTextStyle: { color: 'lightblue' }, badgeContainerStyle: { marginTop: -1 } }}
        containerStyle={MasterStyleSheet.mainList}
        onPress={selectMyEstimates}
      />
      <ListItem
        hideChevron
        title='Sent Estimates'
        badge={{ value: myEstimates.length, badgeTextStyle: { color: 'lightblue' }, badgeContainerStyle: { marginTop: -1 } }}
        containerStyle={MasterStyleSheet.mainList}
        onPress={selectMyEstimates}
      />
      <ListItem
        hideChevron
        title='Work Orders'
        badge={{ value: 0, badgeTextStyle: { color: 'lightblue' }, badgeContainerStyle: { marginTop: -1 } }}
        containerStyle={MasterStyleSheet.mainList}
      />
      <ListItem
        hideChevron
        title='Jobs in Progress'
        badge={{ value: 0, badgeTextStyle: { color: 'lightblue' }, badgeContainerStyle: { marginTop: -1 } }}
        containerStyle={MasterStyleSheet.mainList}
      />
      <ListItem
        hideChevron
        title='Billing'
        badge={{ value: 0, badgeTextStyle: { color: 'lightblue' }, badgeContainerStyle: { marginTop: -1 } }}
        containerStyle={MasterStyleSheet.mainList}
      />
    </List>
  </View>
    );

export default CustomerMain;



/*
    <List containerStyle={{ marginTop: 65 }}>
      {user.newCustomers.map((customer, idx) => (
        <ListItem
          containerStyle={{height: 80, borderTopWidth: 2, borderBottomWidth: 1 }}
          key={idx}
          title={customer.address}
          subtitle={`${customer.firstName} ${customer.lastName}`}
          onPress={selectCustomer.bind(this, customer.id)}
        />),
            )}
    </List>
     <ListItem
        hideChevron	
        title='My Estimates'
        badge={{ value: 0, badgeTextStyle: { color: 'lightblue' }, badgeContainerStyle: { marginTop: -1 } }}
      />
      <ListItem
      hideChevron	
        title='Completed Estimates'
        badge={{ value: 0, badgeTextStyle: { color: 'lightblue' }, badgeContainerStyle: { marginTop: -1 } }}
      />
 



*/