import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import { NetInfo } from 'react-native';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import LoggedIn from './LoggedIn';
import NoLogin from './NoLogin';
import { checkUserLogin, getuserId } from '../LocalStore/StoreCreds';
import { getUser } from '../../graphql/mutations';

class _Home extends Component {
  static defaultProps = {
    saveProfile: () => {},
    profile: '',
  }
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      loggedIn: false,
      serverIsOnline: false,
    };
  }
  componentDidMount() {
    const _this = this;
    setInterval(() => {
      axios.get('http://localhost:8080/onlinestatus')
        .then((response) => {
          if (response.status === 200) {
            _this.setState({ serverIsOnline: true });
          }
          if (response.status !== 200) {
            _this.setState({ serverIsOnline: false });
          }
        })
       .catch(() => {
         _this.setState({ serverIsOnline: false });
       });

      checkUserLogin().then(res => this.setState({ loggedIn: res }));
    }, 2000);
    getuserId().then(user => this.props.saveProfile(user));
    setTimeout(() => {
      if (this.props.profile) {
        this.props.getUser({
          variables: {
            id: this.props.profile
          },
        }).then((user) => this.props.saveUserObject(user.data.getUser));
    }
      console.log(this.props) 
    
  }, 1000);
    const that = this;
    NetInfo.isConnected.fetch().then((isConnected) => {
      isConnected ? that.setState({ connected: true }) : that.setState({ connected: false });
    });
    const handleFirstConnectivityChange = (isConnected) => {
      isConnected ? that.setState({ connected: true }) : that.setState({ connected: false });
      NetInfo.isConnected.removeEventListener(
      'change',
      handleFirstConnectivityChange,
     );
    };
    NetInfo.isConnected.addEventListener(
  'change',
   handleFirstConnectivityChange,
);
  }

  render() {
    if (!!(this.state.loggedIn && this.state.connected && this.props.profile && this.state.serverIsOnline)) {
      return (
        <LoggedIn />
      );
    }
    return (
      <NoLogin
       serverIsOnline={this.state.serverIsOnline}
      
       />
    );
  }
}

const mapUserProfileToProps = state => ({
  profile: state.profile,
});

const mapActionSaveUserIdToProps = dispatch => ({
  saveProfile(profile) {
    dispatch({ type: 'SAVE_PROFILE', payload: profile });
  },
});

const mapActionSaveUserObjectToProps = dispatch => ({
  saveUserObject(user) {
    dispatch({ type: 'SAVE_USER', payload: user });
  },
});

const Home = compose(
  connect(mapUserProfileToProps, mapActionSaveUserIdToProps),
  connect(null, mapActionSaveUserObjectToProps),
  graphql(getUser, { name: 'getUser' }),
)(_Home);

export default Home;
