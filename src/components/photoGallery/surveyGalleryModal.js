import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Modal from 'react-native-modalbox';
import PhotoBrowser from 'react-native-photo-browser';

import SurveyGallery from '../photoGallery/surveyGallery';

const styles = StyleSheet.create({
  modal: {
   },
   modal4: {
    height: 400,
   top: 40
  },
  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },
  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },
  text: {
    color: 'black',
    fontSize: 22,
  },
});

const surveyGalleryModal = ({
   open,
   close, 
   updateText, 
   updateSelection,
   selection,
   selected,
   notesSelection,
   submitNotes,
   notes,
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

