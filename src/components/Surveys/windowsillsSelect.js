import React from 'react';
import MultipleChoice from 'react-native-multiple-choice';
import { StyleSheet, View } from 'react-native';

const WindowsillsSelect = ({ updateSelection }) => (
  <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    margin: 20,
    height:200,
  },
});

export default WindowsillsSelect;
