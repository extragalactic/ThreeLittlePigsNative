import React from 'react';
import { Card, Button } from 'react-native-elements';
import { Text, StyleSheet, View } from 'react-native';

const buttonStyle = {
borderRadius: 15, marginLeft: 0, marginRight: 0, marginTop: 5,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    height: 200,
  },
});

const CustomerCardSurvey = ({ customer, startSurvey }) => (
  <Card title={'Survey'}>
    <View>
      <Button
        icon={{ name: 'assignment' }}
        backgroundColor="#03A9F4"
        buttonStyle={buttonStyle}
        title="Begin Survey"
        onPress={startSurvey}
      />
    <Button
        icon={{ name: 'assignment' }}
        backgroundColor="#03A9F4"
        buttonStyle={buttonStyle}
        title="Surveys"
        onPress={startSurvey}
      />
    </View>
  </Card>
);

export default CustomerCardSurvey;

