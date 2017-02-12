import React from 'react';
import MultipleChoice from 'react-native-multiple-choice';
import { StyleSheet, View } from 'react-native';

const WaterproofingSelect = ({ updateSelection }) => (
  <View style={styles.container}>
    <MultipleChoice
      options={[
        'interlock, grass or landscaping',
        'air conditioner etc to be disconnected/reconnected',
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

export default WaterproofingSelect;


