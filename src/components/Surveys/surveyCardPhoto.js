import React from 'react';
import { Card } from 'react-native-elements';
import {
  Button,
  PickerIOS,
  ScrollView,
} from 'react-native';
import { MasterStyleSheet } from '../../style/MainStyles';

const PickerItemIOS = PickerIOS.Item;

const SurveyCardPhoto = ({
  photoSelection,
  selected,
  selection,
  updateSelection,
  getPhoto, 
}) => (
  <Card
    title={`${selected} Photos`}
    containerStyle={MasterStyleSheet.surveyCardPhoto}
  >
    <ScrollView
      scrollEnabled={false}
    >
      <Button
        title={'Get Photo'}
        onPress={getPhoto}
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
    </ScrollView>
  </Card>
);

export default SurveyCardPhoto;
