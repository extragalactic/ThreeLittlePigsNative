import React from 'react';
import { ActionSheetIOS, CameraRoll, AlertIOS } from 'react-native';
import Modal from 'react-native-modalbox';
import PhotoBrowser from 'react-native-photo-browser';
import { graphql, compose } from 'react-apollo';

import { getBase64 } from '../../graphql/mutations';

const BUTTONS = [
  'Save',
  'Add',
  'View',
  'Delete',

];
const DESTRUCTIVE_INDEX = 5;
const CANCEL_INDEX = 6;

class _PhotoGalleryEstimates extends React.Component {
  constructor() {
    super();
    this.state = { clicked: '' };
  }

  downloadImage = (url) => {
    this.props.getBase64({
      variables: {
        docID: url.docID,
      },
    }).then((base64) => {
      CameraRoll.saveToCameraRoll(base64.data.getImageBase64.base64, 'photo')
        .then(data => console.log(data))
        .catch(err => console.log(err));
      AlertIOS.alert('Photo Saved');
    });
  };

  showActionSheet = (media, index) => {
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
    },
    (buttonIndex) => {
      const selection = BUTTONS[buttonIndex];
      if (selection === 'Save') {
        this.downloadImage(media);
      }
    });
  };

  render() {
    return (
      <Modal
        isOpen={this.props.open}
        onClosed={this.props.close}
        position={'center'}
      >
        <PhotoBrowser
          mediaList={this.props.photos}
          alwaysShowControls
          onBack={this.props.close}
          displayActionButton
          displayNavArrows
          displaySelectionButtons
          onActionButton={(media, index) => this.showActionSheet(media, index)}
          onSelectionChanged={(media, index, isSelected) => {
            this.props.selectPhoto(index);
          }}
        />
      </Modal>
    );
  }
}

const PhotoGalleryEstimates = compose(
  graphql(getBase64, { name: 'getBase64' }),
)(_PhotoGalleryEstimates);


export default PhotoGalleryEstimates;
