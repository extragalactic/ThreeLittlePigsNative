import React from 'react';
import MultipleChoice from 'react-native-multiple-choice';
import { View } from 'react-native';
import { MasterStyleSheet } from '../../style/MainStyles';

const chimneySelect = ({ updateSelection }) => (
  <View style={MasterStyleSheet.surveyItemContainer}>
    <MultipleChoice
      options={[
        'Re/re to roofline with new masonry to match as close as possible.',
        'Re/re to foundation',
        'Re/re top portion only',
        'Buttress',
        'New Brick',
        'Limestone Capping',
      ]}
      onSelection={payload => updateSelection(payload)}
    />
  </View>
);

export default chimneySelect;
