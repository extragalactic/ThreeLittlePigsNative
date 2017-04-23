import React from 'react';
import { WebView } from 'react-native';

PhotoEditor.propTypes = {
//	custID: React.PropTypes.string.isRequired,
};

function PhotoEditor (props) {

  // const BASE_URL = 'https://tlpm.ca';
  const BASE_URL = 'http://localhost:8080';

  return (
    <WebView
      source={{uri: BASE_URL + '/photoedit/' + props.custID}}
    />
  );
}

export default PhotoEditor;