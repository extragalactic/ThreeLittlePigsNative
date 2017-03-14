import React from 'react';
import { AppRegistry } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import store from 'react-native-simple-store';
import thunk from 'redux-thunk';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { composeWithDevTools } from 'redux-devtools-extension';
import Auth0Lock from 'react-native-lock';
import Config from 'react-native-config';
import { ApolloProvider } from 'react-apollo';

import { authInit, saveProfile, getUserID } from './src/Realm/authRealm';


import Root from './src/containers/Root';

import { profileReducer } from './src/reducers/authReducer';

const client = new ApolloClient({
  connectToDevTools: true,
  networkInterface: createNetworkInterface({
    uri: 'https://tlpm.ca/graphql',
  },
    {
      shouldBatch: true,
      initialState: window.__APOLLO_STATE__,
    },
  ),
});

console.disableYellowBox = true;

const apollo = client.middleware();

const combinedReducers =
  combineReducers({
    profile: profileReducer,
    apollo: client.reducer(),
  });

const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });


const reduxStore = createStore(combinedReducers, composeEnhancers(
      applyMiddleware(apollo, thunk),
  ),

);


const ThreeLittlePigsNative = () => (
  <ApolloProvider
    client={client} store={reduxStore}
  >
    <Root />
  </ApolloProvider>
);

AppRegistry.registerComponent('ThreeLittlePigsNative', () => ThreeLittlePigsNative);
