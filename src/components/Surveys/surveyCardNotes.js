import React from 'react';
import { Card } from 'react-native-elements';
import { TextInput, Button, PickerIOS, ScrollView, KeyboardAvoidingView } from 'react-native';
import { MasterStyleSheet } from '../../style/MainStyles';

const PickerItemIOS = PickerIOS.Item;

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
    <PickerIOS
      selectedValue={notesSelection}
      onValueChange={slct => updateSelection(slct)}
    >
      {selection.map((sel, idx) => (
        <PickerItemIOS
          key={idx}
          value={sel}
          label={sel}
        />
     ))}
    </PickerIOS>
  </Card>
);

export default SurveyCardNotes;
