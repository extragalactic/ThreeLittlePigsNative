import React from 'react';
import { Card } from 'react-native-elements';
import { TextInput, Button, PickerIOS, ScrollView, KeyboardAvoidingView } from 'react-native';
import { MasterStyleSheet } from '../../style/MainStyles';

const SurveyCardNotes = ({
  updateText,
  submitNotes,
  notes,
  notesSelection,
  selected,
  selection,
  updateSelection,
}) => (
  <Card
    title={`${selected} Notes`}
    containerStyle={MasterStyleSheet.surveyNotesCard}

  >
    <TextInput
      style={MasterStyleSheet.surveyNotesInputText}
      onChangeText={text => updateText(text)}
      value={notes}
      multiline
    />
    <Button
      title={'submit'}
      onPress={submitNotes}
    />
  </Card>
);

export default SurveyCardNotes;
