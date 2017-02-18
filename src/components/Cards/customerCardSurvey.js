import React from 'react';
import { Card, Button } from 'react-native-elements';
import { View } from 'react-native';

import { MasterStyleSheet } from '../../style/MainStyles';

const CustomerCardSurvey = ({ customer, startSurvey, surveyComplete }) => (
  <Card 
    containerStyle={MasterStyleSheet.cardStyle}
    title={'Survey'}>
    <View>
      <Button
        icon={{ name: 'assignment' }}
        backgroundColor="#03A9F4"
        buttonStyle={MasterStyleSheet.mainButtonStyle}
        title="Begin Survey"
        onPress={startSurvey}
      />
      <Button
        icon={{ name: 'assignment' }}
        backgroundColor="#03A9F4"
        buttonStyle={MasterStyleSheet.mainButtonStyle}
        title="Surveys"
        onPress={surveyComplete}
      />
    </View>
  </Card>
);

export default CustomerCardSurvey;

