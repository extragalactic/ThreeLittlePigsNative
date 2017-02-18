import React from 'react';
import MultipleChoice from 'react-native-multiple-choice';
import { View } from 'react-native';
import { MasterStyleSheet } from '../../style/MainStyles';

const BrickSelect = ({ updateSelection }) => (
  <View style={MasterStyleSheet.surveyItemContainer}>
    <MultipleChoice
      options={[
        'Tuck pointing',
        'Remove and replace',
      ]}
      onSelection={payload => updateSelection(payload)}
    />
  </View>
);

export default BrickSelect;
