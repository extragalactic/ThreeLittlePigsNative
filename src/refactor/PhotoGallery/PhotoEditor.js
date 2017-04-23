// Note: will likely delete this (not required)

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
      style={{flex: 1, width: 800}}
      source={{uri: BASE_URL + '/photoedit/' + props.custID}}
    />
  );
}

export default PhotoEditor;