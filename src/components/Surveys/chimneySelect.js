import React from 'react';
import MultipleChoice from 'react-native-multiple-choice';
import { StyleSheet, View } from 'react-native';

const chimneySelect = ({ updateSelection }) => (
  <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    margin: 20,
    height:415,
  },
});

export default chimneySelect;
