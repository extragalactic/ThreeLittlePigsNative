import { View, Text, Modal } from 'react-native';
import { Icon } from 'react-native-elements';
import React from 'react';
import { MasterStyleSheet } from '../../style/MainStyles';
import PhotoView from 'react-native-photo-view';
import { StyleSheet, Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const window = Dimensions.get('window');

class ZoomViewModal extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
    console.log(this.props)
    return (
      <View>
        <Modal
          visible={this.props.open}
        >
          <PhotoView
            onTap={this.props.close}
            source={{ uri: this.props.photo }}
            minimumZoomScale={0.5}
            maximumZoomScale={3}
            onLoad={() => console.log("Image loaded!")}
            style={{width: window.width, height: window.height }} />
        </Modal>
      </View>
    );
  }
}

export default ZoomViewModal;
