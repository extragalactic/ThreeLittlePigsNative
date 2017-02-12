import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Modal from 'react-native-modalbox';

import SurveyCardPhoto from './surveyCardPhoto';

const styles = StyleSheet.create({
  modal: {
  },
  modal4: {
    height: 400,
    top: 40,
  },
  btn: {
    margin: 10,
    backgroundColor: '#3B5998',
    color: 'white',
    padding: 10,
  },
  btnModal: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
  },
  text: {
    color: 'black',
    fontSize: 22,
  },
});

const SurveyPhotoModal = ({
   open,
   close, 
   updateSelection,
   photoSelection,
   selection,
   selected,
   getPhoto,
  }) => (
    <Modal
      isOpen={open}
      onClosed={close}
      backdrop={false}
      style={[styles.modal, styles.modal4]}
      position={'center'}
    >
      <SurveyCardPhoto
        photoSelection={photoSelection}
        selection={selection}
        selected={selected}
        updateSelection={updateSelection}
        getPhoto={getPhoto}
      />
    </Modal>
);

export default SurveyPhotoModal;
