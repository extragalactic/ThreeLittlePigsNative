import React from 'react';
import Modal from 'react-native-modalbox';
import { MasterStyleSheet } from '../../style/MainStyles';
import SurveyCardPhoto from './surveyCardPhoto';

const SurveyPhotoModal = ({
   open,
   close,
   updateSelection,
   photoSelection,
   updatePhotoCaption,
   selection,
   photoCaption,
   selected,
   getPhoto,
   notes,
   TakePhoto,
   AddFromLibrary,
  }) => (
    <Modal
      isOpen={open}
      onClosed={close}
      backdrop
      style={MasterStyleSheet.surveyPhotoModal}
      position={'center'}
    >
      <SurveyCardPhoto
        photoSelection={photoSelection}
        selection={selection}
        selected={selected}
        updateSelection={updateSelection}
        getPhoto={getPhoto}
        updatePhotoCaption={updatePhotoCaption}
        photoCaption={photoCaption}
        TakePhoto={TakePhoto}
        AddFromLibrary={AddFromLibrary}
      />
    </Modal>
);

export default SurveyPhotoModal;
