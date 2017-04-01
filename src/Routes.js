import React from 'react';
import {
  Scene,
  Reducer,
  Router,
  Switch,
  Modal,
  Actions,
  ActionConst,
} from 'react-native-router-flux';

import Home from './containers/Home';

import CustomerDetails from './components/customerDetails';
import CustomerListNewCustomers from './components/customerList/customerListNewCustomers';
import CustomerListFollowUp from './components/customerList/customerListFollowup';
import CustomerListEstimateQueue from './components/customerList/customerListEstimateQueue';
import CustomerListOnsite from './components/customerList/customerListOnsite';
import CustomerListsurveyinProgress from './components/customerList/customerListSurveyinProgress';
import CustomerListSurveyComplete from './components/customerList/customerListSurveyComplete';
import CustomerListMyEstimates from './components/customerList/customerListMyEstimates';
import CustomerDetailsIpadQueue from './components/customerDetails/customerDetailsIPadQueue';
import CustomerDetailsQueue from './components/customerDetails/customerDetailsQueue';

import { getUserID } from './Realm/authRealm';

const routes = Actions.create(
  <Scene key="root">
    <Scene key="home" component={() => <Home />} />
    <Scene
      key={'customerDetails'}
      component={CustomerDetails}
      passProps
      id={getUserID()}
    />
    <Scene
      key={'customerDetailsQueue'}
      component={CustomerDetailsQueue}
      passProps
      id={getUserID()}
    />
    <Scene
      key={'customerListNewCustomers'}
      component={CustomerListNewCustomers}
      passProps
      id={getUserID()}
    />
    <Scene
      key={'customerListFollowUp'}
      component={CustomerListFollowUp}
      passProps
      id={getUserID()}
    />
    <Scene
      key={'customerListOnsite'}
      component={CustomerListOnsite}
      passProps
      id={getUserID()}
    />
    <Scene
      key={'customerListsurveyinProgress'}
      component={CustomerListsurveyinProgress}
      passProps
      id={getUserID()}
    />
    <Scene
      key={'customerListsurveyComplete'}
      component={CustomerListSurveyComplete}
      passProps
      id={getUserID()}
    />
    <Scene
      key={'customerListQueue'}
      component={CustomerListEstimateQueue}
      passProps
      id={getUserID()}
    />
    <Scene
      key={'customerListMyEstimates'}
      component={CustomerListMyEstimates}
      passProps
      id={getUserID()}
    />
  </Scene>,
);

export default routes;
