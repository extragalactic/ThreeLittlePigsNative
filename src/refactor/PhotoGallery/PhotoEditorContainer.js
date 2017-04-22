import React from 'react';
import { WebView } from 'react-native';


PhotoEditorContainer.propTypes = {
	// params: React.PropTypes.object.isRequired,
};

function PhotoEditorContainer (props) {

  // const BASE_URL = 'https://tlpm.ca';
  const BASE_URL = 'http://localhost:8080';

  return (
    <WebView
      source={{uri: BASE_URL + '/photoedit/'}}
    />
  );
}

export default PhotoEditorContainer;