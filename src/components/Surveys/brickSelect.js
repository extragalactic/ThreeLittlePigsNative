import React from 'react';
import MultipleChoice from 'react-native-multiple-choice';
import { StyleSheet, View } from 'react-native';

const BrickSelect = ({ updateSelection }) => (
  <View style={styles.container}>
    <MultipleChoice
      options={[
        'Tuck pointing',
        'Remove and replace',
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

export default BrickSelect;
