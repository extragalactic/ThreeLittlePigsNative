import React from 'react';
import { TextInput } from 'react-native';
import { MasterStyleSheet } from '../../style/MainStyles';

const SurveyCardText = ({
  updateText,
  notes,
  submitNotes,
  spacerProps,
}) => (
  <TextInput
    style={MasterStyleSheet.surveyCardTextInput}
    onChangeText={text => updateText(text)}
    value={notes}
    multiline
    onSubmitEditing={submitNotes}
    {...spacerProps(this)}
  />
);

export default SurveyCardText;
