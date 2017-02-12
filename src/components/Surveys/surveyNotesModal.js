import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Modal from 'react-native-modalbox';

import SurveyCardNotes from './surveyCardNotes';

const styles = StyleSheet.create({
  modal: {
 
  },
   modal4: {
    height: 650,
    top: 50
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
    height: 200,
    backgroundColor: "transparent"
  },
  text: {
    color: 'black',
    fontSize: 22,
  },
});

const SurveyNotesModal = ({
   open,
   close, 
   updateText, 
   updateSelection,
   selection,
   selected,
   notesSelection,
   submitNotes,
   notes,
  }) => (
    <Modal
      isOpen={open}
      onClosed={close}
      backdrop={false}
      style={[styles.modal, styles.modal4]}
      position={'center'}
    >
      <SurveyCardNotes
        updateText={updateText}
        updateSelection={updateSelection}
        notesSelection={notesSelection}
        selected={selected}
        selection={selection}
        submitNotes={submitNotes}
        notes={notes}
      />
    </Modal>
);

export default SurveyNotesModal;
