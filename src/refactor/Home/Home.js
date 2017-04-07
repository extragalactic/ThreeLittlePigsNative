import React, { Component, PropTypes } from 'react';
import { NetInfo } from 'react-native';
import { connect } from 'react-redux';
import LoggedIn from './LoggedIn';
import NoLogin from './NoLogin';
import { checkUserLogin, getuserId } from '../LocalStore/StoreCreds';

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
    };
  }
  componentDidMount() {
    setInterval(() => {
      checkUserLogin().then(res => this.setState({ loggedIn: res }));
    }, 2000);
    getuserId().then(user => this.props.saveProfile(user));
    setTimeout(() => { console.log(this.props) }, 1000);
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
    if (!!(this.state.loggedIn && this.state.connected && this.props.profile)) {
      return (
        <LoggedIn />
      );
    }
    return (
      <NoLogin />
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
});

const mapActionsToProps = dispatch => ({
  saveProfile(profile) {
    dispatch({ type: 'SAVE_PROFILE', payload: profile });
  },
});

const Home = connect(mapStateToProps, mapActionsToProps)(_Home);

export default Home;
