import React from 'react';
import Modal from 'react-native-modalbox';
import PhotoBrowser from 'react-native-photo-browser';

const surveyGalleryModal = ({
   open,
   close,
   photos,
   selectPhoto,
  }) => (
    <Modal
      isOpen={open}
      onClosed={close}
      position={'center'}
    >
      <PhotoBrowser
        mediaList={photos}
        alwaysShowControls
        displayActionButton
        displayNavArrows
        displaySelectionButtons
        onBack={close}
        startOnGrid
        onSelectionChanged={(media, index, isSelected) => {
          selectPhoto(index);
        }}
      />
    </Modal>
);

export default surveyGalleryModal;

