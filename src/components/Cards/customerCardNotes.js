import React from 'react';
import { Card, Button } from 'react-native-elements';
import { TextInput } from 'react-native';
import { MasterStyleSheet } from '../../style/MainStyles';

const CustomerCardNotes = ({ updateNotes, submitNotes, notes, getNotes }) => (
  <Card
    title={'Notes'}
    containerStyle={MasterStyleSheet.container}
  >
    <TextInput
      style={MasterStyleSheet.CustomerCardNotesTextInput}
      onChangeText={text => updateNotes(text)}
      value={notes}
      multiline
    />
    <Button
      icon={{ name: 'note' }}
      backgroundColor="#03A9F4"
      buttonStyle={MasterStyleSheet.mainButtonStyle}
      title="Add Note"
      onPress={submitNotes}
    />
    <Button
      icon={{ name: 'note' }}
      backgroundColor="#03A9F4"
      buttonStyle={MasterStyleSheet.mainButtonStyle}
      title="Notes"
      onPress={getNotes}
    />
  </Card>
);

export default CustomerCardNotes;
