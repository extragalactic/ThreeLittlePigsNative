import React from 'react';
import MultipleChoice from 'react-native-multiple-choice';
import { View } from 'react-native';
import { MasterStyleSheet } from '../../style/MainStyles';

const WindowsillsSelect = ({ updateSelection }) => (
  <View style={MasterStyleSheet.surveyItemContainer}>
    <MultipleChoice
      options={[
        'Brick to stone',
        'Wood to stone',
        'Brick to brick',
      ]}
      onSelection={payload => updateSelection(payload)}
    />
  </View>
);

export default WindowsillsSelect;
