import React from 'react';
import { Card } from 'react-native-elements';
import {
  Button,
  PickerIOS,
  View,
  TextInput,
  Text,
} from 'react-native';

import { MasterStyleSheet } from '../../style/MainStyles';
import PhotoLightBox from './photoLightBox';

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
  photos,
}) => (
  <Card
    title={`${selected} Photos`}
    containerStyle={MasterStyleSheet.surveyPhotoCard}
  >
    <Text> Add comments to photo</Text>
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
    <View>
      <Text>{photos.length} Photos Taken</Text>
   
    </View>
  </Card>
);

export default SurveyCardPhoto;
