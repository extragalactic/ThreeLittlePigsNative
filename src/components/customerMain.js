import React from 'react';
import { View, Text } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { graphql, compose } from 'react-apollo';

import { MasterStyleSheet } from '../style/MainStyles';
import { getMyCustomers, getUserandCustomers } from '../graphql/queries';


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

const _CustomerMain = ({ ...props, user, newCustomers, followUp, onSite, surveyinProgress, surveyComplete, myEstimates, myCustomers }) => (
  <View style={MasterStyleSheet.mainListView}>

    <List>
      { user.surveyor ?
        <View>
          <ListItem
            hideChevron
            title={'New Customers'}
            badge={{ value: props.data.getMyCustomers.newcustomers.length, badgeTextStyle: { color: 'lightblue' }, badgeContainerStyle: { marginTop: -1 } }}
            onPress={selectNewCustomer}
            containerStyle={MasterStyleSheet.mainList}
          />
          {console.log('MAIN', props)}
          <ListItem
            hideChevron
            title="Customers to followup"
            badge={{ value: props.data.getMyCustomers.followup.length, badgeTextStyle: { color: 'lightblue' }, badgeContainerStyle: { marginTop: -1 } }}
            onPress={selectFollowUp}
            containerStyle={MasterStyleSheet.mainList}
          />
          <ListItem
            hideChevron
            title="Onsite Appointments"
            badge={{ value: props.data.getMyCustomers.onsite.length, badgeTextStyle: { color: 'lightblue' }, badgeContainerStyle: { marginTop: -1 } }}
            onPress={selectOnsite}
            containerStyle={MasterStyleSheet.mainList}
          />
          <ListItem
            hideChevron
            title="Survey in progress"
            badge={{ value: props.data.getMyCustomers.inprogress.length, badgeTextStyle: { color: 'lightblue' }, badgeContainerStyle: { marginTop: -1 } }}
            onPress={selectSurveyinProgress}
            containerStyle={MasterStyleSheet.mainList}
          />
          <ListItem
            hideChevron
            title="Survey complete"
            badge={{ value: props.data.getMyCustomers.surveycomplete.length, badgeTextStyle: { color: 'lightblue' }, badgeContainerStyle: { marginTop: -1 } }}
            containerStyle={MasterStyleSheet.mainList}
            onPress={selectSurveyComplete}
          />

        </View> : null }


      {user.estimator ?
        <View>
          <ListItem
            hideChevron
            title="Estimate Queue"
            badge={{ value: props.data.getQueue.length, badgeTextStyle: { color: 'lightblue' }, badgeContainerStyle: { marginTop: -1 } }}
            containerStyle={MasterStyleSheet.mainList}
            onPress={selectEstimateQueue}
          />
          <ListItem
            hideChevron
            title="My Estimates"
            badge={{ value: props.data.getMyCustomers.myestimates.length, badgeTextStyle: { color: 'lightblue' }, badgeContainerStyle: { marginTop: -1 } }}
            containerStyle={MasterStyleSheet.mainList}
            onPress={selectMyEstimates}
          />
          <ListItem
            hideChevron
            title="Sent Estimates"
            badge={{ value: myEstimates.length, badgeTextStyle: { color: 'lightblue' }, badgeContainerStyle: { marginTop: -1 } }}
            containerStyle={MasterStyleSheet.mainList}
            onPress={selectMyEstimates}
          />

        </View>

        : null}

    </List>
  </View>
    );


const CustomerMain = compose(
  graphql(getUserandCustomers, {
    options: ({ user }) => ({ variables: { id: user._id }, pollInterval: 1000 }),
  }),
)(_CustomerMain);

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
