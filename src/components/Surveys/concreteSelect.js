import React from 'react';
import MultipleChoice from 'react-native-multiple-choice';
import { View, ScrollView } from 'react-native';
import { MasterStyleSheet } from '../../style/MainStyles';

const ConcreteSelect = ({ updateSelection }) => (
  <View>
    <ScrollView style={MasterStyleSheet.surveyItemContainer}>
      <MultipleChoice
        options={[
          'Landing treads or risers',
          'Sidewalk',
          'Driveway',
          'Garage pad/floor',
          'Patio etc...',
          'Underpinning/ structural',
          'Pilings',
          'Footings',
          'Foundations',
          'Retaining walls',
          'OBC (2 Year Warranty)',
          'NBC (20 Year Warranty)',
          'Flagstone Finish',
          'Parging Finish',
        ]}
        onSelection={payload => updateSelection(payload)}
      />
    </ScrollView>
  </View>
);

export default ConcreteSelect;
