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
      notesSelection: 'no header',
      photoSelection: 'no header',
    };
  }
  getPhoto = () => {
    // console.log('picker');

    this.setState({
      photoModal: true,
    });
    /*
    ImagePickerManager.showImagePicker(photoOptions, (data) => {
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
    */
  };
  viewPhotos = () => {
    this.setState({
      photoGallery: true,
    });
    this.props.getSurveyPhotos({
      variables: { id: this.props.customer.id },
    }).then(data => this.setState({ surveyPhotos: data.data.getSurveyPhotos }));
  };

  changeSelection = (selection) => {
    this.setState({
      selection: ['no header'],
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
      this.state.photos.push({
        photo: data.uri,
      });
      this.props.addSurveyPhoto({
        variables: {
          heading: this.state.selected,
          description: this.state.photoCaption,
          orginalBase64: data.data,
          timestamp: new Date(),
          custid: this.props.customer.id,
          user: `${this.props.user.firstName} ${this.props.user.lastName}`,
          localfile: data.uri,
        },
      });
    });
    this.setState({
      photoCaption: '',
    });
  };
  AddFromLibrary = () => {
    ImagePickerManager.launchImageLibrary(photoOptions, (data) => {
      this.state.photos.push({
        photo: data.uri,
      });
      this.props.addSurveyPhoto({
        variables: {
          heading: this.state.selected,
          description: this.state.photoCaption,
          orginalBase64: data.data,
          timestamp: new Date(),
          custid: this.props.customer.id,
          user: `${this.props.user.firstName} ${this.props.user.lastName}`,
        },
      });
    });
    this.setState({
      photoCaption: '',
    });
  };
  submitNotes = () => {
    console.log(this.state)
    this.props.addSurveyNotes({
      variables: {
        heading: this.state.selected,
        description: this.state.selection,
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
  updatePhotoCaption = (text) => {
    this.setState({
      photoCaption: text,
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
          <View>
            <Icon
              onPress={this.props.closeSurveyModal}
              name={'chevron-left'}
              iconStyle={MasterStyleSheet.modalIcon}
              size={45}
              color={'blue'}
            />
          </View>
          <SurveyPicker
            changeSelection={this.changeSelection}
            selection={this.state.selected}
            style={MasterStyleSheet.surveyMainPicker}
          />
          <View
            style={MasterStyleSheet.surveyDetailsList}
          >
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
          </View>
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


/*
  <View style={MasterStyleSheet.surveyMainButton}>
            <Icon
              name={this.state.ready ? 'thumb-up' : 'thumb-down'}
              color="#517fa4"
              raised
              onPress={this.tooggleReady}
            />
          </View>

*/
