import React from 'react';
import { Modal, Button } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Icon } from 'react-native-elements';
import { graphql, compose } from 'react-apollo';

import { getMessages } from '../../graphql/queries';
import { MasterStyleSheet } from '../../style/MainStyles';

class _CustomerNotesModal extends React.Component {
  constructor() {
    super();
    this.state = {};
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
          onPress={this.props.closeNotesModal}
          size={32}
          color={'blue'}
        />
        <GiftedChat
          messages={this.props.data.getMessages}
          onSend={this.props.onSend}
          user={{
            _id: 1,
          }}
        />
      </Modal>
    );
  }
}

const CustomerNotesModal = compose(
  graphql(getMessages, {
    options: ({ customerId }) => ({ variables: { id: customerId }, pollInterval: 1000 }),
  }),

)(_CustomerNotesModal);

export default CustomerNotesModal;
