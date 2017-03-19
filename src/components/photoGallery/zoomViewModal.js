import { View, Text, Modal } from 'react-native';
import { Icon } from 'react-native-elements';
import React from 'react';
import { MasterStyleSheet } from '../../style/MainStyles';

class ZoomViewModal extends React.Component {
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
          <Text>testing</Text>
        </Modal>
      </View>
    );
  }
}

export default ZoomViewModal;
