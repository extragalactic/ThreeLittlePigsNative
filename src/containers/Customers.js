import React from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-spinkit';
import { Router, Scene } from 'react-native-router-flux';
import CustomerMain from '../components/customerMain';
import CustomerListNewCustomers from '../components/customerList/customerListNewCustomers';
import CustomerListFollowUp from '../components/customerList/customerListFollowup';
import CustomerListOnsite from '../components/customerList/customerListOnsite';
import CustomerListsurveyinProgress from '../components/customerList/customerListSurveyinProgress';

import CustomerDetails from '../components/customerDetails';

import { MasterStyleSheet } from '../style/MainStyles';

const Customers = ({
  user,
  getCustomer,
  submitFollowup,
  getAppointmentsforDay,
  data,
  updateCustomer,
  addNotes,
  deleteAppointment,
  getUser,
  updateUser,
  newCustomers,
  followUp,
  onSite,
  surveyinProgress,
 }) => {
  if (user.newCustomers === null) {
    return (
      <View style={MasterStyleSheet.container}>
        <Spinner
          type={'9CubeGrid'}
        />
      </View>
    );
  }
  return (
    <Router>
      <Scene key={'root'}>
        <Scene
          key={'customerMain'}
          component={CustomerMain}
          initial
          passProps
          user={user}
          getCustomer={getCustomer}
          newCustomers={newCustomers}
          followUp={followUp}
          onSite={onSite}
          surveyinProgress={surveyinProgress}
        />
        <Scene
          key={'customerListNewCustomers'}
          component={CustomerListNewCustomers}
          passProps
          user={user}
          getCustomer={getCustomer}
          newCustomers={newCustomers}
          submitFollowup={submitFollowup}
          getAppointmentsforDay={getAppointmentsforDay}
          updateCustomer={updateCustomer}
          addNotes={addNotes}
          getUser={getUser}
          updateUser={updateUser}
          deleteAppointment={deleteAppointment}
          data={data}
        />
        <Scene
          key={'customerListFollowUp'}
          component={CustomerListFollowUp}
          passProps
          user={user}
          getCustomer={getCustomer}
          followUp={followUp}
          submitFollowup={submitFollowup}
          getAppointmentsforDay={getAppointmentsforDay}
          updateCustomer={updateCustomer}
          addNotes={addNotes}
          getUser={getUser}
          updateUser={updateUser}
          deleteAppointment={deleteAppointment}
          data={data}
        />
        <Scene
          key={'customerListOnsite'}
          component={CustomerListOnsite}
          passProps
          user={user}
          getCustomer={getCustomer}
          onSite={onSite}
        />
        <Scene
          key={'customerListsurveyinProgress'}
          component={CustomerListsurveyinProgress}
          passProps
          user={user}
          getCustomer={getCustomer}
          surveyinProgress={surveyinProgress}
          newCustomers={newCustomers}
          submitFollowup={submitFollowup}
          getAppointmentsforDay={getAppointmentsforDay}
          updateCustomer={updateCustomer}
          addNotes={addNotes}
          getUser={getUser}
          updateUser={updateUser}
          deleteAppointment={deleteAppointment}
        />
        <Scene
          key={'customerDetails'}
          component={CustomerDetails}
          passProps
          user={user}
          getCustomer={getCustomer}
          submitFollowup={submitFollowup}
          getAppointmentsforDay={getAppointmentsforDay}
          updateCustomer={updateCustomer}
          addNotes={addNotes}
          getUser={getUser}
          updateUser={updateUser}
          deleteAppointment={deleteAppointment}
          data={data}
        />
      </Scene>
    </Router>
  );
};

export default Customers;
