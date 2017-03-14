import React from 'react';
import RNFS from 'react-native-fs';
import { ActionSheetIOS } from 'react-native';
import Modal from 'react-native-modalbox';
import PhotoBrowser from 'react-native-photo-browser';


const BUTTONS = [
  'Save',
  'Duplicate',
  'Share',
  'Edit',
  'View',
  'Delete',

];
const DESTRUCTIVE_INDEX = 5;
const CANCEL_INDEX = 6;

class PhotoGalleryEstimates extends React.Component {
  constructor() {
    super();
    this.state = { clicked: '' };
  }

  downloadImage = (url) => {
    console.log(url);




  };

  showActionSheet = (media, index) => {
    console.log(media, index);
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
    },
    (buttonIndex) => {
      const selection = BUTTONS[buttonIndex];
      if (selection === 'Save') {
        this.downloadImage(media.photo);
      }

    
    });

  };

  render() {
    console.log(RNFS)
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

export default PhotoGalleryEstimates;


/*



const showActionSheet = (media, index) => {
console.log(media, index)

  ActionSheetIOS.showActionSheetWithOptions({
    options: BUTTONS,
    cancelButtonIndex: CANCEL_INDEX,
    destructiveButtonIndex: DESTRUCTIVE_INDEX,
  },
    (buttonIndex) => {
      this.setState({ clicked: BUTTONS[buttonIndex] });
    });
};



        onActionButton={(media, index) => showActionSheet(media, index)}

*/