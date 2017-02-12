import React from 'react';
import { Card, Button } from 'react-native-elements';
import { TextInput, StyleSheet } from 'react-native';

const buttonStyle = {
padding: 10, margin: 4,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    height: 200,
  },
});

const CustomerCardNotes = ({ customer, updateNotes, submitNotes, notes, getNotes }) => (
  <Card title={'Notes'}
    containerStyle={styles.container}
  >
    <TextInput
      style={{ height: 80, width: 260, borderColor: 'gray', padding:1, borderWidth:2 }}
      onChangeText={text => updateNotes(text)}
      value={notes}
      multiline
    />
    <Button
      icon={{ name: 'note' }}
      backgroundColor="#03A9F4"
      buttonStyle={buttonStyle}
      title="Add Note"
      onPress={submitNotes}
    />
    <Button
      icon={{ name: 'note' }}
      backgroundColor="#03A9F4"
      buttonStyle={buttonStyle}
      title="Notes"
      onPress={getNotes}
    />
  </Card>
);

export default CustomerCardNotes;
