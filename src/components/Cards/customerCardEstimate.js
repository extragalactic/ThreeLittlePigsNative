import React from 'react';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { MasterStyleSheet } from '../../style/MainStyles';

const _CustomerCardEstimate = ({ ...props }) => (
  <Card
    containerStyle={MasterStyleSheet.cardStyle}
    title={'Estimate'}
  >
    <View>
      <Button
        icon={{ name: 'assignment' }}
        backgroundColor="#03A9F4"
        buttonStyle={MasterStyleSheet.mainButtonStyle}
        title="Estimate"
        onPress={() => Actions.myEstimates({ id: props.currentCustomer })}
      />
    </View>
  </Card>
);

const mapStateToProps = state => ({
  currentCustomer: state.currentCustomer,
});
const CustomerCardEstimate = connect(mapStateToProps, null)(_CustomerCardEstimate);


export default CustomerCardEstimate;
