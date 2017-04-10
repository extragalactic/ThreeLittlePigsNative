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

import Home from './refactor/Home/Home';

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
import GiftedChatContainer from './components/GiftedChat/GiftedChatContainer';
import EstimateContainer from './refactor/Estimates/EstimatesContainer';
import CustomerListContainer from './refactor/CustomerList/CustomerListContainer';
import CustomerDetailsContainer from './refactor/CustomerDetails/CustomerDetailsContainer';
import CustomerListContainerQueue from './refactor/CustomerList/CustomerListContainerQueue';
import PhotoGalleryContainer from './refactor/PhotoGallery/PhotoGalleryContainer';
import PricingContainer from './refactor/Estimates/PricingContainer';

const routes = Actions.create(
  <Scene key="root">
    <Scene
      key="home"
      component={Home}
    />
    <Scene
      key={'customerDetails'}
      component={CustomerDetails}
      passProps
    />
    <Scene
      key={'customerDetailsQueue'}
      component={CustomerDetailsQueue}
      passProps
    />
    <Scene
      key={'customerListNewCustomers'}
      component={CustomerListNewCustomers}
      passProps
    />
    <Scene
      key={'customerListFollowUp'}
      component={CustomerListFollowUp}
      passProps
    />
    <Scene
      key={'customerListOnsite'}
      component={CustomerListOnsite}
      passProps
    />
    <Scene
      key={'customerListsurveyinProgress'}
      component={CustomerListsurveyinProgress}
      passProps
    />
    <Scene
      key={'customerListsurveyComplete'}
      component={CustomerListSurveyComplete}
      passProps
    />
    <Scene
      key={'customerListQueue'}
      component={CustomerListEstimateQueue}
      passProps
    />
    <Scene
      key={'customerListMyEstimates'}
      component={CustomerListMyEstimates}
      passProps
    />
    <Scene
      key={'giftedChatContainer'}
      component={GiftedChatContainer}
      passProps
    />
    <Scene
      key={'estimateContainer'}
      component={EstimateContainer}
      passProps
    />
    <Scene
      key={'customerList'}
      component={CustomerListContainer}
      passProps
    />
    <Scene
      key={'customerDetailsContainer'}
      component={CustomerDetailsContainer}
      passProps
    />
    <Scene
      key={'customerDetailsContainer'}
      component={CustomerDetailsContainer}
      passProps
    />
    <Scene
      key={'myEstimates'}
      component={EstimateContainer}
      passProps
    />
    <Scene
      key={'customerListContainerQueue'}
      component={CustomerListContainerQueue}
      passProps
    />
    <Scene
      key={'pricingContainer'}
      component={PricingContainer}
      passProps
    />
    <Scene
      key={'photoGalleryContainer'}
      component={PhotoGalleryContainer}
      passProps
      hideBackImage
      sceneStyle={{ marginTop: 50 }}
    />
  </Scene>,
);

export default routes;

