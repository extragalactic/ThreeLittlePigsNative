import { View, Modal, WebView } from 'react-native';
import { Icon } from 'react-native-elements';
import React from 'react';
import { MasterStyleSheet } from '../../style/MainStyles';

class EstimatePreviewModal extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
    return (
      <View>
        <Modal
          visible={this.props.open}
        >
          <Icon
            name={'chevron-left'}
            iconStyle={MasterStyleSheet.modalIcon}
            onPress={this.props.close}
            size={32}
            color={'blue'}
          />
          <WebView
            source={{ uri: `https://tlpm.ca/documents/${this.props.customer.firstName}${this.props.customer.lastName}Estimate.pdf` }}
          />
        </Modal>
      </View>
    );
  }
}

export default EstimatePreviewModal;
