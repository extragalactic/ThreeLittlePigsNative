import React from 'react';
import { 
  ActionSheetIOS,
  CameraRoll, 
  AlertIOS, 
  Modal,
  View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PhotoBrowser from 'react-native-photo-browser';
import ImagePickerManager from 'react-native-image-picker';
import { graphql, compose } from 'react-apollo';

import { getBase64, addSurveyPhoto, selectSurveyPhotos } from '../../graphql/mutations';
import { getMyCustomer } from '../../graphql/queries';
import photoOptions from '../../components/Surveys/photoOptions'; // move this!
import PhotoEditorContainer from './PhotoEditorContainer';

const BUTTONS = [
  'Edit',
  'Save',
  'Add',
  'Delete',
];
const DESTRUCTIVE_INDEX = 5;
const CANCEL_INDEX = 6;


class _PhotoGalleryDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      clicked: '',
      zoomModal: false,
      currentSelection: '',
      isEditorOpen: false
    };
  }
  componentDidMount() {

  }
  downloadImage = (image) => {
    this.props.getBase64({
      variables: {
        docID: image.docID,
      },
    }).then((base64) => {
      CameraRoll.saveToCameraRoll(base64.data.getImageBase64.base64, 'photo');
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
          custid: this.props.id,
          user: `${this.props.user.firstName} ${this.props.user.lastName}`,
        },
      });
    });
  };

  showActionSheet = (media, index) => {
    this.setState({ currentSelection: this.props.data.customer.survey.photos[index].photo });
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
    },
    (buttonIndex) => {
      const selection = BUTTONS[buttonIndex];
      if (selection === 'Edit') {
        // Actions.photoEditor(this.props.data.customer.id);
        this.setState({
          isEditorOpen: true
        });
      }      
      if (selection === 'Save') {
        // saves locally to device gallery
        this.downloadImage(media);
      }
      if (selection === 'Add') {
        this.uploadImage();
      }
      if (selection === 'Delete') {
        // delete
      }
    });
  };

  togglePhotoSelection = (index) => {
    this.props.selectSurveyPhotos({
      variables: {
        custid: this.props.id,
        index,
      },
    });
  };

  render() {
    return (
      <View>
        <PhotoBrowser
          style={{
            margin: 250,
            flex: 1
          }}
          mediaList={this.props.data.customer.survey.photos}
          alwaysShowControls
          onBack={() => Actions.pop()}
          displayActionButton
          displayNavArrows
          displaySelectionButtons
          startOnGrid
          onActionButton={(media, index) => this.showActionSheet(media, index)}
          onSelectionChanged={(media, index, isSelected) => {
            this.togglePhotoSelection(index);
          }}
        />

        <PhotoEditorContainer 
          style={{flex: 1, width: 800}}
          open={this.state.isEditorOpen}
          custID={this.props.data.customer.id}
        />

      </View>
    );
  }

}

const mapUserToProps = state => ({
  user: state.user,
});

const PhotoGalleryDetails = compose(
  connect(mapUserToProps, null),
  graphql(getMyCustomer, {
    options: ({ id }) => ({ variables: { id }, pollInterval: 1000 }),
  }),
  graphql(getBase64, { name: 'getBase64' }),
  graphql(addSurveyPhoto, { name: 'addSurveyPhoto' }),
  graphql(selectSurveyPhotos, { name: 'selectSurveyPhotos' }),
)(_PhotoGalleryDetails);

export default PhotoGalleryDetails;

