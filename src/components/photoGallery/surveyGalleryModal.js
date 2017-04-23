import React from 'react';
import Modal from 'react-native-modalbox';
import PhotoBrowser from 'react-native-photo-browser';

const surveyGalleryModal = ({
   open,
   close,
   photos,
   selectPhoto,
   showActionSheet,
   custID
  }) => (
    <Modal
      isOpen={open}
      onClosed={close}
      position={'center'}
    >
      <PhotoBrowser
        mediaList={photos}
        alwaysShowControls
        onBack={close}
        displayActionButton
        displayNavArrows
        displaySelectionButtons
        startOnGrid
        onActionButton={()=>{}}
      />
    </Modal>
);

export default surveyGalleryModal;