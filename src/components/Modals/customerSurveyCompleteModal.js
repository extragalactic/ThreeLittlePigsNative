import React from 'react';
import { Modal, Text, View, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';

import { MasterStyleSheet } from '../../style/MainStyles';

class SurveyCompleteModal extends React.Component {
  constructor() {
    super();
    this.state = { estimate: {} };
  }
  render() {
    return (
      <Modal
        animationType={'slide'}
        visible={this.props.modal}
      >
        <Icon
          name={'chevron-left'}
          iconStyle={MasterStyleSheet.modalIcon}
          onPress={this.props.close}
          size={38}
          color={'blue'}
        />
        <Swiper showsButtons >
          { this.props.completedSurvey.map(survey => (
            <View>
              <Text >{survey.heading}</Text>
              <Button
                title={'Add Price'}
              />
            </View>
         ))}
        </Swiper>
        <Button
          title={'Add Price'}
        />
      </Modal>
    );
  }
}

export default SurveyCompleteModal;
