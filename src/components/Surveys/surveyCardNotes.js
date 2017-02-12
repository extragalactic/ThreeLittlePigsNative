import React from 'react';
import { Card } from 'react-native-elements';
import { TextInput, StyleSheet, Button, PickerIOS, Text, View, ScrollView, KeyboardAvoidingView } from 'react-native';


const PickerItemIOS = PickerIOS.Item;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  textInput2: {
    borderRadius: 5,
    borderWidth: 1,
    height: 55,
    paddingHorizontal: 10,
    bottom: 10,
  },
  card: {
    flex: 1,
  },
  map: {
    height: 200,
  },
  picker: {
    bottom: -10,
  },
  pickerItem: {
    fontSize: 15,
  },
  text: {
    textAlign: 'center',
    fontSize: 12,
  },
  textInput: {
    left: 0,
    right: 0,
    height: 80,
    width: 250,
    borderColor: 'gray',
    borderWidth: 2,

  },
  button: {
    bottom: 100,
  },
});

const SurveyCardNotes = ({
  updateText,
  submitNotes,
  notes,
  notesSelection,
  selected,
  selection,
  updateSelection 
}) => (
  <Card
    title={`${selected} Notes`}
    containerStyle={styles.card}
  >
    <ScrollView
      scrollEnabled={false}
    >
      <KeyboardAvoidingView
        behavior={'position'}
        style={styles.container}
      >
        <TextInput
          style={styles.textInput2}
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
        style={styles.picker}
        itemStyle={styles.pickerItem}
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
