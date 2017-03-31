import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Spinner from 'react-native-spinkit';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { Card, Button } from 'react-native-elements';
import { MasterStyleSheet } from '../../style/MainStyles';
import { Actions } from 'react-native-router-flux';
import { getUserandCustomers } from '../../graphql/queries';




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
});

class _UserHome extends React.Component {
  static defaultProps = {
    profile: React.PropTypes.object,
    saveProfile: React.PropTypes.func,
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
 
  }
  render() {
    if (this.props.data.loading){
      return (
        <Spinner />
      );
    }
    const user = this.props.data.user;
    return (
      <View
        style={styles.container}
      >
        <Text> Hey {this.props.data.user.firstName}! Choose an option below</Text>
        { user.surveyor ?
          <View>
            <Button
              title={'New Customers'}
              buttonStyle={MasterStyleSheet.mainButtonStyle}
              onPress={() => Actions.customerListNewCustomers()}
            />
            <Button
              title={'Customers to Followup'}
              buttonStyle={MasterStyleSheet.mainButtonStyle}
              onPress={() => Actions.customerListFollowUp()}
            />
            <Button
              title={'Appointments'}
              buttonStyle={MasterStyleSheet.mainButtonStyle}
              onPress={() => Actions.customerListOnsite()}
            />
            <Button
              title={'Surveys'}
              buttonStyle={MasterStyleSheet.mainButtonStyle}
              onPress={() => Actions.customerListsurveyinProgress()}
            />
            <Button
              title={'Completed Surveys'}
              buttonStyle={MasterStyleSheet.mainButtonStyle}
              onPress={() => Actions.customerListsurveyComplete()}
            />
          </View>
          : null}
        {user.estimator ?
          <View>
            <Button
              title={'Estimate Queue'}
              buttonStyle={MasterStyleSheet.estimateButtonStyle}
              onPress={() => Actions.customerListQueue()}
            />
            <Button
              title={'My Estimates'}
              buttonStyle={MasterStyleSheet.estimateButtonStyle}
              onPress={() => Actions.customerListMyEstimates()}
            />
           </View> : null}
            <Button
              title={'Search'}
              buttonStyle={MasterStyleSheet.searchButtonStyle}
            />
      </View>
    );
  }
}

const mapActionsToProps = dispatch => ({
  saveProfile(profile) {
    dispatch({ type: 'SAVE_PROFILE', payload: profile });
  },
});

const UserHome = compose(
  graphql(getUserandCustomers, {
    options: ({ id }) => ({ variables: { id }, pollInterval: 5000 }),
  }),
   connect(null, mapActionsToProps),
)(_UserHome);



export default UserHome;


