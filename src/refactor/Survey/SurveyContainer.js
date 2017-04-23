import React from 'react';
import { View, Text } from 'react-native';
import { surveyStyles } from './SurveyContainer';

class SurveyContainer extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
    return (
        <View
          style={surveyStyles.standardView}
        >
       <Text> Survey </Text>
        </View>
    );
  }

}

export default SurveyContainer;
