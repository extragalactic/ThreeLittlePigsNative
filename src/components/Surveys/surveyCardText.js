import React from 'react';
import { TextInput, View } from 'react-native';

const SurveyCardText = ({
  styles,
  updateText,
  notes,
  submitNotes,
  spacerProps,
}) => (

    <TextInput
     style={{
       height: 80,
       width: 250,
       borderColor: 'gray',
       borderWidth: 2,
  }}
      onChangeText={text => updateText(text)}
      value={notes}
      multiline
      onSubmitEditing={submitNotes}
     {...spacerProps(this)}
    />
 
);

export default SurveyCardText;
