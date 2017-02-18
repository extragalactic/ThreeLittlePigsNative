import _ from 'lodash';
import React from 'react';
import { Modal, View } from 'react-native';
import { Icon } from 'react-native-elements';
import ImagePickerManager from 'react-native-image-picker';
import { graphql, compose } from 'react-apollo';

import SurveyPicker from '../Surveys/surveyPicker';
import PargingSelect from '../Surveys/pargingSelect';
import ConcreteSelect from '../Surveys/concreteSelect';
import ChimneySelect from '../Surveys/chimneySelect';
import BrickSelect from '../Surveys/brickSelect';
import FlashingSelect from '../Surveys/flashingSelect';
import WaterproofingSelect from '../Surveys/waterproofingSelect';
import WindowsillsSelect from '../Surveys/windowsillsSelect';
import RefacingSelect from '../Surveys/refacingSelect';
import SurveyNotesModal from '../Surveys/surveyNotesModal';
import SurveyGalleryModal from '../photoGallery/surveyGalleryModal';
import { MasterStyleSheet } from '../../style/MainStyles';


import {
   addSurveyNotes,
   addSurveyPhoto,
   getSurveyPhotos,
   toggleSurveyReady,
   selectSurveyPhotos, 
  } from '../../graphql/mutations';

const options = {
  title: 'Add Photo', // specify null or empty string to remove the title
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Take Photo.', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: 'Choose from Library.', // specify null or empty string to remove this button
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  videoQuality: 'high', // 'low', 'medium', or 'high'
  durationLimit: 10, // video recording max time in seconds
  quality: 1, // 0 to 1, photos only
  allowsEditing: false, // Built in functionality to resize/reposition the image after selection
  noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
  storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
    skipBackup: false, // ios only - image will NOT be backed up to icloud
    path: 'images', // ios only - will save image at /Documents/images rather than the root
  },
};

class _SurveyMainModal extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: 'Parging',
      selection: ['no header'],
      count: '',
      notes: '',
      surveyPhotos: [],
      notesModal: false,
      photoModal: false,
      ready: false,
      notesSelection: 'no header',
    };
  }

  getPhoto = () => {
    ImagePickerManager.showImagePicker(options, (data) => {
      this.props.addSurveyPhoto({
        variables: {
          heading: this.state.selected,
          description: this.state.notesSelection,
          orginalBase64: data.data,
          timestamp: new Date(),
          custid: this.props.customer.id,
          user: `${this.props.user.firstName} ${this.props.user.lastName}`,
        },
      });
    });
  };
  viewPhotos = () => {
    this.setState({
      photoModal: true,
    });
    this.props.getSurveyPhotos({
      variables: { id: this.props.customer.id }
    }).then(data => this.setState({surveyPhotos: data.data.getSurveyPhotos}));
  };

  changeSelection = (selection) => {
    this.setState({
      selected: selection,
    });
  };
  updateCount = (count) => {
    this.setState({
      count,
    });
  };
  updateText = (notes) => {
    this.setState({
      notes,
    });
  };

  submitNotes = () => {
    this.props.addSurveyNotes({
      variables: {
        heading: this.state.selected,
        description: this.state.notesSelection,
        text: this.state.notes,
        timestamp: new Date(),
        custid: this.props.customer.id,
        userid: this.props.user._id,
        user: `${this.props.user.firstName} ${this.props.user.lastName}`,
      },
    });
    this.setState({ notes: '' });
  };

  updateSelection = (selection) => {
    const doesExist = this.state.selection.indexOf(selection);
    if (doesExist !== -1) {
      _.pull(this.state.selection, selection);
    } else {
      this.state.selection.push(selection);
    }
  }
  tooggleReady = () => {
    this.setState({
      ready: !this.state.ready,
    });
    this.props.toggleSurveyReady({
      variables: {
        custid: this.props.customer.id,
        userid: this.props.user._id,
      },
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
      <View style={MasterStyleSheet.surveyMainView}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.props.modal}
        >
          <Icon
            name={'chevron-left'}
            iconStyle={MasterStyleSheet.modalIcon}
            onPress={this.props.closeSurveyModal}
            size={40}
            color={'blue'}
          />
          <SurveyPicker
            changeSelection={this.changeSelection}
            selection={this.state.selected}
            style={MasterStyleSheet.surveyMainPicker}
          />
          {this.state.selected === 'Parging' ? <PargingSelect updateSelection={this.updateSelection} /> : null }
          {this.state.selected === 'Concrete' ? <ConcreteSelect
            count={this.state.count}
            updateCount={this.updateCount}
            updateSelection={this.updateSelection}
          /> : null }
          {this.state.selected === 'Chimney' ? <ChimneySelect updateSelection={this.updateSelection} /> : null }
          {this.state.selected === 'Brick' ? <BrickSelect updateSelection={this.updateSelection} /> : null }
          {this.state.selected === 'Flashing' ? <FlashingSelect updateSelection={this.updateSelection} /> : null }
          {this.state.selected === 'Waterproofing' ? <WaterproofingSelect updateSelection={this.updateSelection} /> : null }
          {this.state.selected === 'Windowsills' ? <WindowsillsSelect updateSelection={this.updateSelection} /> : null }
          {this.state.selected === 'Refacing' ? <RefacingSelect updateSelection={this.updateSelection} /> : null }
          <View style={MasterStyleSheet.surveyMainContainer}>
            <Icon
              name="description"
              color="#517fa4"
              raised
              onPress={() => this.setState({ notesModal: true })}
            />
            <Icon
              name="add-a-photo"
              color="#517fa4"
              raised
              onPress={this.getPhoto}
            />
            <Icon
              name="photo"
              color="#517fa4"
              raised
              onPress={this.viewPhotos}
            />
            <Icon
              name="help-outline"
              color="#517fa4"
              raised
              onPress={() => console.log(this)}
            />
          </View>
          <View style={MasterStyleSheet.surveyMainButton}>
            <Icon
              name={this.state.ready ? 'thumb-up' : 'thumb-down'}
              color="#517fa4"
              raised
              onPress={this.tooggleReady}
            />
          </View>
          <SurveyNotesModal
            open={this.state.notesModal}
            close={() => this.setState({ notesModal: false })}
            updateText={(text) => this.setState({ notes: text })}
            updateSelection={(notesSelection) => this.setState({ notesSelection })}
            submitNotes={this.submitNotes}
            notes={this.state.notes}
            notesSelection={this.state.notesSelection}
            selection={this.state.selection}
            selected={this.state.selected}
          />
          <SurveyGalleryModal
            open={this.state.photoModal}
            close={() => this.setState({ photoModal: false })}
            photos={this.state.surveyPhotos}
            selectPhoto={this.togglePhotoSelection}
          />
        </Modal>

      </View>
    );
  }
}

const SurveyMainModal = compose(
  graphql(selectSurveyPhotos, { name: 'selectSurveyPhotos' }),
  graphql(toggleSurveyReady, { name: 'toggleSurveyReady' }),
  graphql(getSurveyPhotos, { name: 'getSurveyPhotos' }),
  graphql(addSurveyNotes, { name: 'addSurveyNotes' }),
  graphql(addSurveyPhoto, { name: 'addSurveyPhoto' }),
)(_SurveyMainModal);

export default SurveyMainModal;
