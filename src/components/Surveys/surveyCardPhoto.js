import React from 'react';
import { Card } from 'react-native-elements';
import {
  Button,
  PickerIOS,
  ScrollView,
  TextInput,
} from 'react-native';
import { MasterStyleSheet } from '../../style/MainStyles';

const PickerItemIOS = PickerIOS.Item;

const SurveyCardPhoto = ({
  photoSelection,
  selected,
  selection,
  updateSelection,
  updateText,
  getPhoto,
  photoCaption,
  updatePhotoCaption,
  TakePhoto,
  AddFromLibrary,
}) => (
  <Card
    title={`${selected} Photos`}
  >
    <TextInput
      style={MasterStyleSheet.surveyNotesInputText}
      onChangeText={text => updatePhotoCaption(text)}
      value={photoCaption}
      multiline
    />
    <Button
      title={'Take Photo'}
      onPress={TakePhoto}
    />
    <Button
      title={'Library'}
      onPress={AddFromLibrary}
    />
    <PickerIOS
      style={MasterStyleSheet.surveyCardPicker}
      itemStyle={MasterStyleSheet.surveyCardPickerItem}
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
  </Card>
);

export default SurveyCardPhoto;
