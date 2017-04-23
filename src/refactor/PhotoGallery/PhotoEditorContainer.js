import React from 'react';
import { Modal } from 'react-native';

import PhotoEditor from './PhotoEditor';

PhotoEditorContainer.propTypes = {
//	custID: React.PropTypes.string.isRequired,
};

function PhotoEditorContainer (props) {

  const custID = '58e998682d9c5601001e57ef';
  const photoIndex = 0;

  return (
    <Modal
      isOpen={props.open}
      visible={props.open}
      position={'center'}
    >
      <PhotoEditor
        custID={custID}
        photoIndex={photoIndex}
      />
    </Modal>
  );
}

export default PhotoEditorContainer;