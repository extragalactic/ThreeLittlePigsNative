import React from 'react';
import Modal from 'react-native-modalbox';
import { MasterStyleSheet } from '../../style/MainStyles';
import SurveyCardPhoto from './surveyCardPhoto';

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
      style={MasterStyleSheet.surveyNotesModal}
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
