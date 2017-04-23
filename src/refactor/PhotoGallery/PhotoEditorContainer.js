import React from 'react';
import { WebView } from 'react-native';

// import PhotoEditor from './PhotoEditor';

PhotoEditorContainer.propTypes = {
//	custID: React.PropTypes.string.isRequired,
};

function PhotoEditorContainer (props) {

  const custID = '58e998682d9c5601001e57ef';
  const photoIndex = 0;

  const BASE_URL = 'http://localhost:8080';

  return (
      <WebView
        style={{flex: 1, width: 800}}
        source={{uri: BASE_URL + '/photoedit/' + custID}}
      />
  );
}
/*
  return (
    <PhotoEditor
      style={{flex: 1}}
      custID={custID}
      photoIndex={photoIndex}
    />
  );
*/
export default PhotoEditorContainer;