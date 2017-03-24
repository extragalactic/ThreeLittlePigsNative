import React from 'react';
import { ActionSheetIOS, CameraRoll, AlertIOS } from 'react-native';
import Modal from 'react-native-modalbox';
import PhotoBrowser from 'react-native-photo-browser';
import ImagePickerManager from 'react-native-image-picker';

import { graphql, compose } from 'react-apollo';

import { getBase64, addSurveyPhoto, selectSurveyPhotos } from '../../graphql/mutations';

import photoOptions from '../Surveys/photoOptions';
import ZoomViewModal from './zoomViewModal';

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
    this.state = {
      clicked: '',
      zoomModal: false,
      currentSelection: '',
  };
  }

  downloadImage = (image) => {
    this.props.getBase64({
      variables: {
        docID: image.docID,
      },
    }).then((base64) => {
      CameraRoll.saveToCameraRoll(base64.data.getImageBase64.base64, 'photo')
        .then(data => console.log(data))
        .catch(err => console.log(err));
      AlertIOS.alert('Photo Saved');
    });
  };

  uploadImage = () => {
    ImagePickerManager.launchImageLibrary(photoOptions, (data) => {
      this.props.addSurveyPhoto({
        variables: {
          heading: 'DirectUpload',
          description: this.state.photoCaption,
          orginalBase64: data.data,
          timestamp: new Date(),
          custid: this.props.customer.id,
          user: `${this.props.user.firstName} ${this.props.user.lastName}`,
        },
      });
    });
  };


  showActionSheet = (media, index) => {
    this.setState({ currentSelection: this.props.photos[index].photo});
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
      if (selection === 'Add') {
        this.uploadImage();
      }
      if (selection === 'View') {
        this.setState({ zoomModal: true });
      }
    });
  };

  togglePhotoSelection = (index) => {
    this.props.selectSurveyPhotos({
      variables: {
        custid: this.props.customer.id,
        index,
      },
    });
  };

  render() {
    return (
      <Modal
        isOpen={this.props.open}
        onClosed={this.props.close}
        position={'center'}
      >
        <ZoomViewModal
          open={this.state.zoomModal}
          close={() => { this.setState({ zoomModal: false }); }}
          photo={this.state.currentSelection}
        />
        <PhotoBrowser
          mediaList={this.props.photos}
          alwaysShowControls
          onBack={this.props.close}
          displayActionButton
          displayNavArrows
          displaySelectionButtons
          onActionButton={(media, index) => this.showActionSheet(media, index)}
          onSelectionChanged={(media, index, isSelected) => {
            this.togglePhotoSelection(index);
          }}
        />
      </Modal>
    );
  }
}


const PhotoGalleryEstimates = compose(
  graphql(getBase64, { name: 'getBase64' }),
  graphql(addSurveyPhoto, { name: 'addSurveyPhoto' }),
  graphql(selectSurveyPhotos, { name: 'selectSurveyPhotos' }),
)(_PhotoGalleryEstimates);

export default PhotoGalleryEstimates;
