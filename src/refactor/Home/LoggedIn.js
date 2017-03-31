import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Spinner from 'react-native-spinkit';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';

import UserHome from './UserHome';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
});

class _LoggedIn extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }
  componentDidMount() {
  }
  render() {
    console.log(this.props.profile)
    return (
      <UserHome
        id={this.props.profile}
      />
    );
  }
}
const mapStateToProps = state => ({
  profile: state.profile,
});

const LoggedIn = compose(
  connect(mapStateToProps, null),
)(_LoggedIn);

export default LoggedIn;

