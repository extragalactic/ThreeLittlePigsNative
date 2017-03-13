import React from 'react';
import { Card, Button } from 'react-native-elements';
import { View } from 'react-native';

import { MasterStyleSheet } from '../../style/MainStyles';

const CustomerCardPricing = ({ customer }) => (
  <Card
    title={'Estimates'}
    containerStyle={MasterStyleSheet.container}
  >
    <View style={MasterStyleSheet.pricingCardView}>
      <Button
        icon={{ name: 'attach-money' }}
        backgroundColor="#03A9F4"
        buttonStyle={MasterStyleSheet.mainButtonStyle}
        title="Add Item"
      />
      <Button
        icon={{ name: 'description' }}
        backgroundColor="#03A9F4"
        buttonStyle={MasterStyleSheet.mainButtonStyle}
        title="Estimate"
      />
    </View>
  </Card>
);

export default CustomerCardPricing;

