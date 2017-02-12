import React from 'react';
import MultipleChoice from 'react-native-multiple-choice';
import { StyleSheet, View } from 'react-native';

const FlashingSelect = ({updateSelection}) => (
  <View style={styles.container}>
    <MultipleChoice
      options={[
        'NBC - Parge over brick (20 year warranty)',
        'OBC - New brick only (1 year warranty)',
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

export default FlashingSelect;
