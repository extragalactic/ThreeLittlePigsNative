import React from 'react';
import MultipleChoice from 'react-native-multiple-choice';
import { StyleSheet, View } from 'react-native';

const pargingSelect = ({ updateSelection }) => (
  <View style={styles.container}>
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
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    bottom: 20,
    margin: 20,
    height: 400,
  },
});

export default pargingSelect;
