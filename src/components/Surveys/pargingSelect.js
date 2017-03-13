import React from 'react';
import MultipleChoice from 'react-native-multiple-choice';
import { View } from 'react-native';
import { MasterStyleSheet } from '../../style/MainStyles';

const pargingSelect = ({ updateSelection }) => (
  <View style={MasterStyleSheet.surveyItemContainer}>
    <MultipleChoice
      options={[
        'Repair broken concrete corners with steel pins drilled and epoxied',
        'Grind and Parge',
        'Roll on grey (mortar colour coating)',
        'Interlock/pavers re/re',
        'Interlock/pavers cuts linear footage',
        'Cracks in foundation',
      ]}
      onSelection={payload => updateSelection(payload)}
      selectedOptions={[]}
    />
  </View>
);

export default pargingSelect;
