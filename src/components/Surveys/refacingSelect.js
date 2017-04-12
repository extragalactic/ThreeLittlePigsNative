import React from 'react';
import MultipleChoice from 'react-native-multiple-choice';
import { View } from 'react-native';
import { MasterStyleSheet } from '../../style/MainStyles';

const RefacingSelect = ({ updateSelection }) => (
  <View style={MasterStyleSheet.surveyItemContainer}>
    <MultipleChoice
      options={[
        '4 Inch Stone',
        'Sliced Stone',
      ]}
      onSelection={payload => updateSelection(payload)}
    />
  </View>
);
export default RefacingSelect;
