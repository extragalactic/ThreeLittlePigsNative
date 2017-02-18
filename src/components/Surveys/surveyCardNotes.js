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
    containerStyle={MasterStyleSheet.surveyCardPhoto}
  >
    <ScrollView
      scrollEnabled={false}
    >
      <KeyboardAvoidingView
        behavior={'position'}
        style={MasterStyleSheet.surveyNotesInputContainer}
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
      </KeyboardAvoidingView>
      <PickerIOS
        style={MasterStyleSheet.surveyCardPicker}
        itemStyle={MasterStyleSheet.surveyCardPickerItem}
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
    </ScrollView>
  </Card>
);

export default SurveyCardNotes;
