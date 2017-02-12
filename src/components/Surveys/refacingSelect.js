import React from 'react';
import MultipleChoice from 'react-native-multiple-choice';
import { StyleSheet, View } from 'react-native';

const RefacingSelect = ({ updateSelection }) => (
  <View style={styles.container}>
    <MultipleChoice
      options={[
        '4 Inch Block',
        'Sliced Stone',
      ]}
      onSelection={payload => updateSelection(payload)}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    margin: 20,
      height:200,
  },
});

export default RefacingSelect;
