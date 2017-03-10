import React from 'react';
import MultipleChoice from 'react-native-multiple-choice';
import { View } from 'react-native';
import { MasterStyleSheet } from '../../style/MainStyles';

const WaterproofingSelect = ({ updateSelection }) => (
  <View style={MasterStyleSheet.surveyItemContainer}>
    <MultipleChoice
      options={[
        'interlock, grass or landscaping',
        'air conditioner etc to be disconnected/reconnected',
      ]}
      onSelection={payload => updateSelection(payload)}
    />
  </View>
);

export default WaterproofingSelect;

