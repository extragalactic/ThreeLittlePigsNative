import React from 'react';
import { Card, Button } from 'react-native-elements';
import { View } from 'react-native';

import { MasterStyleSheet } from '../../style/MainStyles';

const CustomerCardEstimate = ({ getEstimate }) => (
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
        onPress={getEstimate}
      />
    </View>
  </Card>
);

export default CustomerCardEstimate;

