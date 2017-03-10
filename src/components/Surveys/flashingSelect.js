import React from 'react';
import MultipleChoice from 'react-native-multiple-choice';
import { View } from 'react-native';
import { MasterStyleSheet } from '../../style/MainStyles';

const FlashingSelect = ({ updateSelection }) => (
  <View style={MasterStyleSheet.surveyItemContainer}>
    <MultipleChoice
      options={[
        'NBC - Parge over brick (20 year warranty)',
        'OBC - New brick only (1 year warranty)',
      ]}
      onSelection={payload => updateSelection(payload)}
    />
  </View>
);

export default FlashingSelect;
