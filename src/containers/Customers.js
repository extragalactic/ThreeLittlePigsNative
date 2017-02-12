import React from 'react';
import { View, StyleSheet } from 'react-native';
import Spinner from 'react-native-spinkit';
import { Router, Scene } from 'react-native-router-flux';

import CustomerMain from '../components/customerMain';
import CustomerListNewCustomers from '../components/customerListNewCustomers';
import CustomerListFollowUp from '../components/customerListFollowup';
import CustomerListOnsite from '../components/customerListOnsite';
import CustomerListsurveyinProgress from '../components/customerSurveyinProgress';
import CustomerDetails from '../components/customerDetails';
import surveyGallery from '../components/photoGallery/surveyGallery';
import Surveys from './Surveys';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

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
      <View style={styles.container}>
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
        />
        <Scene
          key={'customerListFollowUp'}
          component={CustomerListFollowUp}
          passProps
          user={user}
          getCustomer={getCustomer}
          followUp={followUp}
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
          component={CustomerListsurveyinProgress }
          passProps
          user={user}
          getCustomer={getCustomer}
          surveyinProgress={surveyinProgress}
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
