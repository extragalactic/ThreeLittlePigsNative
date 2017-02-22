import React from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-spinkit';
import { Router, Scene } from 'react-native-router-flux';
import CustomerMain from '../components/customerMain';
import CustomerListNewCustomers from '../components/customerList/customerListNewCustomers';
import CustomerListFollowUp from '../components/customerList/customerListFollowup';
import CustomerListEstimateQueue from '../components/customerList/customerListEstimateQueue'
import CustomerListOnsite from '../components/customerList/customerListOnsite';
import CustomerListsurveyinProgress from '../components/customerList/customerListSurveyinProgress';
import CustomerListSurveyComplete from '../components/customerList/customerListSurveyComplete';
import CustomerListMyEstimates from '../components/customerList/customerListMyEstimates';
import CustomerDetails from '../components/customerDetails';

import CustomerDetailsQueue from '../components/customerDetails/customerDetailsIPadQueue';

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
  surveyComplete,
  acceptEstimate,
  myEstimates,
  myCustomers,
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
          myEstimates={myEstimates}
          onSite={onSite}
          surveyinProgress={surveyinProgress}
          surveyComplete={surveyComplete}
          myCustomers={myCustomers}
        />
        <Scene
          key={'customerListNewCustomers'}
          component={CustomerListNewCustomers}
          passProps
          user={user}
          getCustomer={getCustomer}
          newCustomers={newCustomers}
          myCustomers={myCustomers}
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
          myCustomers={myCustomers}
          addNotes={addNotes}
          getUser={getUser}
          updateUser={updateUser}
          deleteAppointment={deleteAppointment}
          data={data}
        />
        <Scene
          key={'customerListMyEstimates'}
          component={CustomerListMyEstimates}
          passProps
          user={user}
          getCustomer={getCustomer}
          followUp={followUp}
          submitFollowup={submitFollowup}
          getAppointmentsforDay={getAppointmentsforDay}
          myEstimates={myEstimates}
          myCustomers={myCustomers}
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
          followUp={followUp}
          submitFollowup={submitFollowup}
          getAppointmentsforDay={getAppointmentsforDay}
          myEstimates={myEstimates}
          myCustomers={myCustomers}
          updateCustomer={updateCustomer}
          addNotes={addNotes}
          getUser={getUser}
          updateUser={updateUser}
          deleteAppointment={deleteAppointment}
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
          followUp={followUp}
          myEstimates={myEstimates}
          myCustomers={myCustomers}
        />
        <Scene
          key={'customerListsurveyComplete'}
          component={CustomerListSurveyComplete}
          passProps
          user={user}
          getCustomer={getCustomer}
          surveyComplete={surveyComplete}
          newCustomers={newCustomers}
          submitFollowup={submitFollowup}
          getAppointmentsforDay={getAppointmentsforDay}
          updateCustomer={updateCustomer}
          addNotes={addNotes}
          getUser={getUser}
          updateUser={updateUser}
          deleteAppointment={deleteAppointment}
          myCustomers={myCustomers}
        />
        <Scene
          key={'customerListQueue'}
          component={CustomerListEstimateQueue}
          passProps
          user={user}
          getCustomer={getCustomer}
          surveyComplete={surveyComplete}
          newCustomers={newCustomers}
          acceptEstimate={acceptEstimate}
          submitFollowup={submitFollowup}
          getAppointmentsforDay={getAppointmentsforDay}
          updateCustomer={updateCustomer}
          addNotes={addNotes}
          getUser={getUser}
          updateUser={updateUser}
          deleteAppointment={deleteAppointment}
          myCustomers={myCustomers}
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
          myCustomers={myCustomers}
        />
        <Scene
          key={'customerDetailsQueue'}
          component={CustomerDetailsQueue}
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
          myCustomers={myCustomers}
          data={data}
        />
      </Scene>
    </Router>
  );
};

export default Customers;
