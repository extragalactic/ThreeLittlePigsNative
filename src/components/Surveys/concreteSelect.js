import React from 'react';
import MultipleChoice from 'react-native-multiple-choice';
import { StyleSheet, View, ScrollView, TextInput, Text } from 'react-native';

const ConcreteSelect = ({ count, updateCount, updateSelection }) => (
  <View>
    <ScrollView style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    bottom: 20,
    margin: 20,
    height: 450,
  },
  textinput: {

    margin: 10,
    borderColor: 'gray',
    padding: 1,
    borderWidth: 2,
    height: 30,
    bottom: 10,
  },
});

export default ConcreteSelect;
