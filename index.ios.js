import React from 'react';
import { AppRegistry } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { composeWithDevTools } from 'remote-redux-devtools';
import { ApolloProvider } from 'react-apollo';

import Root from './src/containers/Root';
import { profileReducer } from './src/reducers/authReducer';

const client = new ApolloClient({
  connectToDevTools: true,
  networkInterface: createNetworkInterface({
    uri: 'http://192.168.1.105:8080/graphql',
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

const store = createStore(combinedReducers, composeEnhancers(
      applyMiddleware(apollo, thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

const ThreeLittlePigsNative = () => (
  <ApolloProvider
    client={client} store={store}
  >
    <Root
      userId={'5852eb3ec6e9650100965f2e'}
    />
  </ApolloProvider>
);


AppRegistry.registerComponent('ThreeLittlePigsNative', () => ThreeLittlePigsNative);
