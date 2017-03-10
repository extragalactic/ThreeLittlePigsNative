import React from 'react';
import { AppRegistry } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { composeWithDevTools } from 'redux-devtools-extension';
import Auth0Lock from 'react-native-lock';
import Config from 'react-native-config';

import { isTokenExpired } from './src/Utils/jwtHelper';
import { ApolloProvider } from 'react-apollo';

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


const store = createStore(combinedReducers, composeEnhancers(
      applyMiddleware(apollo, thunk),
  ),

);


class ThreeLittlePigsNative extends React.Component {
  constructor() {
    super();
    this.lock = new Auth0Lock({ clientId: Config.AUTH0_ID, domain: Config.AUTH0_DOMAIN }, {});

    this.state = {
      loggedin: false,
      userid: '5852eb3ec6e9650100965f2e',
    };
  }

  componentDidMount() {
    if (!this.props.loggedin) {
      this.logIn();
    }
  }

  logIn = () => {
    console.log('logging in');
    this.lock.show({}, (err, profile, token) => {
      if (err) {
        console.error(err);
      } else {
        this.setState({
          userid: profile.identities[0].userId,
          loggedin: true,
        });
      }
    });
  };

  logout = () => {
    this.setState({ loggedin: false });
    this.logIn();
  };


  render() {
    return (
      <ApolloProvider
        client={client} store={store}
      >
        <Root
          userId={this.state.userid}
          logout={this.logout}
        />
      </ApolloProvider>
    );
  }

}

AppRegistry.registerComponent('ThreeLittlePigsNative', () => ThreeLittlePigsNative);
