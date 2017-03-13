import React from 'react';
import { Modal, View, Image, Dimensions, ScrollView } from 'react-native';
import { Icon, Text, Button } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { MasterStyleSheet } from '../../style/MainStyles';

const window = Dimensions.get('window');

class SurveyCompleteModal extends React.Component {
  constructor() {
    super();
    this.state = { estimate: {} };
  }
  render() {
    if (!this.props.myCustomers.myestimates) {
      return (
        <Text> No Survey </Text>
      );
    }
    return (
      <Modal
        animationType={'slide'}
        visible={this.props.modal}
        style={MasterStyleSheet.modalView}
      >
        <Icon
          name={'chevron-left'}
          iconStyle={MasterStyleSheet.modalIcon}
          onPress={this.props.close}
          size={38}
          color={'blue'}
        />
        <View>
          <Swiper showsButtons>
            { this.props.finishedSurvey.map((survey, idx) => (
              <View
                style={MasterStyleSheet.surveyResultPhotosView}
                key={idx}
              >
                <Text
                  h3
                >{survey.heading}</Text>
                <Swiper
                  width={window.width / 1.3}
                  height={window.height / 1.8}
                >
                  {survey.photos.map((photo, idx) => (
                    <View
                      style={MasterStyleSheet.surveyResultInsideView}
                    >
                      <Image
                        style={MasterStyleSheet.surveyResultPhotos}
                        source={{ uri: photo.url }}
                      />
                    </View>
          ))}
                </Swiper>
                <View
                  style={MasterStyleSheet.surveyResultsNotes}
                >
                  <ScrollView
                    contentContainerStyle={MasterStyleSheet.surveyResultsNotesView}
                  >

                    { survey.notes.map(note => (
                      <View>
                        <Text h4> {note.description}</Text>
                        <Text h5> {note.text}</Text>
                      </View>
                ))}

                  </ScrollView>
                </View>
              </View>
        ))}
          </Swiper>
          <Button
            buttonStyle={MasterStyleSheet.surveyResultsButton}
            icon={{ name: 'attach-money' }}
            backgroundColor={this.props.ready ? '#01DF3A' : '#03A9F4'}
            title={this.props.ready ? 'Survey is Ready' : 'Make Ready'}
            onPress={this.props.toggleReady}
          />
        </View>

      </Modal>
    );
  }
}

export default SurveyCompleteModal;

