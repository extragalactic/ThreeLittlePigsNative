import { View, Dimensions, Modal } from 'react-native';
import React from 'react';
import PhotoView from 'react-native-photo-view';

const window = Dimensions.get('window');

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
          <PhotoView
            onTap={this.props.close}
            source={{ uri: this.props.photo }}
            minimumZoomScale={0.5}
            maximumZoomScale={3}
            onLoad={() => console.log("Image loaded!")}
            style={{ width: window.width, height: window.height }} 
          />
        </Modal>
      </View>
    );
  }
}

export default ZoomViewModal;
