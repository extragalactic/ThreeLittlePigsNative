import React from 'react';
import Modal from 'react-native-modalbox';
import { MasterStyleSheet } from '../../style/MainStyles';
import SurveyCardNotes from './surveyCardNotes';

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
      style={MasterStyleSheet.surveyNotesModal}
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
