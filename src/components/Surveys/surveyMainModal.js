import _ from 'lodash';
import React from 'react';
import { Modal, View, ActivityIndicator, Text, ActionSheetIOS } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import ImagePickerManager from 'react-native-image-picker';
import { graphql, compose } from 'react-apollo';
import RNFS from 'react-native-fs';
import uuid from 'react-native-uuid';
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
import SurveyPhotosModal from '../Surveys/surveyPhotoModal';
import { MasterStyleSheet } from '../../style/MainStyles';

import photoOptions from './photoOptions';

import {
   addSurveyNotes,
   addSurveyPhoto,
   getSurveyPhotos,
   toggleSurveyReady,
   selectSurveyPhotos,
  } from '../../graphql/mutations';

import { getUserandCustomers } from '../../graphql/queries';

const BUTTONS = [
  'Edit',
  'Cancel',
];
const DESTRUCTIVE_INDEX = 5;
const CANCEL_INDEX = 6;


class _SurveyMainModal extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: 'Parging',
      selection: [],
      count: '',
      notes: '',
      photos: [],
      photoCaption: '',
      surveyPhotos: [],
      notesModal: false,
      photoGallery: false,
      photoModal: false,
      ready: false,
      notesSelection: '',
      photoSelection: '',
      loading: false,
      imageUploading: false,
    };
  }


  getPhoto = () => {
    this.setState({ loading: true });
    ImagePickerManager.showImagePicker(photoOptions, (data) => {
      if (data.didCancel) {
        this.setState({ loading: false });
      }

      if (!data.didCancel) {
        this.setState({ imageUploading: true });
        const docID = uuid.v4();
        RNFS.copyFile(data.uri, `${RNFS.DocumentDirectoryPath}/images/${docID}.jpg`)
       .then(res => console.log(res))
       .catch(err => console.error(err));
        RNFS.readDir(`${RNFS.DocumentDirectoryPath}/images`)
       .then((result) => {
         console.table(result);
       });
        this.props.addSurveyPhoto({
          variables: {
            heading: this.state.selected,
            description: this.state.photoCaption,
            orginalBase64: data.data,
            timestamp: new Date(),
            custid: this.props.customer.id,
            user: `${this.props.data.user.firstName} ${this.props.data.user.lastName}`,
            localfile: `${RNFS.DocumentDirectoryPath}/images/${docID}.jpg`,
          },
        }).then((res) => {
          if (res.data.addSurveyPhoto) {
            this.setState({
              loading: false,
              imageUploading: false,
            });
          }
        });
      }
    });
  };
  viewPhotos = () => {
    this.props.getSurveyPhotos({
      variables: { id: this.props.customer.id },
    })
    .then((data) => {
      this.setState({ surveyPhotos: data.data.getSurveyPhotos });
    });
    this.setState({
      photoGallery: true,
    });  
  };

  changeSelection = (selection) => {
    this.setState({
      selection: [],
    });

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
  TakePhoto = () => {
    ImagePickerManager.launchCamera(photoOptions, (data) => {
      this.props.addSurveyPhoto({
        variables: {
          heading: this.state.selected,
          description: this.state.photoCaption,
          orginalBase64: data.data,
          timestamp: new Date(),
          custid: this.props.customer.id,
          user: `${this.props.data.user.firstName} ${this.props.data.user.lastName}`,
          localfile: data.uri,
        },
      })
      .then(() => {
        this.props.getSurveyPhotos({
          variables: { id: this.props.customer.id },
        })
    .then((payload) => {
      this.setState({
        surveyPhotos: payload.data.getSurveyPhotos,
        loading: false,
      });
    });
      });
    });
    this.setState({
      photoCaption: '',
    });
  };
  AddFromLibrary = () => {
    ImagePickerManager.launchImageLibrary(photoOptions, (data) => {
      this.setState({ loading: true });
      this.props.addSurveyPhoto({
        variables: {
          heading: this.state.selected,
          description: this.state.photoCaption,
          orginalBase64: data.data,
          timestamp: new Date(),
          custid: this.props.customer.id,
          user: `${this.props.data.user.firstName} ${this.props.data.user.lastName}`,
          localfile: data.uri,
        },
      })
       .then((payload) => {
         this.setState({
           surveyPhotos: payload.data.getSurveyPhotos,
           loading: false,
         });
       });
    });
    this.setState({
      photoCaption: '',
    });
  };
  submitNotes = () => {
    this.props.addSurveyNotes({
      variables: {
        heading: this.state.selected,
        description: this.state.selection,
        text: this.state.notes,
        timestamp: new Date(),
        custid: this.props.customer.id,
        userid: this.props.data.user._id,
        user: `${this.props.data.user.firstName} ${this.props.data.user.lastName}`,
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
        userid: this.props.data.user._id,
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
  updatePhotoCaption = (text) => {
    this.setState({
      photoCaption: text,
    });
  };

  showActionSheet = (media, index) => {
    // this.setState({ currentSelection: this.props.data.customer.survey.photos[index].photo });
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
    },
    (buttonIndex) => {
      const selection = BUTTONS[buttonIndex];
      if (selection === 'Edit') {
       //  this.setState({ photoGallery: false });
       //  Actions.streetView(this.props.customer.id);
       //  this.props.closeSurveyModal();
      }
      if (selection === 'Cancel') {
        // do nothing
      }
    });
  };


  render() {
    if (this.props.data.loading) {
      return (
        <View>
          <Text>Loading </Text>
        </View>
      );
    }
    return (
      <View style={MasterStyleSheet.surveyMainView}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.props.modal}
        >
          <View>
            { !this.state.loading ?
              <Icon
                onPress={this.props.closeSurveyModal}
                name={'chevron-left'}
                iconStyle={MasterStyleSheet.modalIcon}
                size={45}
                color={'blue'}
              /> : null }
          </View>
          {this.state.imageUploading ?
            <ActivityIndicator
              style={MasterStyleSheet.surveyMainPicker}
              size={'large'}
            /> :
            <View>
              { !this.state.loading ?
                <SurveyPicker
                  changeSelection={this.changeSelection}
                  selection={this.state.selected}
                  style={MasterStyleSheet.surveyMainPicker}
                /> : null}

              { !this.state.loading ?
                <View
                  style={MasterStyleSheet.surveyDetailsList}
                >
                  { this.state.selected === 'Parging' ?
                    <PargingSelect updateSelection={this.updateSelection} /> : null }
                  { this.state.selected === 'Concrete' ?
                    <ConcreteSelect
                      count={this.state.count}
                      updateCount={this.updateCount}
                      updateSelection={this.updateSelection}
                    /> : null }
                  { this.state.selected === 'Chimney' ?
                    <ChimneySelect
                      updateSelection={this.updateSelection}
                    /> : null }
                  { this.state.selected === 'Brick' ?
                    <BrickSelect
                      updateSelection={this.updateSelection}
                    /> : null }
                  { this.state.selected === 'Flashing' ?
                    <FlashingSelect
                      updateSelection={this.updateSelection}
                    /> : null }
                  { this.state.selected === 'Waterproofing' ?
                    <WaterproofingSelect
                      updateSelection={this.updateSelection}
                    /> : null }
                  { this.state.selected === 'Windowsills' ?
                    <WindowsillsSelect
                      updateSelection={this.updateSelection}
                    /> : null }
                  { this.state.selected === 'Refacing' ?
                    <RefacingSelect
                      updateSelection={this.updateSelection}
                    /> : null }
                </View>
            : null }
              { !this.state.loading ?
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
            : null}
            </View>
       }
          <SurveyNotesModal
            open={this.state.notesModal}
            close={() => this.setState({ notesModal: false })}
            updateText={text => this.setState({ notes: text })}
            updateSelection={notesSelection => this.setState({ notesSelection })}
            submitNotes={this.submitNotes}
            notes={this.state.notes}
            notesSelection={this.state.notesSelection}
            selection={this.state.selection}
            selected={this.state.selected}
          />
          <SurveyPhotosModal
            loading={this.state.loading}
            photos={this.state.photos}
            open={this.state.photoModal}
            updatePhotoCaption={this.updatePhotoCaption}
            close={() => this.setState({ photoModal: false })}
            updateText={text => console.log(text)}
            updateSelection={photoSelection => this.setState({ photoSelection })}
            photoCaption={this.state.photoCaption}
            photoSelection={this.state.photoSelection}
            selection={this.state.selection}
            selected={this.state.selected}
            TakePhoto={this.TakePhoto}
            AddFromLibrary={this.AddFromLibrary}
          />
          <SurveyGalleryModal
            open={this.state.photoGallery}
            close={() => this.setState({ photoGallery: false })}
            photos={this.state.surveyPhotos}
            selectPhoto={this.togglePhotoSelection}
            showActionSheet={(media, index) => this.showActionSheet(media, index)}
            custID={this.props.customer.id}
          />
        </Modal>

      </View>
    );
  }
}

const SurveyMainModal = compose(
  graphql(getUserandCustomers, {
    options: ({ id }) => ({ variables: { id } }),
  }),
  graphql(selectSurveyPhotos, { name: 'selectSurveyPhotos' }),
  graphql(toggleSurveyReady, { name: 'toggleSurveyReady' }),
  graphql(getSurveyPhotos, { name: 'getSurveyPhotos' }),
  graphql(addSurveyNotes, { name: 'addSurveyNotes' }),
  graphql(addSurveyPhoto, { name: 'addSurveyPhoto' }),
)(_SurveyMainModal);

export default SurveyMainModal;
