import React from 'react';
import { Modal, View, Button, Image, Dimensions } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { MasterStyleSheet } from '../../style/MainStyles';

const window = Dimensions.get('window');

class SurveyCompleteModal extends React.Component {
  constructor() {
    super();
    this.state = { estimate: {} };
  }
  render() {
    if (!this.props.finishedSurvey) {
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
        <Swiper showsButtons={true}>
          { this.props.finishedSurvey.map((survey, idx) => (
            <View
             style={MasterStyleSheet.surveyResultPhotosView}
              key={idx}
            >
              <Text
                h1
              >{survey.heading}</Text>
              <Swiper
                width={window.width / 1.4}
                height={window.height / 1.4}
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
            </View>

      ))}
        </Swiper>
      </Modal>
    );
  }
}

export default SurveyCompleteModal;
