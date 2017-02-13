import React from 'react';
import { Modal, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Icon } from 'react-native-elements';
import { graphql, compose } from 'react-apollo';

import { getMessages } from '../graphql/queries';

class CustomerSurveyCompleteModal extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {

  }

  render() {
    return (
      <Modal
        animationType={'slide'}
        visible={this.props.modal}
      >
        <Icon
          name={'chevron-left'}
          iconStyle={{ marginTop: 30, marginRight: 365 }}
          onPress={this.props.closeNotesModal}
          size={32}
          color={'blue'}
        />
        <Text> Survey Results </Text>
      </Modal>
    );
  }
}

export default CustomerSurveyCompleteModal;
