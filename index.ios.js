import React from 'react';
import { AppRegistry } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { composeWithDevTools } from 'redux-devtools-extension';

import { ApolloProvider } from 'react-apollo';
import { Router } from 'react-native-router-flux';

import routes from './src/Routes';

import { profileReducer } from './src/reducers/authReducer';
import { customerReducer } from './src/reducers/currentCustomer';


const client = new ApolloClient({
  connectToDevTools: true,
  networkInterface: createNetworkInterface({
    uri: 'http://192.168.1.106:8080/graphql',
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
    currentCustomer: customerReducer,
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
    <Router scenes={routes} />
  </ApolloProvider>
);

AppRegistry.registerComponent('ThreeLittlePigsNative', () => ThreeLittlePigsNative);
