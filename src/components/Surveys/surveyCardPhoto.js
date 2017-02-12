import React from 'react';
import { Card } from 'react-native-elements';
import {
  StyleSheet,
  Button,
  PickerIOS,
  ScrollView,
} from 'react-native';

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

const SurveyCardPhoto = ({
  photoSelection,
  selected,
  selection,
  updateSelection,
  getPhoto, 
}) => (
  <Card
    title={`${selected} Photos`}
    containerStyle={styles.card}
  >
    <ScrollView
      scrollEnabled={false}
    >
      <Button
        title={'Get Photo'}
        onPress={getPhoto}
      />
      <PickerIOS
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={photoSelection}
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

export default SurveyCardPhoto;
