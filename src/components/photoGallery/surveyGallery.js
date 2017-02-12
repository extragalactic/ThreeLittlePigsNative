import React from 'react';
import {Text, View} from 'react-native'

class surveyGallery extends React.Component {
    constructor(){
        super()
    }

  render() {
    console.log(this)
    const customer = this.props.customer;
    return (
        <View>
        <Text>Gallery</Text>
        </View>
    )
  }
}

export default surveyGallery;
