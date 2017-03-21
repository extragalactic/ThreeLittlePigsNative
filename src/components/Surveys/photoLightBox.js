import React from 'react';
import { ScrollView, Text, Image } from 'react-native';
import Lightbox from 'react-native-lightbox';
import { StyleSheet, Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';
const window = Dimensions.get('window');

class PhotoLightBox extends React.Component {
  constructor() {
    super();
    this.state = {
      someKey: 'someValue',
      height: 120,
      width: 120,
    };
  }

  render() {
    return (
      <ScrollView
        horizontal
        style={{
            flexDirection: 'row',
        }}
      >
        {this.props.photos.map(photo => (
          <Lightbox
            navigator={this.props.navigator}
            onOpen={()=> this.setState({
              width: window.width,
              height: window.height,
            })}
            onClose={()=> this.setState({
              width: 120,
              height: 120,
            })}
          >
            <Image
              style={{ height: this.state.height, width: this.state.width }}
              source={{ uri: photo.photo }}
            />
          </Lightbox>
           ))}
      </ScrollView>
    );
  }

}

export default PhotoLightBox;
