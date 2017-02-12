import React from 'react';
import { Modal, View, StyleSheet, PickerIOS } from 'react-native';

const PickerItemIOS = PickerIOS.Item;

const surveyPicker = ({changeSelection, selection, style}) => (
  <View>
    <PickerIOS
      selectedValue={selection}
      onValueChange={(selected) => changeSelection(selected)}
      style={style}
    >
      <PickerItemIOS
        value={'Parging'}
        label={'Parging'}
      />
      <PickerItemIOS
        value={'Concrete'}
        label={'Concrete'}
      />
      <PickerItemIOS
        value={'Chimney'}
        label={'Chimney'}
      />
      <PickerItemIOS
        value={'Brick'}
        label={'Brick'}
      />
      <PickerItemIOS
        value={'Flashing'}
        label={'Flashing'}
      />
      <PickerItemIOS
        value={'Waterproofing'}
        label={'Waterproofing'}
      />
      <PickerItemIOS
        value={'Sealer'}
        label={'Sealer'}
      />
      <PickerItemIOS
        value={'Windowsills'}
        label={'Windowsills'}
      />
      <PickerItemIOS
        value={'Refacing'}
        label={'Refacing'}
      />
      <PickerItemIOS
        value={'Flagstone'}
        label={'Flagstone'}
      />
    </PickerIOS>
  </View>
);

export default surveyPicker;
