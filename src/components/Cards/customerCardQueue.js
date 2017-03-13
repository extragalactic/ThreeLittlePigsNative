import React from 'react';
import { Card, Button } from 'react-native-elements';
import { MasterStyleSheet } from '../../style/MainStyles';

const CustomerCardQueue = ({ acceptEstimate }) => (
  <Card
    title={'Estimate Queue'}
    containerStyle={MasterStyleSheet.cardStyle}
  >
    <Button
      icon={{ name: 'note' }}
      backgroundColor="#03A9F4"
      buttonStyle={MasterStyleSheet.mainButtonStyle}
      onPress={acceptEstimate}
      title="Accept Estimate"
    />
  </Card>
);

export default CustomerCardQueue;
